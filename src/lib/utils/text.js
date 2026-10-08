/**
 * Kleine helpers om bestaande vertalingen netjes te tonen, zonder in tien
 * talen nieuwe varianten te hoeven onderhouden.
 */

/** "🌍 Community-driven" → "Community-driven"
 * @param {string} text */
export function stripEmoji(text) {
	return text.replace(/^[\p{Extended_Pictographic}️‍\s]+/u, '').trim();
}

/** "1. Hardware Installation" → "Hardware Installation"
 * @param {string} text */
export function stripNumber(text) {
	return text.replace(/^\s*\d+[.)]\s*/, '');
}

/** "Choose your platform:" → "Choose your platform"
 * @param {string} text */
export function stripColon(text) {
	return text.replace(/[:：]\s*$/, '');
}

/**
 * "24/7 Monitoring: The program monitors…" → { label: "24/7 Monitoring", text: "The program monitors…" }
 * Zonder dubbele punt komt alles in `text`.
 * @param {string} text
 */
export function splitLabel(text) {
	const index = text.indexOf(':');
	if (index <= 0 || index > 60) return { label: '', text };
	return { label: text.slice(0, index).trim(), text: text.slice(index + 1).trim() };
}

/** "Your barn, Your data, Our vision" → ["Your barn", "Your data", "Our vision"]
 * @param {string} text */
export function splitMotto(text) {
	return text
		.split(/[,،]/)
		.map((part) => part.trim())
		.filter(Boolean);
}
