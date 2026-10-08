<script>
	import * as m from '$lib/paraglide/messages.js';
	import agrarischOndernemerLogo from '$lib/assets/front_page_logo_agrarisch_ondernemer_2026.png';
	import prikkebordLogo from '$lib/assets/front_page_logo_prikkebord.png';
	import sterkeErvenLogo from '$lib/assets/sterke_erven_logo.svg';
	import foodlogLogo from '$lib/assets/foodlog-logo.jpg';
	import melkvanhetnoordenlogo from '$lib/assets/melk_van_het_noorden.png';

	/** Vakbladen en media waarin CowCatcher AI is verschenen. */
	const logos = [
		{
			src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe72fda3c1fd7a4e08_veeteelt_logo.svg',
			alt: 'Veeteelt',
			href: 'https://veeteelt.nl/gezondheid/gratis-ai-software-informeert-boeren-over-afkalvingen'
		},
		{
			src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfee147649bdd8dd029_boerderij_logo.svg',
			alt: 'Boerderij',
			href: 'https://www.boerderij.nl/video-jan-jaap-verweij-ontwikkelt-gratis-tool-voor-detecteren-tochtige-koeien'
		},
		{
			src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe4919eaa9196cceb7_nieuwe%20oogst_logo.svg',
			alt: 'Nieuwe Oogst',
			href: 'https://www.nieuweoogst.nl/nieuws/2025/09/30/melkveehouder-ontwikkelt-cowcatcher-gratis-programma-voor-tochtdetectie'
		},
		{
			src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe08ff0a9f00554e61_veehouderij%20techniek_logo.svg',
			alt: 'Veehouderij Techniek',
			href: 'https://www.mechaman.nl/veehouderij-techniek/artikel/20260720/koe-volgen-met-camera-zo-werkt-cowcatcher/'
		},
		{
			src: sterkeErvenLogo,
			alt: 'Sterke Erven Melkvee',
			href: 'https://sterke-erven.nl/artikel/631761-ai-systeem-helpt-bij-detectie-van-tochtige-koeien'
		},
		{
			src: 'https://cdn.brandfetch.io/idgfMn7mzV/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1770955759252',
			alt: 'VILT',
			href: 'https://vilt.be/nl/nieuws/groep-boeren-ontwikkelt-ai-tool-voor-tocht-en-afkalfdectie-melkvee'
		},
		{
			src: foodlogLogo,
			alt: 'Foodlog',
			href: 'https://www.foodlog.nl/artikel/met-een-camera-boer-je-beter'
		},
		{
			src: 'https://cdn.brandfetch.io/idj2Epissl/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1771540125311',
			alt: 'Omrop Fryslân',
			href: 'https://www.omropfryslan.nl/nl/nieuws/18353769/hoe-ai-de-friese-boer-kan-steunen-in-het-dagelijks-werk'
		},
		{
			src: agrarischOndernemerLogo,
			alt: 'Agrarisch Ondernemer 2026',
			isWhiteLogo: true,
			href: 'https://agrarischondernemer.nl/jong-agrarisch-talent-genomineerden/'
		},
		{
			src: 'https://cdn.brandfetch.io/idArW_C6LY/w/2048/h/2048/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1775493657540',
			alt: 'NOS Journaal Regio',
			href: 'https://npo.nl/start/afspelen/nos-journaal-regio_1359'
		},
		{
			src: melkvanhetnoordenlogo,
			alt: 'Melk van het Noorden',
			href: 'https://www.melkvanhetnoorden.nl/laatste-nieuws/achtergrond/wie-staat-er-aan-het-roer-ai-of-de-boer/'
		},
		{
			src: prikkebordLogo,
			alt: 'Prikkebord forum',
			href: 'https://www.prikkebord.nl/topic/362840/'
		}
	];
</script>

<section class="featured" aria-labelledby="featured-title">
	<div class="container inner">
		<h2 id="featured-title" class="label">
			<span class="count">{logos.length}×</span>
			{m.front_page_featured_in_title()}
		</h2>

		<div class="marquee">
			<!-- De lijst staat er twee keer in, zodat de band naadloos doorloopt.
			     De tweede helft is alleen decoratief. -->
			<ul class="track" style="--duration: {logos.length * 3.6}s">
				{#each [0, 1] as copy}
					{#each logos as logo (logo.alt + copy)}
						<li aria-hidden={copy === 1 ? 'true' : undefined}>
							<a
								href={logo.href}
								target="_blank"
								rel="noopener noreferrer"
								tabindex={copy === 1 ? -1 : undefined}
								title={logo.alt}
							>
								<img src={logo.src} alt={logo.alt} class:white-logo={logo.isWhiteLogo} loading="lazy" />
							</a>
						</li>
					{/each}
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.featured {
		padding-block: 2.5rem;
		border-block: 1px solid var(--line);
		background: oklch(100% 0 0 / 0.45);
	}

	.inner {
		display: grid;
		gap: 1.25rem;
		align-items: center;
	}

	.label {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		line-height: 1.3;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.count {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 400;
		letter-spacing: 0;
		color: var(--primary);
	}

	.marquee {
		overflow: hidden;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: flex;
		align-items: center;
		width: max-content;
		margin: 0;
		padding: 0.5rem 0;
		list-style: none;
		animation: marquee var(--duration) linear infinite;
	}

	.marquee:hover .track,
	.marquee:focus-within .track {
		animation-play-state: paused;
	}

	li {
		flex: 0 0 auto;
		padding-inline: clamp(1.5rem, 3vw, 2.5rem);
	}

	a {
		display: grid;
		place-items: center;
		height: 4rem;
		border-radius: var(--radius-sm);
	}

	img {
		max-width: 9.5rem;
		max-height: 3.4rem;
		width: auto;
		object-fit: contain;
		filter: grayscale(1);
		opacity: 0.6;
		transition:
			filter var(--dur) var(--ease-out),
			opacity var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-spring);
	}

	a:hover img,
	a:focus-visible img {
		filter: none;
		opacity: 1;
		transform: scale(1.08);
	}

	img.white-logo {
		padding: 0.5rem 0.9rem;
		border-radius: var(--radius-sm);
		background: var(--text-main);
	}

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}

	@media (min-width: 900px) {
		.inner {
			grid-template-columns: 11rem minmax(0, 1fr);
			gap: 2rem;
		}

		.label {
			flex-direction: column;
			gap: 0.1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee {
			overflow-x: auto;
		}

		.track {
			animation: none;
		}
	}
</style>
