<script>
	import { links } from '$lib/config/links.js';
	import { stripEmoji } from '$lib/utils/text.js';
	import Icon from './Icon.svelte';

	/** Opvallende downloadkaart naast de kop van een installatiehandleiding. */
	let { heading, desc, button, href = links.detectorReleases } = $props();
</script>

<div class="download bezel">
	<div class="bezel__inner inner">
		<span class="icon"><Icon name="download" size={24} /></span>
		<h2>{stripEmoji(heading)}</h2>
		<p>{desc}</p>
		<a {href} target="_blank" rel="noopener noreferrer" class="btn btn--solid btn--block">
			<Icon name="github" size={18} />
			{button}
			<span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
		</a>
		<code class="repo">github.com/ESchouten/ai-detector</code>
	</div>
</div>

<style>
	.inner {
		display: grid;
		gap: 0.85rem;
		padding: clamp(1.5rem, 3vw, 2rem);
	}

	.icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius);
		background: var(--primary-soft);
		color: var(--primary);
	}

	h2 {
		font-family: var(--font-body);
		font-size: 1.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		line-height: 1.3;
		text-transform: none;
	}

	p {
		color: var(--text-muted);
		font-size: 0.98rem;
	}

	.btn {
		margin-top: 0.4rem;
	}

	.repo {
		justify-self: center;
		font-size: 0.75rem;
		color: var(--text-muted);
	}
</style>
