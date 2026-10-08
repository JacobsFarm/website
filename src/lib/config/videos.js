/**
 * Uitlegvideo op de homepage, per taal.
 *
 * Alleen de YouTube-ID (het deel na `youtu.be/`) invullen. Bezoekers met de
 * Nederlandse taal krijgen `nl`; alle andere talen krijgen `default`.
 */
/** @type {Record<string, string>} */
export const explainerVideos = {
	nl: 'y4tLrIhBQIE',
	default: 'y4tLrIhBQIE'
};

/** @param {string} locale */
export function explainerVideoFor(locale) {
	return explainerVideos[locale] ?? explainerVideos.default;
}
