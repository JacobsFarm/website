/**
 * Uitlegvideo (homepage en AI Detector-pagina), per taal.
 * nl: 'Cowcatcher AI programma uitgelegd', default: 'Cowcatcher AI program explained'.
 *
 * Alleen de YouTube-ID (het deel na `youtu.be/`) invullen. Bezoekers met de
 * Nederlandse taal krijgen `nl`; alle andere talen krijgen `default`.
 */
/** @type {Record<string, string>} */
export const explainerVideos = {
	nl: 'y4tLrIhBQIE',
	default: 'nzdrig5fQT4'
};

/** @param {string} locale */
export function explainerVideoFor(locale) {
	return explainerVideos[locale] ?? explainerVideos.default;
}
