<script>
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { explainerVideoFor } from '$lib/config/videos.js';
	import Icon from './Icon.svelte';

	/**
	 * YouTube-video die pas wordt geladen als de bezoeker ernaartoe scrolt.
	 * Welke video dat is hangt af van de taal (zie $lib/config/videos.js).
	 * Gebruikt youtube-nocookie.com, zodat YouTube pas iets opslaat als de
	 * bezoeker de video afspeelt.
	 */
	let { title = '' } = $props();

	/** @type {HTMLElement} */
	let box;
	let load = $state(false);
	let ready = $state(false);

	// Op de server bestaat er geen gekozen taal; de browser bepaalt de video.
	let videoId = $state(explainerVideoFor('en'));

	$effect(() => {
		videoId = explainerVideoFor(getLocale());

		if (!('IntersectionObserver' in window)) {
			load = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					load = true;
					observer.disconnect();
				}
			},
			{ rootMargin: '300px 0px' }
		);
		observer.observe(box);
		return () => observer.disconnect();
	});
</script>

<div class="video bezel" bind:this={box}>
	<div class="player">
		{#if load}
			<iframe
				src="https://www.youtube-nocookie.com/embed/{videoId}?rel=0&modestbranding=1&playsinline=1"
				{title}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				class:ready
				onload={() => (ready = true)}
			></iframe>
		{/if}

		<div class="placeholder" class:hidden={ready}>
			<span class="play" aria-hidden="true"><Icon name="play" size={28} /></span>
			<span class="hint">{m.home_video_placeholder()}</span>
			<a class="yt-link" href="https://youtu.be/{videoId}" target="_blank" rel="noopener noreferrer">
				{m.home_video_open()}
				<Icon name="arrow-up-right" size={14} />
			</a>
		</div>
	</div>
</div>

<style>
	.video {
		border-radius: var(--radius-xl);
	}

	.player {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - 0.45rem);
		background:
			radial-gradient(40rem 20rem at 30% 20%, oklch(40% 0.07 150 / 0.7), transparent 70%),
			var(--forest);
		box-shadow: var(--shadow-lg);
	}

	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		opacity: 0;
		transition: opacity 0.6s var(--ease-out);
	}

	iframe.ready {
		opacity: 1;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 1rem;
		padding: 1.5rem;
		color: var(--on-dark-muted);
		text-align: center;
		transition: opacity 0.5s var(--ease-out);
	}

	.placeholder.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.play {
		display: grid;
		place-items: center;
		width: 5rem;
		height: 5rem;
		padding-left: 0.3rem;
		border-radius: 50%;
		background: oklch(100% 0 0 / 0.1);
		color: var(--on-dark);
		box-shadow: inset 0 0 0 1px var(--line-dark);
		animation: breathe 2.4s ease-in-out infinite;
	}

	.hint {
		font-size: 0.95rem;
	}

	.yt-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--on-dark);
		font-size: 0.9rem;
		font-weight: 500;
		text-underline-offset: 3px;
	}

	@keyframes breathe {
		50% {
			transform: scale(1.06);
			box-shadow:
				inset 0 0 0 1px var(--line-dark),
				0 0 0 12px oklch(100% 0 0 / 0.04);
		}
	}
</style>
