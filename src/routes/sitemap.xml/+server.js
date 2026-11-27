import { knownPaths } from '$lib/config/redirects.js';
import { tutorials } from '$lib/content/tutorials.js';

export const prerender = true;

const site = (process.env.SITE_URL ?? 'https://jacobsfarm.github.io/website').replace(/\/$/, '');

/** The sitemap for search engines, built from the list of pages. */
export function GET() {
	const paths = [...knownPaths, ...tutorials.map(({ slug }) => `/tutorials/${slug}/`)];
	const today = new Date().toISOString().slice(0, 10);
	const urls = paths
		.map((path) => `\t<url>\n\t\t<loc>${site}${path}</loc>\n\t\t<lastmod>${today}</lastmod>\n\t</url>`)
		.join('\n');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}
