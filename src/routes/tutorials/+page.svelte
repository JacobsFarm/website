<script>
	import * as m from '$lib/paraglide/messages.js';
	import { reveal } from '$lib/actions/reveal.js';
	import { links } from '$lib/config/links.js';
	import { tutorials, categories } from '$lib/content/tutorials.js';
	import Seo from '$lib/components/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TutorialCard from '$lib/components/TutorialCard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/** @type {Record<string, () => string>} */
	const labels = {
		all: m.tutorials_cat_all,
		install: m.tutorials_cat_install,
		settings: m.tutorials_cat_settings,
		share: m.tutorials_cat_share
	};

	/** @type {'all' | (typeof categories)[number]} */
	let filter = $state('all');

	const [featured, ...rest] = tutorials;
	const shown = $derived(filter === 'all' ? rest : tutorials.filter((t) => t.category === filter));
	const count = (/** @type {string} */ category) =>
		category === 'all' ? tutorials.length : tutorials.filter((t) => t.category === category).length;
</script>

<Seo title={m.tutorials_title()} description={m.tutorials_lead()} />

<PageHeader eyebrow={m.tutorials_eyebrow()} title={m.tutorials_title()} lead={m.tutorials_lead()} />

<div class="container page">
	<div class="filters" role="group" aria-label={m.tutorials_filter_label()}>
		{#each ['all', ...categories] as category (category)}
			<button
				type="button"
				class="filter"
				class:active={filter === category}
				aria-pressed={filter === category}
				onclick={() => (filter = /** @type {typeof filter} */ (category))}
			>
				{labels[category]()}
				<span class="count">{count(category)}</span>
			</button>
		{/each}
	</div>

	{#if filter === 'all'}
		<div class="featured" use:reveal>
			<TutorialCard tutorial={featured} featured headingLevel={2} />
		</div>
	{/if}

	<ul class="grid" use:reveal={{ stagger: 90 }}>
		{#each shown as tutorial (tutorial.slug)}
			<li><TutorialCard {tutorial} headingLevel={2} /></li>
		{/each}
	</ul>

	<section class="missing" use:reveal>
		<div>
			<h2>{m.tutorials_missing_title()}</h2>
			<p>{m.tutorials_missing_text()}</p>
		</div>
		<a href={links.telegram} target="_blank" rel="noopener noreferrer" class="btn btn--light">
			<Icon name="telegram" size={18} /> Telegram
			<span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
		</a>
	</section>
</div>

<style>
	.page {
		padding-bottom: var(--section-y);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
	}

	.filter {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.6rem 0.55rem 1rem;
		border: 0;
		border-radius: var(--radius-pill);
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--line);
		color: var(--text-main);
		font: inherit;
		font-size: 0.92rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			box-shadow var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.filter:hover {
		box-shadow: 0 0 0 1px var(--primary);
	}

	.filter.active {
		background: var(--primary);
		box-shadow: none;
		color: #fff;
	}

	.count {
		display: grid;
		place-items: center;
		min-width: 1.5rem;
		height: 1.5rem;
		padding-inline: 0.35rem;
		border-radius: var(--radius-pill);
		background: var(--bg-sunken);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.filter.active .count {
		background: oklch(100% 0 0 / 0.2);
		color: #fff;
	}

	.featured {
		margin-bottom: 1.25rem;
	}

	.grid {
		display: grid;
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 700px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1080px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.missing {
		display: grid;
		gap: 1.5rem;
		margin-top: clamp(3rem, 6vw, 4.5rem);
		padding: clamp(1.75rem, 4vw, 3rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(30rem 18rem at 100% 0%, oklch(40% 0.08 150 / 0.7), transparent 70%),
			var(--forest);
		color: var(--on-dark-muted);
	}

	.missing h2 {
		margin-bottom: 0.5rem;
		font-size: clamp(2rem, 4vw, 2.8rem);
		color: var(--on-dark);
	}

	@media (min-width: 900px) {
		.missing {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: 3rem;
		}
	}
</style>
