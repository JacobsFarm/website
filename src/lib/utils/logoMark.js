import raw from '$lib/assets/CowCatchterAI logo.svg?raw';

/**
 * Het CowCatcher-beeldmerk als inline SVG. De ingebouwde <style> en XML-kop gaan
 * eruit, zodat de klassen niet naar de rest van de pagina lekken en de kleuren
 * per `tone` via CSS te sturen zijn (`.body` = koe, `.detail` = oog/circuits).
 */
export const logoMark = raw
	.replace(/<\?xml[^>]*\?>/, '')
	.replace(/<defs>[\s\S]*?<\/defs>/, '')
	.replace('<svg ', '<svg aria-hidden="true" width="100%" height="100%" ')
	.replaceAll('class="c"', 'class="detail"')
	.replaceAll('class="d"', 'class="body"');
