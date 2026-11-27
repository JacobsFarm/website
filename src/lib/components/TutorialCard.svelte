<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { getLocale } from '$lib/paraglide/runtime';
	import { formatTime, guideFor } from '$lib/content/tutorials.js';
	import Icon from './Icon.svelte';

	/**
	 * A tutorial as a card: poster with play button and duration, the title,
	 * a one-line summary and the number of steps. `featured` makes it wide.
	 *
	 * @type {{ tutorial: import('$lib/content/tutorials.js').Tutorial, featured?: boolean, headingLevel?: number }}
	 */
	let { tutorial, featured = false, headingLevel = 3 } = $props();

	const guide = $derived(guideFor(tutorial, getLocale()));
	const summary = $derived.by(() => {
		const text = guide.subtitle.replace(/^[^–]*–\s*/, '');
		return text.charAt(0).toUpperCase() + text.slice(1);
	});
	const categoryLabel = {
		install: m.tutorials_cat_install,
		settings: m.tutorials_cat_settings,
		share: m.tutorials_cat_share
	};
</script>

<a href="{base}/tutorials/{tutorial.slug}/" class="card" class:featured>
	<span class="poster">
		<img src="{base}/tutorials/{tutorial.slug}/poster.jpg" alt="" loading="lazy" width="1280" height="720" />
		<span class="play" aria-hidden="true"><Icon name="play" size={22} /></span>
		<span class="duration"><Icon name="clock" size={13} /> {formatTime(tutorial.duration)}</span>
	</span>

	<span class="body">
		<span class="meta">
			{#if featured}<span class="chip chip--amber">{m.tutorials_featured()}</span>{/if}
			<span class="chip">{categoryLabel[tutorial.category]()}</span>
		</span>
		<svelte:element this={`h${headingLevel}`} class="title">{guide.title}</svelte:element>
		<span class="summary">{summary}</span>
		<span class="foot">
			<span>{m.tutorials_steps({ count: guide.steps.length })}</span>
			<span class="go">{m.tutorials_watch()} <Icon name="arrow-right" size={16} /></span>
		</span>
	</span>
</a>

<style>
	.card {
		display: grid;
		height: 100%;
		border-radius: var(--radius-xl);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		color: inherit;
		text-decoration: none;
		overflow: hidden;
		transition:
			transform var(--dur) var(--ease-spring),
			box-shadow var(--dur) var(--ease-spring);
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow:
			0 0 0 1px var(--primary),
			var(--shadow-hover);
	}

	.poster {
		position: relative;
		display: block;
		aspect-ratio: 16 / 9;
		margin: 0.5rem 0.5rem 0;
		border-radius: calc(var(--radius-xl) - 0.5rem);
		background: var(--forest);
		overflow: hidden;
	}

	.poster img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.9s var(--ease-out);
	}

	.card:hover .poster img {
		transform: scale(1.04);
	}

	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		display: grid;
		place-items: center;
		width: 3.6rem;
		height: 3.6rem;
		margin: -1.8rem 0 0 -1.8rem;
		padding-left: 0.2rem;
		border-radius: 50%;
		background: oklch(98% 0.006 145 / 0.92);
		color: var(--primary);
		box-shadow: var(--shadow-md);
		transition: transform var(--dur) var(--ease-spring);
	}

	.card:hover .play {
		transform: scale(1.1);
	}

	.duration {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.25rem 0.55rem;
		border-radius: var(--radius-pill);
		background: oklch(15% 0.02 150 / 0.78);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.body {
		display: grid;
		gap: 0.6rem;
		align-content: start;
		padding: 1.25rem 1.5rem 1.5rem;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		line-height: 1.05;
	}

	.summary {
		color: var(--text-muted);
		font-size: 0.97rem;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 0.35rem;
		color: var(--text-muted);
		font-size: 0.88rem;
	}

	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		color: var(--primary);
		font-weight: 600;
	}

	.go :global(svg) {
		transition: transform var(--dur) var(--ease-spring);
	}

	.card:hover .go :global(svg) {
		transform: translateX(4px);
	}

	@media (min-width: 900px) {
		.featured {
			grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
			align-items: center;
		}

		.featured .poster {
			margin: 0.5rem;
		}

		.featured .body {
			padding: 2rem 2.5rem 2rem 1.5rem;
			gap: 0.9rem;
		}

		.featured .title {
			font-size: clamp(2rem, 3.2vw, 2.8rem);
		}

		.featured .summary {
			font-size: 1.08rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card:hover,
		.card:hover .poster img,
		.card:hover .play {
			transform: none;
		}
	}
</style>
