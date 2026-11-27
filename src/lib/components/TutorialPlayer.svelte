<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { getLocale } from '$lib/paraglide/runtime';
	import { formatTime } from '$lib/content/tutorials.js';
	import Icon from './Icon.svelte';

	/**
	 * Tutorial video (from the CowCatcher AI YouTube channel) with a clickable
	 * chapter list. Clicking a chapter jumps there and starts playing; the
	 * chapter being played lights up. The player is driven through the YouTube
	 * iframe API (postMessage), so no YouTube script has to be loaded.
	 * Uses youtube-nocookie.com, like the homepage video.
	 *
	 * @type {{ tutorial: import('$lib/content/tutorials.js').Tutorial, title: string }}
	 */
	let { tutorial, title } = $props();

	const YT = 'https://www.youtube-nocookie.com';

	/** @type {HTMLIFrameElement | undefined} */
	let frame = $state();
	/** @type {HTMLElement} */
	let box;
	let src = $state('');
	let ready = $state(false);
	let currentTime = $state(0);

	const locale = getLocale();
	const poster = $derived(`${base}/tutorials/${tutorial.slug}/poster.jpg`);
	const chapters = $derived(
		tutorial.chapters.map(([start, nl, en], i) => ({
			start,
			label: locale === 'nl' ? nl : en,
			end: tutorial.chapters[i + 1]?.[0] ?? tutorial.duration
		}))
	);
	const active = $derived(chapters.findIndex((chapter) => currentTime >= chapter.start && currentTime < chapter.end));

	// The iframe is only built in the browser: `origin` must be the page's own.
	$effect(() => {
		const params = new URLSearchParams({
			enablejsapi: '1',
			rel: '0',
			modestbranding: '1',
			playsinline: '1',
			hl: locale,
			origin: location.origin
		});
		// The videos are spoken in Dutch; everyone else gets subtitles (English when available).
		if (locale !== 'nl') {
			params.set('cc_load_policy', '1');
			params.set('cc_lang_pref', 'en');
		}
		src = `${YT}/embed/${tutorial.youtube}?${params}`;
		ready = false;
		currentTime = 0;

		/** @param {MessageEvent} event */
		function onMessage(event) {
			if (event.origin !== YT || event.source !== frame?.contentWindow) return;
			let data;
			try {
				data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
			} catch {
				return;
			}
			const time = data?.info?.currentTime;
			if (typeof time === 'number') currentTime = time;
		}
		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	});

	/** @param {Record<string, unknown>} message */
	function post(message) {
		frame?.contentWindow?.postMessage(JSON.stringify({ id: 1, channel: 'widget', ...message }), YT);
	}

	function onLoad() {
		ready = true;
		// Ask the player to report its state (currentTime) back to us.
		post({ event: 'listening' });
	}

	/** @param {number} start */
	function jump(start) {
		currentTime = start;
		post({ event: 'command', func: 'seekTo', args: [start, true] });
		post({ event: 'command', func: 'playVideo', args: [] });
		box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
</script>

<div class="player">
	<div class="frame" bind:this={box}>
		<div class="screen">
			<img class="poster" class:hidden={ready} src={poster} alt="" width="1280" height="720" />
			{#if src}
				<iframe
					bind:this={frame}
					{src}
					{title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					class:ready
					onload={onLoad}
				></iframe>
			{/if}
		</div>
	</div>

	<p class="spoken">
		<Icon name="globe" size={15} /> {m.tutorials_spoken()}
		<a class="yt-link" href="https://www.youtube.com/watch?v={tutorial.youtube}" target="_blank" rel="noopener noreferrer">
			{m.home_video_open()} <Icon name="arrow-up-right" size={13} />
		</a>
	</p>

	{#if chapters.length}
		<nav class="chapters" aria-label={m.tutorials_chapters()}>
			<h2 class="chapters-title">{m.tutorials_chapters()}</h2>
			<ol>
				{#each chapters as chapter, i (chapter.start)}
					<li>
						<button
							type="button"
							class:active={i === active}
							aria-current={i === active ? 'true' : undefined}
							onclick={() => jump(chapter.start)}
						>
							<span class="time">{formatTime(chapter.start)}</span>
							<span class="label">{chapter.label}</span>
							<Icon name="play" size={12} class="go" />
						</button>
					</li>
				{/each}
			</ol>
		</nav>
	{/if}
</div>

<style>
	.player {
		display: grid;
		gap: 1rem;
	}

	.frame {
		padding: 0.5rem;
		border-radius: var(--radius-xl);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-md);
	}

	.screen {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - 0.5rem);
		background: var(--forest);
	}

	.poster,
	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.poster {
		object-fit: cover;
		transition: opacity 0.5s var(--ease-out);
	}

	.poster.hidden {
		opacity: 0;
	}

	iframe {
		opacity: 0;
		transition: opacity 0.6s var(--ease-out);
	}

	iframe.ready {
		opacity: 1;
	}

	.spoken {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
		margin: 0;
		padding-inline: 0.5rem;
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.yt-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		margin-left: auto;
		color: var(--text-muted);
		text-underline-offset: 3px;
	}

	.chapters {
		padding: 1rem;
		border-radius: var(--radius-lg);
		background: var(--surface-tint);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.chapters-title {
		margin: 0 0 0.6rem 0.4rem;
		font-family: var(--font-body);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	ol {
		display: grid;
		gap: 0.15rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 720px) {
		ol {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			column-gap: 0.75rem;
		}
	}

	button {
		display: grid;
		grid-template-columns: 3.1rem minmax(0, 1fr) auto;
		gap: 0.5rem;
		align-items: center;
		width: 100%;
		padding: 0.5rem 0.6rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-main);
		font: inherit;
		font-size: 0.92rem;
		text-align: left;
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	button:hover {
		background: oklch(100% 0 0 / 0.7);
	}

	button.active {
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--primary);
		color: var(--primary-ink);
		font-weight: 600;
	}

	.time {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--amber-ink);
	}

	button :global(.go) {
		color: var(--primary);
		opacity: 0;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	button:hover :global(.go),
	button.active :global(.go) {
		opacity: 1;
	}
</style>
