import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

/**
 * Handle functie die de Paraglide middleware aanroept.
 * Deze zorgt voor de juiste taalinstellingen en vervangt de placeholders
 * in je app.html (%paraglide.lang% en %paraglide.dir%).
 */
const handleParaglide: Handle = ({ event, resolve }) => {
    return paraglideMiddleware(event.request, ({ request, locale }) => {
        // Update het request object met de gedetecteerde taal
        event.request = request;

        return resolve(event, {
            transformPageChunk: ({ html }) => {
                // Gebruik een fallback ('nl') als locale onverhoopt undefined is
                const lang = locale || 'nl';
                const dir = getTextDirection(lang);

                return html
                    .replace('%paraglide.lang%', lang)
                    .replace('%paraglide.dir%', dir);
            }
        });
    });
};

// Exporteer de handle functie die SvelteKit verwacht
export const handle: Handle = handleParaglide;