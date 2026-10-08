<script>
	import Icon from './Icon.svelte';

	/**
	 * Beeldcarrousel met overvloeiende afbeeldingen, pijltjes en stipjes.
	 * Draait vanzelf door (behalve onder reduced motion of bij hover/focus).
	 *
	 * @property {Array<{src: string, alt: string}>} items
	 * @property {number} interval - Milliseconden per beeld; 0 = niet automatisch.
	 */
	let { items = [], interval = 5000, ratio = '16 / 10', label = 'Gallery' } = $props();

	let index = $state(0);
	let paused = $state(false);
	let visible = $state(false);
	/** @type {HTMLElement} */
	let root;

	const multiple = $derived(items.length > 1);

	/** @param {number} step */
	function go(step) {
		index = (index + step + items.length) % items.length;
	}

	$effect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;
		const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		observer.observe(root);
		return () => observer.disconnect();
	});

	$effect(() => {
		if (!multiple || !interval || paused || !visible) return;
		index;
		const id = setTimeout(() => go(1), interval);
		return () => clearTimeout(id);
	});
</script>

<div
	class="gallery"
	role="region"
	aria-roledescription="carousel"
	aria-label={label}
	bind:this={root}
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	onfocusin={() => (paused = true)}
	onfocusout={() => (paused = false)}
>
	<div class="frame" style="aspect-ratio: {ratio}">
		{#each items as item, i (item.src)}
			<img
				src={item.src}
				alt={item.alt}
				class:active={i === index}
				aria-hidden={i !== index}
				loading="lazy"
			/>
		{/each}

		{#if multiple}
			<button type="button" class="nav prev" onclick={() => go(-1)} aria-label="Previous image">
				<Icon name="arrow-left" size={18} />
			</button>
			<button type="button" class="nav next" onclick={() => go(1)} aria-label="Next image">
				<Icon name="arrow-right" size={18} />
			</button>
		{/if}
	</div>

	{#if multiple}
		<div class="dots">
			{#each items as item, i (item.src)}
				<button
					type="button"
					class="dot"
					class:active={i === index}
					aria-label="Show image {i + 1} of {items.length}"
					aria-current={i === index}
					onclick={() => (index = i)}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.frame {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-lg);
		background: var(--forest);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-md);
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transform: scale(1.03);
		transition:
			opacity 0.7s var(--ease-out),
			transform 1.2s var(--ease-out);
	}

	img.active {
		opacity: 1;
		transform: none;
	}

	.nav {
		position: absolute;
		top: 50%;
		display: grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		margin-top: -1.3rem;
		border: 0;
		border-radius: 50%;
		background: oklch(99% 0.004 145 / 0.85);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		color: var(--text-main);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		opacity: 0;
		transition:
			opacity var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-spring);
	}

	.prev {
		left: 0.75rem;
	}

	.next {
		right: 0.75rem;
	}

	.gallery:hover .nav,
	.nav:focus-visible {
		opacity: 1;
	}

	.nav:active {
		transform: scale(0.94);
	}

	@media (hover: none) {
		.nav {
			opacity: 1;
		}
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.4rem;
		margin-top: 0.9rem;
	}

	.dot {
		width: 0.55rem;
		height: 0.55rem;
		padding: 0;
		border: 0;
		border-radius: var(--radius-pill);
		background: var(--line-strong);
		cursor: pointer;
		transition:
			width var(--dur) var(--ease-spring),
			background-color var(--dur) var(--ease-out);
	}

	.dot.active {
		width: 1.6rem;
		background: var(--primary);
	}
</style>
