<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { getLocale } from '$lib/paraglide/runtime';
	import { tutorials, tutorialBySlug, guideFor, formatTime } from '$lib/content/tutorials.js';
	import Seo from '$lib/components/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import DocLayout from '$lib/components/DocLayout.svelte';
	import TutorialPlayer from '$lib/components/TutorialPlayer.svelte';
	import TutorialGuide from '$lib/components/TutorialGuide.svelte';
	import TutorialCard from '$lib/components/TutorialCard.svelte';
	import PagerNav from '$lib/components/PagerNav.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();

	const locale = getLocale();
	const tutorial = $derived(/** @type {import('$lib/content/tutorials.js').Tutorial} */ (tutorialBySlug(data.slug)));
	const guide = $derived(guideFor(tutorial, locale));
	const index = $derived(tutorials.indexOf(tutorial));
	const prev = $derived(tutorials[index - 1]);
	const next = $derived(tutorials[index + 1]);
	const more = $derived(
		[...tutorials.filter((t) => t !== tutorial && t.category === tutorial.category), ...tutorials.filter((t) => t.category !== tutorial.category)].slice(0, 3)
	);
	const toc = $derived(guide.steps.map((step, i) => ({ id: `step-${i + 1}`, label: step.title })));
	const plainIntro = $derived(guide.intro.replace(/<[^>]+>/g, ''));

	const categoryLabel = {
		install: m.tutorials_cat_install,
		settings: m.tutorials_cat_settings,
		share: m.tutorials_cat_share
	};

	/** @type {Record<string, () => string>} */
	const relatedLabel = {
		windows: m.windows_title,
		macos: m.os_macos_title,
		linux: m.docker_title,
		calvingcatcher: () => 'CalvingCatcher',
		recordings: () => `${m.options_title()} · ${m.use_rec_title()}`,
		config_cooldown: () => 'config.json · yolo.cooldown',
		config_confidence: () => 'config.json · yolo.confidence',
		config_health: () => 'config.json · health',
		telegram: () => 'Telegram · CowCatcher AI | opensource project'
	};

	/** @param {import('$lib/content/tutorials.js').Tutorial} t */
	const titleOf = (t) => guideFor(t, locale).title;
</script>

<Seo title={guide.title} description={plainIntro} />

<PageHeader
	eyebrow="{categoryLabel[tutorial.category]()} · {formatTime(tutorial.duration)}"
	title={guide.title}
	lead={guide.subtitle}
	crumbs={[{ href: '/tutorials/', label: m.tutorials_title() }]}
/>

<div class="container player-wrap">
	<TutorialPlayer {tutorial} title={guide.title} />
</div>

<DocLayout {toc}>
	<h2 id="guide" class="guide-title">{m.tutorials_guide_title()}</h2>
	<p class="intro">{@html guide.intro}</p>
	{#if locale !== 'nl' && locale !== 'en'}
		<p class="note">{m.tutorials_guide_in_english()}</p>
	{/if}

	<TutorialGuide {guide} slug={tutorial.slug} />

	{#if tutorial.pdf}
		<section class="pdf">
			<span class="pdf-icon"><Icon name="book" size={24} /></span>
			<div class="pdf-copy">
				<h3>{m.tutorials_pdf_title()}</h3>
				<p>{m.tutorials_pdf_text()}</p>
			</div>
			<div class="pdf-links">
				<a href="{base}/tutorials/{tutorial.slug}/{tutorial.slug}-nl.pdf" class="btn btn--ghost btn--sm" download>
					<Icon name="download" size={16} /> {m.tutorials_pdf_nl()}
				</a>
				<a href="{base}/tutorials/{tutorial.slug}/{tutorial.slug}-en.pdf" class="btn btn--ghost btn--sm" download>
					<Icon name="download" size={16} /> {m.tutorials_pdf_en()}
				</a>
			</div>
		</section>
	{/if}

	{#if tutorial.related?.length}
		<section class="related">
			<h3>{m.tutorials_related_title()}</h3>
			<ul>
				{#each tutorial.related as item (item.href)}
					<li>
						<a
							href={item.href.startsWith('http') ? item.href : `${base}${item.href}`}
							target={item.href.startsWith('http') ? '_blank' : undefined}
							rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						>
							<span>{relatedLabel[item.key]?.() ?? item.href}</span>
							<Icon name="arrow-right" size={16} />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<PagerNav
		prev={prev ? { href: `/tutorials/${prev.slug}/`, label: titleOf(prev) } : { href: '/tutorials/', label: m.tutorials_all() }}
		next={next ? { href: `/tutorials/${next.slug}/`, label: titleOf(next), hint: m.tutorials_more_title() } : { href: '/tutorials/', label: m.tutorials_all(), hint: m.tutorials_title() }}
	/>
</DocLayout>

<section class="more">
	<div class="container">
		<div class="more-head">
			<h2 class="h-section">{m.tutorials_more_title()}</h2>
			<a href="{base}/tutorials/" class="text-link">{m.tutorials_all()} &rarr;</a>
		</div>
		<ul class="more-grid">
			{#each more as item (item.slug)}
				<li><TutorialCard tutorial={item} /></li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.player-wrap {
		max-width: 64rem;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}

	.guide-title {
		margin-top: 0;
	}

	.intro {
		font-size: 1.08rem;
		color: var(--text-main);
		margin-bottom: 1.75rem !important;
	}

	.pdf {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1rem 1.25rem;
		align-items: center;
		margin-top: 2rem !important;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border-radius: var(--radius-lg);
		background: var(--surface-tint);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.pdf-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius);
		background: var(--primary);
		color: #fff;
	}

	.pdf-copy h3 {
		margin: 0 0 0.25rem;
		font-size: 1.3rem;
	}

	.pdf-copy p {
		margin: 0;
		color: var(--text-muted);
	}

	.pdf-links {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	@media (min-width: 760px) {
		.pdf {
			grid-template-columns: auto minmax(0, 1fr) auto;
		}

		.pdf-links {
			grid-column: auto;
		}
	}

	.related {
		margin-top: 2rem !important;
	}

	.related h3 {
		margin: 0 0 0.75rem;
	}

	.related ul {
		display: grid;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.related li + li {
		margin-top: 0;
	}

	.related a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.8rem 1rem;
		border-radius: var(--radius-sm);
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--line);
		color: var(--text-main) !important;
		font-weight: 500;
		text-decoration: none !important;
		transition: box-shadow var(--dur-fast) var(--ease-out);
	}

	.related a:hover {
		box-shadow: 0 0 0 1px var(--primary);
	}

	.related a :global(svg) {
		color: var(--primary);
		flex-shrink: 0;
	}

	.more {
		padding-bottom: var(--section-y);
	}

	.more-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.more-grid {
		display: grid;
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 700px) {
		.more-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1080px) {
		.more-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
