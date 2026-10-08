<script>
	import ZoomableImage from '$lib/components/ZoomableImage.svelte';

	/**
	 * Eén stap uit de installatiehandleiding: genummerde badge, titel, inhoud
	 * (children) en optioneel een schermafbeelding met bijschrift.
	 * Krijgt `id="step-<nummer>"`, zodat de inhoudsopgave ernaar kan linken.
	 */
	let { number, title, image = null, imageAlt = '', caption = '', children } = $props();
</script>

<section class="step" id="step-{number}">
	<div class="step-head">
		<span class="step-num">{number}</span>
		<h3>{title}</h3>
	</div>

	<div class="step-body">
		{@render children()}

		{#if image}
			<figure class="step-figure">
				<ZoomableImage src={image} alt={imageAlt} />
				{#if caption}
					<figcaption>{caption}</figcaption>
				{/if}
			</figure>
		{/if}
	</div>
</section>

<style>
	.step {
		position: relative;
		margin: 0 0 1.25rem !important;
		padding: clamp(1.25rem, 3vw, 2rem);
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		scroll-margin-top: var(--nav-offset);
	}

	.step-head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.25rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid var(--line);
	}

	.step-num {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2.9rem;
		height: 2.9rem;
		padding-top: 0.15rem;
		border-radius: var(--radius-sm);
		background: var(--primary);
		color: #fff;
		font-family: var(--font-heading);
		font-size: 1.6rem;
		line-height: 1;
		box-shadow: inset 0 -3px 0 oklch(0% 0 0 / 0.15);
	}

	/* De h3 uit .prose heeft een ruime bovenmarge; naast de badge niet nodig. */
	.step-head h3 {
		margin: 0;
		font-size: clamp(1.15rem, 2vw, 1.4rem);
	}

	/* Vaste ritmiek tussen de blokken in een stap; een kopje hoort bij wat erna komt. */
	.step-body > :global(* + *) {
		margin-top: 1rem;
	}

	.step-body > :global(h4) {
		margin-top: 1.75rem;
	}

	.step-body > :global(h4 + *) {
		margin-top: 0.5rem;
	}

	.step-body > :global(*:first-child) {
		margin-top: 0;
	}

	.step-body > :global(*:last-child) {
		margin-bottom: 0;
	}

	.step-figure {
		margin: 1.5rem 0 0;
	}

	.step-figure figcaption {
		margin-top: 0.65rem;
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
