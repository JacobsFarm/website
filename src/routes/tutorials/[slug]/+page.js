import { error } from '@sveltejs/kit';
import { tutorials, tutorialBySlug } from '$lib/content/tutorials.js';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return tutorials.map(({ slug }) => ({ slug }));
}

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const tutorial = tutorialBySlug(params.slug);
	if (!tutorial) error(404, 'Tutorial not found');
	return { slug: tutorial.slug };
}
