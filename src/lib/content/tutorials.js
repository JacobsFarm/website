import { links } from '$lib/config/links.js';
import installAiDetector from './tutorials/install-ai-detector.json';
import updateWindows from './tutorials/update-windows.json';
import heartbeat from './tutorials/heartbeat-healthchecks.json';
import tailUp from './tutorials/tail-up.json';
import calfDetection from './tutorials/calf-detection.json';
import sendDetections from './tutorials/send-detections.json';

/**
 * Video tutorials with their step-by-step guides.
 *
 * The guides are written in Dutch and English (`guide.nl`, `guide.en`); every
 * other language shows the English text. Video, poster, subtitles and PDFs
 * live in `static/tutorials/<slug>/`. Chapters are `[seconds, Dutch, English]`.
 *
 * To add a tutorial: put its files in `static/tutorials/<slug>/`, its guide in
 * `src/lib/content/tutorials/<slug>.json` and an entry below. The overview,
 * the detail page and the sitemap pick it up by themselves.
 *
 * @typedef {{ type: string, html?: string, items?: string[], head?: string[], rows?: string[][], src?: string, alt?: string, caption?: string, small?: boolean, code?: string }} GuideBlock
 * @typedef {{ title: string, subtitle: string, intro: string, steps: Array<{ title: string, blocks: GuideBlock[] }> }} Guide
 * @typedef {{ slug: string, category: 'install' | 'settings' | 'share', duration: number, spoken: string, subtitles: string[], pdf: boolean, youtube: string, related?: Array<{ href: string, key: string }>, chapters: Array<[number, string, string]>, guide: { nl: Guide, en: Guide } }} Tutorial
 */

/** @type {Tutorial[]} */
export const tutorials = [
	{
		slug: 'install-ai-detector',
		youtube: 'uDBnZuLhTTk',
		category: 'install',
		duration: 605,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: true,
		related: [
			{ href: '/installation/download/Windows/', key: 'windows' },
			{ href: '/installation/download/macOS/', key: 'macos' },
			{ href: '/installation/download/docker/', key: 'linux' }
		],
		chapters: [
			[0, 'Introductie', 'Introduction'],
			[6, 'De software vinden op GitHub', 'Find the software on GitHub'],
			[29, 'Het juiste bestand downloaden', 'Download the right file'],
			[69, 'Uitpakken en de setup starten', 'Extract and run the setup'],
			[105, 'De Windows-waarschuwing overslaan', 'Skip the Windows warning'],
			[134, 'Automatisch opstarten', 'Start automatically'],
			[169, 'Toestaan in de firewall', 'Allow it in the firewall'],
			[182, 'Camera’s verbinden', 'Connect your cameras'],
			[243, 'De camera een naam geven', 'Name the camera'],
			[256, 'Kiezen wat je wilt detecteren', 'Choose what to detect'],
			[310, 'Telegram koppelen', 'Connect Telegram'],
			[359, 'Bewaking starten', 'Start monitoring'],
			[421, 'Opnamen en bewaking', 'Recordings and monitoring'],
			[484, 'Camera’s en detectoren', 'Cameras and detectors'],
			[550, 'Standaard of Low Power', 'Standard or Low Power'],
			[592, 'Het programma afsluiten', 'Closing the program']
		],
		guide: installAiDetector
	},
	{
		slug: 'update-windows',
		youtube: 'e3EuUoKPU9s',
		category: 'install',
		duration: 87,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: true,
		related: [{ href: '/installation/download/Windows/', key: 'windows' }],
		chapters: [
			[0, 'De updatemelding', 'The update notification'],
			[12, 'Het systeemvak openen', 'Open the system tray'],
			[27, 'Check for Updates', 'Check for Updates'],
			[47, 'Download bevestigen', 'Confirm the download'],
			[59, 'Opnieuw starten', 'Restart'],
			[74, 'Installeren en klaar', 'Install and done']
		],
		guide: updateWindows
	},
	{
		slug: 'tail-up',
		youtube: 'Mes5plN3QuY',
		category: 'settings',
		duration: 87,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: true,
		related: [{ href: '/projects/calvingcatcher/', key: 'calvingcatcher' }],
		chapters: [
			[0, 'Introductie', 'Introduction'],
			[9, 'Naar Detectors', 'Go to Detectors'],
			[18, 'Detector toevoegen en Tailup kiezen', 'Add a detector and choose Tailup'],
			[26, 'Camera’s kiezen', 'Select the cameras'],
			[34, 'Telegram en opslaan', 'Telegram and save'],
			[63, 'Bewaking controleren', 'Check monitoring'],
			[69, 'Twee detectoren per camera', 'Two detectors per camera']
		],
		guide: tailUp
	},
	{
		slug: 'calf-detection',
		youtube: 'yN3LnhUzKmY',
		category: 'settings',
		duration: 174,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: true,
		related: [
			{ href: '/installation/configuration/#yolo-cooldown', key: 'config_cooldown' },
			{ href: '/installation/configuration/#yolo-confidence', key: 'config_confidence' }
		],
		chapters: [
			[0, 'Het probleem', 'The problem'],
			[14, 'Naar de detectoren', 'Go to the detectors'],
			[28, 'Settings → Advanced', 'Settings → Advanced'],
			[43, 'Twee manieren', 'Two ways'],
			[48, 'Manier 1: cooldown verlengen', 'Method 1: a longer cooldown'],
			[104, 'Opslaan', 'Save'],
			[115, 'Manier 2: confidence verhogen', 'Method 2: a higher confidence'],
			[166, 'Bewaking controleren', 'Check monitoring']
		],
		guide: calfDetection
	},
	{
		slug: 'heartbeat-healthchecks',
		youtube: 'YE1cW0yq5TU',
		category: 'settings',
		duration: 306,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: false,
		related: [{ href: '/installation/configuration/#health', key: 'config_health' }],
		chapters: [
			[0, 'Waarom een hartslag?', 'Why a heartbeat?'],
			[12, 'Account aanmaken', 'Create an account'],
			[50, 'Telegram koppelen', 'Connect Telegram'],
			[117, 'Het schema instellen', 'Set the schedule'],
			[149, 'Naar de AI Detector', 'Go to the AI Detector'],
			[196, 'Ping-adres plakken en opslaan', 'Paste the ping address and save'],
			[219, 'Melding: online', 'Alert: up'],
			[236, 'Via het configuratiebestand', 'Through the configuration file'],
			[286, 'Melding: offline', 'Alert: down']
		],
		guide: heartbeat
	},
	{
		slug: 'send-detections',
		youtube: '7KUVhL72YT0',
		category: 'share',
		duration: 169,
		spoken: 'nl',
		subtitles: ['nl', 'en'],
		pdf: true,
		related: [
			{ href: links.telegram, key: 'telegram' },
			{ href: '/installation/options/#step-1', key: 'recordings' }
		],
		chapters: [
			[0, 'Waarom je detecties delen?', 'Why share your detections?'],
			[18, 'Opnamen → Export', 'Recordings → Export'],
			[43, 'Alleen de originele foto’s', 'Only the original photos'],
			[72, 'ZIP downloaden', 'Download the ZIP'],
			[84, 'Versturen via Telegram', 'Send it through Telegram'],
			[128, 'Oude opnamen verwijderen', 'Remove old recordings']
		],
		guide: sendDetections
	}
];

export const categories = /** @type {const} */ (['install', 'settings', 'share']);

/** @param {string} slug */
export function tutorialBySlug(slug) {
	return tutorials.find((tutorial) => tutorial.slug === slug);
}

/**
 * Dutch visitors get the Dutch guide, everyone else the English one.
 * @param {Tutorial} tutorial
 * @param {string} locale
 */
export function guideFor(tutorial, locale) {
	return locale === 'nl' ? tutorial.guide.nl : tutorial.guide.en;
}

/** 605 → "10:05"
 * @param {number} seconds */
export function formatTime(seconds) {
	const m = Math.floor(seconds / 60);
	const s = Math.round(seconds % 60);
	return `${m}:${String(s).padStart(2, '0')}`;
}
