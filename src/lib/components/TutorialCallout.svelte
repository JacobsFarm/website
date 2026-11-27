<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { getLocale } from '$lib/paraglide/runtime';
	import { tutorialBySlug, guideFor, formatTime } from '$lib/content/tutorials.js';
	import Icon from './Icon.svelte';

	/**
	 * A compact link to a video tutorial, for use inside the guides:
	 * thumbnail with play button, title and duration.
	 *
	 * @type {{ slug: string, text?: string }}
	 */
	let { slug, text = '' } = $props();

	const tutorial = $derived(tutorialBySlug(slug));
	const guide = $derived(tutorial ? guideFor(tutorial, getLocale()) : null);
</script>

{#if tutorial && guide}
	<a href="{base}/tutorials/{slug}/" class="callout">
		<span class="thumb">
			<img src="{base}/tutorials/{slug}/poster.jpg" alt="" loading="lazy" width="1280" height="720" />
			<span class="play" aria-hidden="true"><Icon name="play" size={14} /></span>
		</span>
		<span class="copy">
			<span class="kicker">{m.tutorials_eyebrow()} · {formatTime(tutorial.duration)}</span>
			<span class="title">{guide.title}</span>
			{#if text}<span class="text">{text}</span>{/if}
		</span>
		<span class="go" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
	</a>
{/if}

<style>
	.callout {
		display: grid;
		grid-template-columns: 7.5rem minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: center;
		margin: 1.25rem 0;
		padding: 0.6rem 1rem 0.6rem 0.6rem;
		border-radius: var(--radius);
		background: var(--surface-tint);
		box-shadow: inset 0 0 0 1px var(--line);
		color: var(--text-main) !important;
		text-decoration: none !important;
		transition: box-shadow var(--dur-fast) var(--ease-out);
	}

	.callout:hover {
		box-shadow: inset 0 0 0 1px var(--primary);
	}

	.thumb {
		position: relative;
		display: block;
		aspect-ratio: 16 / 9;
		border-radius: var(--radius-sm);
		background: var(--forest);
		overflow: hidden;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.play {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		margin: auto;
		width: 2rem;
		height: 2rem;
		padding-left: 0.1rem;
		border-radius: 50%;
		background: oklch(98% 0.006 145 / 0.92);
		color: var(--primary);
	}

	.copy {
		display: grid;
		gap: 0.15rem;
		min-width: 0;
	}

	.kicker {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--amber-ink);
	}

	.title {
		font-weight: 600;
		line-height: 1.3;
	}

	.text {
		color: var(--text-muted);
		font-size: 0.9rem;
		line-height: 1.45;
	}

	.go {
		color: var(--primary);
		transition: transform var(--dur) var(--ease-spring);
	}

	.callout:hover .go {
		transform: translateX(3px);
	}

	@media (max-width: 480px) {
		.callout {
			grid-template-columns: 5.5rem minmax(0, 1fr);
		}

		.go {
			display: none;
		}
	}
</style>
