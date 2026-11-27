import { links } from './links.js';

/**
 * Old and short addresses that forward to the right page.
 *
 * Each key gets its own prerendered page (see src/routes/[...redirect]), which
 * forwards with a meta refresh, so old links in articles and forum posts keep
 * working on GitHub Pages. Targets that start with "/" are pages of this site.
 *
 * @type {Record<string, string>}
 */
export const redirects = {
	// Pages from earlier versions of the site
	'installation/pc': '/installation/download/Windows/',
	'installation/jetson-nano': '/installation/download/docker/#step-3',
	'projects/calfcatcher': '/projects/calvingcatcher/',
	demo: '/',
	'demo/paraglide': '/',

	// Short, easy to type addresses
	tutorial: '/tutorials/',
	video: '/tutorials/',
	videos: '/tutorials/',
	handleiding: '/tutorials/',
	install: '/installation/',
	installatie: '/installation/',
	download: '/installation/download/',
	downloads: '/installation/download/',
	hardware: '/installation/hardware/',
	config: '/installation/configuration/',
	configuration: '/installation/configuration/',
	json: '/installation/configuration/',
	'installation/config': '/installation/configuration/',
	'installation/json': '/installation/configuration/',
	'installation/download/mac': '/installation/download/macOS/',
	'installation/download/linux': '/installation/download/docker/',
	'installation/download/ubuntu': '/installation/download/docker/#step-1',
	'installation/download/jetson': '/installation/download/docker/#step-3',
	cowcatcher: '/projects/cowcatcher/',
	calvingcatcher: '/projects/calvingcatcher/',
	'ai-detector': '/projects/ai-detector/',
	aidetector: '/projects/ai-detector/',
	about: '/about-us/',

	// Community
	telegram: links.telegram,
	facebook: links.facebook,
	github: links.github
};

/** Every page of the site, used by the 404 page to repair a mistyped address. */
export const knownPaths = [
	'/',
	'/about-us/',
	'/installation/',
	'/installation/hardware/',
	'/installation/download/',
	'/installation/download/Windows/',
	'/installation/download/macOS/',
	'/installation/download/docker/',
	'/installation/options/',
	'/installation/configuration/',
	'/projects/cowcatcher/',
	'/projects/calvingcatcher/',
	'/projects/ai-detector/',
	'/tutorials/'
];

/**
 * Finds where a mistyped address should go: "/installation/download/windows"
 * and "/Installation/Hardware" (wrong case or no trailing slash) resolve to the
 * real page, and short addresses resolve through `redirects`.
 * @param {string} path path without the base, e.g. "/installation/download/windows"
 * @param {string[]} extra additional known paths, such as the tutorial pages
 * @returns {string | null}
 */
export function resolveRedirect(path, extra = []) {
	const clean = path.replace(/\/+$/, '').replace(/^\/+/, '').toLowerCase();
	const fromTable = Object.entries(redirects).find(([from]) => from.toLowerCase() === clean);
	if (fromTable) return fromTable[1];
	const match = [...knownPaths, ...extra].find((known) => known.replace(/\/+$/, '').replace(/^\/+/, '').toLowerCase() === clean);
	return match ?? null;
}
