<script>
	import Icon from './Icon.svelte';

	/**
	 * Afbeelding die bij een klik vergroot wordt getoond in een lightbox
	 * over de rest van de pagina. Sluit via klik, Escape of de kruisknop.
	 */
	let { src, alt = '', class: className = '' } = $props();

	let open = $state(false);
	let closeButton = $state();

	function show() {
		open = true;
	}

	function hide() {
		open = false;
	}

	/** @param {KeyboardEvent} event */
    function handleKeydown(event) {
		if (open && event.key === 'Escape') hide();
	}

	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
		if (open) closeButton?.focus();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<button type="button" class="zoom-trigger {className}" onclick={show} aria-label="Enlarge image: {alt}">
	<img {src} {alt} loading="lazy" />
	<span class="zoom-hint" aria-hidden="true"><Icon name="eye" size={16} /></span>
</button>

{#if open}
	<div class="lightbox" role="dialog" aria-modal="true" aria-label={alt}>
		<button type="button" class="lightbox-close" onclick={hide} aria-label="Close" bind:this={closeButton}>
			<Icon name="close" size={20} />
		</button>
		<button type="button" class="lightbox-panel" onclick={hide} tabindex="-1" aria-hidden="true">
			<img {src} {alt} class="lightbox-img" />
		</button>
	</div>
{/if}

<style>
	.zoom-trigger {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		border-radius: var(--radius);
		background: var(--bg-sunken);
		box-shadow: 0 0 0 1px var(--line);
		overflow: hidden;
		cursor: zoom-in;
	}

	.zoom-trigger img {
		width: 100%;
		height: auto;
		display: block;
		transition: transform 0.8s var(--ease-out);
	}

	.zoom-trigger:hover img {
		transform: scale(1.015);
	}

	.zoom-hint {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		background: oklch(22% 0.03 150 / 0.75);
		color: #fff;
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity var(--dur) var(--ease-out),
			transform var(--dur) var(--ease-spring);
	}

	.zoom-trigger:hover .zoom-hint,
	.zoom-trigger:focus-visible .zoom-hint {
		opacity: 1;
		transform: none;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		display: grid;
		place-items: center;
		padding: 4rem 1.25rem 2rem;
		background: oklch(15% 0.03 150 / 0.88);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		animation: fade 0.3s var(--ease-out);
	}

	.lightbox-panel {
		display: flex;
		max-width: 100%;
		max-height: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-out;
	}

	.lightbox-img {
		max-width: 100%;
		max-height: calc(100dvh - 6rem);
		width: auto;
		border-radius: var(--radius);
		box-shadow: 0 24px 64px oklch(0% 0 0 / 0.45);
		animation: zoom 0.45s var(--ease-spring);
	}

	.lightbox-close {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: grid;
		place-items: center;
		width: 2.9rem;
		height: 2.9rem;
		border: 0;
		border-radius: 50%;
		background: oklch(100% 0 0 / 0.14);
		color: #fff;
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.lightbox-close:hover {
		background: oklch(100% 0 0 / 0.28);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.96);
			opacity: 0;
		}
	}
</style>
