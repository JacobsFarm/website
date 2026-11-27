import { error, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { redirects, resolveRedirect } from '$lib/config/redirects.js';
import { tutorials } from '$lib/content/tutorials.js';

/**
 * Forwards old and short addresses (see $lib/config/redirects.js). Each entry
 * is prerendered as a small page that forwards at once; on GitHub Pages an
 * unknown address falls back to 404.html, which runs this same check in the
 * browser, so "/installation/download/windows" still finds the Windows guide.
 */

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return Object.keys(redirects).map((path) => ({ redirect: path }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const target = resolveRedirect(
		`/${params.redirect}`,
		tutorials.map(({ slug }) => `/tutorials/${slug}/`)
	);
	if (!target) error(404, 'Not found');
	redirect(308, target.startsWith('/') ? `${base}${target}` : target);
}
