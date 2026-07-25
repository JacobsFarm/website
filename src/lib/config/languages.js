/**
 * Ondersteunde talen — één bron voor de Navbar-dropdown en de LanguageModal.
 * Moet gelijk blijven aan `locales` in project.inlang/settings.json.
 */
export const languages = [
	{ code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
	{ code: 'nl', label: 'NL', name: 'Nederlands', flag: '🇳🇱' },
	{ code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
	{ code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
	{ code: 'pt', label: 'PT', name: 'Português', flag: '🇵🇹' },
	{ code: 'de', label: 'DE', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'it', label: 'IT', name: 'Italiano', flag: '🇮🇹' },
	{ code: 'pl', label: 'PL', name: 'Polski', flag: '🇵🇱' },
	{ code: 'ro', label: 'RO', name: 'Română', flag: '🇷🇴' },
	{ code: 'da', label: 'DA', name: 'Dansk', flag: '🇩🇰' }
];

/** Alleen de taalcodes, handig om een browsertaal tegen te valideren. */
export const languageCodes = languages.map((lang) => lang.code);
