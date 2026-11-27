// Checks every link in the built site (run `npm run build` first):
//   node scripts/check-links.mjs            internal links, files and #anchors
//   node scripts/check-links.mjs --external also every external URL (needs internet)
//
// Internal: each href/src in build/**/*.html must resolve to a file, and a
// #fragment must exist as an id on the target page. Redirect pages are
// followed. External: each URL is requested once; redirects are reported.

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, sep } from 'path';

const root = 'build';
const base = '/website';
const origin = 'https://check.local';
const external = process.argv.includes('--external');

/** @param {string} dir @returns {string[]} */
function htmlFiles(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return name === '_app' ? [] : htmlFiles(path);
		return name.endsWith('.html') ? [path] : [];
	});
}

/** URL path of a built file: build/a/b/index.html → /website/a/b/ */
const pageUrl = (file) => `${base}/${relative(root, file).split(sep).join('/')}`.replace(/index\.html$/, '');

/** Built file for a URL path, or null. */
function fileFor(pathname) {
	const local = decodeURIComponent(pathname.slice(base.length)).replace(/^\//, '');
	const candidates = local === '' || local.endsWith('/') ? [join(root, local, 'index.html')] : [join(root, local), join(root, local, 'index.html')];
	return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

const pages = htmlFiles(root).filter((file) => !file.endsWith('404.html'));
const cache = new Map();
const html = (file) => cache.get(file) ?? cache.set(file, readFileSync(file, 'utf-8')).get(file);
const ids = (file) => new Set([...html(file).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const redirectOf = (file) => html(file).match(/http-equiv="refresh" content="0;url=([^"]+)"/)?.[1];

const broken = [];
const externals = new Map();
let checked = 0;

for (const page of pages) {
	const from = new URL(pageUrl(page), origin);
	const refs = [...html(page).matchAll(/\s(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1].replaceAll('&amp;', '&'));
	for (const ref of refs) {
		if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
		const url = new URL(ref, from);
		if (url.origin !== origin) {
			if (!externals.has(url.href)) externals.set(url.href, new Set());
			externals.get(url.href).add(pageUrl(page));
			continue;
		}
		if (url.pathname.startsWith(`${base}/_app/`)) continue;
		checked++;
		if (!url.pathname.startsWith(`${base}/`) && url.pathname !== base) {
			broken.push([pageUrl(page), ref, 'outside the base path']);
			continue;
		}
		let target = fileFor(url.pathname);
		if (!target) {
			broken.push([pageUrl(page), ref, 'no such file']);
			continue;
		}
		let hash = url.hash;
		const forward = target.endsWith('.html') ? redirectOf(target) : null;
		if (forward) {
			const next = new URL(forward, origin);
			if (next.origin !== origin) continue;
			target = fileFor(next.pathname);
			hash = next.hash || hash;
			if (!target) {
				broken.push([pageUrl(page), ref, `redirects to missing ${forward}`]);
				continue;
			}
		}
		if (hash && hash !== '#' && target.endsWith('.html') && !ids(target).has(decodeURIComponent(hash.slice(1)))) {
			broken.push([pageUrl(page), ref, `missing anchor ${hash}`]);
		}
	}
}

console.log(`Internal: ${checked} links on ${pages.length} pages checked, ${broken.length} broken.`);
for (const [page, ref, why] of broken) console.log(`  ✗ ${page} → ${ref} (${why})`);

if (external) {
	const results = [];
	const list = [...externals.keys()];
	console.log(`\nExternal: checking ${list.length} unique URLs…`);
	const check = async (href) => {
		for (const method of ['HEAD', 'GET']) {
			try {
				const response = await fetch(href, {
					method,
					redirect: 'manual',
					signal: AbortSignal.timeout(20000),
					headers: { 'User-Agent': 'Mozilla/5.0 (link checker)', Accept: 'text/html,*/*' }
				});
				if (method === 'HEAD' && [403, 404, 405, 429, 501].includes(response.status)) continue;
				return { href, status: response.status, location: response.headers.get('location') };
			} catch (err) {
				if (method === 'GET') return { href, status: 'ERR', location: String(err.cause?.code ?? err.name) };
			}
		}
	};
	for (let i = 0; i < list.length; i += 8) results.push(...(await Promise.all(list.slice(i, i + 8).map(check))));
	for (const r of results.sort((a, b) => String(a.status).localeCompare(String(b.status)))) {
		const mark = typeof r.status === 'number' && r.status < 300 ? '✓' : typeof r.status === 'number' && r.status < 400 ? '↪' : '✗';
		console.log(`  ${mark} ${r.status} ${r.href}${r.location ? ` → ${r.location}` : ''}`);
		if (mark === '✗') console.log(`      on: ${[...externals.get(r.href)].slice(0, 3).join(', ')}`);
	}
}

process.exitCode = broken.length ? 1 : 0;
