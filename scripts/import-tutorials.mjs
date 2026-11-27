// Converts the printable tutorial guides (HTML, Dutch + English) into JSON
// that the website renders in its own style, and copies their images and PDFs.
//
//   node scripts/import-tutorials.mjs [path-to-Tutorial-folder]
//
// Videos are not copied: they are played from the CowCatcher AI YouTube channel
// (the `youtube` ID per tutorial in src/lib/content/tutorials.js).

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const source = resolve(process.argv[2] ?? 'F:/media/Tutorial');
const staticDir = resolve('static/tutorials');
const contentDir = resolve('src/lib/content/tutorials');

const guides = [
	{ slug: 'install-ai-detector', folder: 'installeren ai detector', nl: 'handleiding_installeren_ai_detector', en: 'guide_install_ai_detector_EN' },
	{ slug: 'update-windows', folder: 'Update windows', nl: 'handleiding_update_windows', en: 'guide_update_windows_EN' },
	{ slug: 'tail-up', folder: 'tail up', nl: 'handleiding_tail_up', en: 'guide_tail_up_EN' },
	{ slug: 'calf-detection', folder: 'detectie kalf', nl: 'handleiding_detectie_kalf', en: 'guide_calf_detection_EN' },
	{ slug: 'send-detections', folder: 'detecties opsturen', nl: 'handleiding_detecties_opsturen', en: 'guide_send_detections_EN' }
];

const blockTypes = { tip: 'tip', let: 'note', waarschuwing: 'warning' };

/** @param {string} html */
function tidy(html) {
	return html.replace(/\s+/g, ' ').trim();
}

/** @param {string} html */
function inner(html, pattern) {
	const match = html.match(pattern);
	return match ? tidy(match[1]) : '';
}

/** @param {string} body */
function parseBlocks(body) {
	const blocks = [];
	const pattern = /<(p|figure|div|table|ul)([^>]*)>([\s\S]*?)<\/\1>/g;
	for (const [, tag, attrs, content] of body.matchAll(pattern)) {
		const cls = attrs.match(/class="([^"]*)"/)?.[1] ?? '';
		if (tag === 'p') blocks.push({ type: 'p', html: tidy(content) });
		else if (tag === 'ul') blocks.push({ type: 'ul', items: [...content.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => tidy(m[1])) });
		else if (tag === 'table') {
			const rows = [...content.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
				[...row[1].matchAll(/<(th|td)>([\s\S]*?)<\/\1>/g)].map((cell) => tidy(cell[2]))
			);
			blocks.push({ type: 'table', head: rows[0], rows: rows.slice(1) });
		} else if (tag === 'figure') {
			const img = content.match(/<img src="afbeeldingen\/([^"]+)" alt="([^"]*)"/);
			blocks.push({
				type: 'figure',
				src: img[1],
				alt: img[2],
				caption: inner(content, /<figcaption>([\s\S]*?)<\/figcaption>/),
				small: cls.includes('klein') || undefined
			});
		} else if (tag === 'div' && blockTypes[cls]) blocks.push({ type: blockTypes[cls], html: tidy(content) });
		else throw new Error(`Unknown block <${tag} class="${cls}">`);
	}
	return blocks;
}

/** @param {string} file */
function parseGuide(file) {
	const html = readFileSync(file, 'utf-8');
	const steps = [...html.matchAll(/<section class="stap">([\s\S]*?)<\/section>/g)].map(([, section]) => {
		const title = inner(section, /<h2>([\s\S]*?)<\/h2>/);
		const body = section.replace(/<div class="kop">[\s\S]*?<\/h2><\/div>/, '');
		return { title, blocks: parseBlocks(body) };
	});
	return {
		title: inner(html, /<h1>([\s\S]*?)<\/h1>/),
		subtitle: inner(html, /<p class="sub">([\s\S]*?)<\/p>/),
		intro: inner(html, /<div class="intro">([\s\S]*?)<\/div>/),
		steps
	};
}

mkdirSync(contentDir, { recursive: true });

for (const guide of guides) {
	const dir = join(source, guide.folder, 'handleiding');
	const out = join(staticDir, guide.slug);
	mkdirSync(join(out, 'img'), { recursive: true });

	const data = { nl: parseGuide(join(dir, `${guide.nl}.html`)), en: parseGuide(join(dir, `${guide.en}.html`)) };
	if (data.nl.steps.length !== data.en.steps.length) throw new Error(`${guide.slug}: NL and EN have a different number of steps`);
	writeFileSync(join(contentDir, `${guide.slug}.json`), JSON.stringify(data, null, '\t') + '\n');

	for (const image of readdirSync(join(dir, 'afbeeldingen'))) copyFileSync(join(dir, 'afbeeldingen', image), join(out, 'img', image));
	copyFileSync(join(dir, `${guide.nl}.pdf`), join(out, `${guide.slug}-nl.pdf`));
	copyFileSync(join(dir, `${guide.en}.pdf`), join(out, `${guide.slug}-en.pdf`));

	const figures = data.en.steps.flatMap((step) => step.blocks.filter((block) => block.type === 'figure'));
	const missing = figures.filter((figure) => !existsSync(join(out, 'img', figure.src)));
	if (missing.length) throw new Error(`${guide.slug}: missing images ${missing.map((m) => m.src).join(', ')}`);
	console.log(`✅ ${guide.slug}: ${data.en.steps.length} steps, ${figures.length} figures`);
}
