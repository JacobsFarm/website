import * as m from '$lib/paraglide/messages.js';

import cowcatcherLogo from '$lib/assets/CowCatchter-logo-875x875.jpg';
import calvingcatcherLogo from '$lib/assets/calvingcatcher-logo-875x-875.jpg';
import aiDetectorLogo from '$lib/assets/Ai-detector-logo-800x800.jpg';

/**
 * De drie projecten — gebruikt door de homepage-kaarten en de mobiele
 * navigatielinks. `title` en `desc` zijn message-functies, dus roep ze in de
 * template aan (`project.title()`) zodat ze de actieve taal volgen.
 */
export const projects = [
	{
		id: 'cowcatcher',
		name: 'CowCatcher',
		link: '/projects/cowcatcher',
		logo: cowcatcherLogo,
		title: m.front_page_cowcatcher_title,
		desc: m.front_page_cowcatcher_desc
	},
	{
		id: 'calvingcatcher',
		name: 'CalvingCatcher',
		link: '/projects/calvingcatcher',
		logo: calvingcatcherLogo,
		title: m.front_page_calvingcatcher_title,
		desc: m.front_page_calvingcatcher_desc
	},
	{
		id: 'ai-detector',
		name: 'AI-Detector',
		link: '/projects/ai-detector',
		logo: aiDetectorLogo,
		title: m.front_page_ai_detector_title,
		desc: m.front_page_ai_detector_desc
	}
];
