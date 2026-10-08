/**
 * Scroll-reveal: laat een element (of zijn kinderen) zacht in beeld schuiven
 * zodra het de viewport binnenkomt.
 *
 *   <section use:reveal>…</section>                       — dit element
 *   <div class="grid" use:reveal={{ stagger: 90 }}>…</div> — de kinderen, na elkaar
 *
 * De classes worden pas vanuit JavaScript gezet, dus zonder JS blijft alle
 * inhoud zichtbaar. Onder `prefers-reduced-motion` gebeurt er niets. Wat bij
 * het laden al in beeld staat, wordt niet eerst verborgen (geen flikkering).
 *
 * @param {HTMLElement} node
 * @param {{ stagger?: number, delay?: number }} [options]
 */
export function reveal(node, options = {}) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!('IntersectionObserver' in window)) return;

	const { stagger = 0, delay = 0 } = options;
	const targets = /** @type {HTMLElement[]} */ (stagger ? Array.from(node.children) : [node]);

	// Staat het element bij het laden al (grotendeels) in beeld? Dan laten we het met rust.
	const rect = node.getBoundingClientRect();
	if (rect.top < window.innerHeight * 0.9) return;

	targets.forEach((el, i) => {
		el.classList.add('reveal-init');
		el.style.setProperty('--reveal-delay', `${delay + i * stagger}ms`);
	});

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				for (const el of targets) el.classList.add('reveal-in');
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
