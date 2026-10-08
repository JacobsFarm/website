<script>
	import { base } from '$app/paths';
	import Icon from './Icon.svelte';

	/**
	 * Vorige/volgende-navigatie onderaan een pagina, zodat er nooit een
	 * doodlopend eind is.
	 *
	 * @property {{href: string, label: string, hint?: string}} [prev]
	 * @property {{href: string, label: string, hint?: string}} [next]
	 */
	let { prev = null, next = null } = $props();
</script>

<nav class="pager">
	{#if prev}
		<a href="{base}{prev.href}" class="pager-link prev">
			<span class="arrow"><Icon name="arrow-left" size={18} /></span>
			<span class="text">
				{#if prev.hint}<small>{prev.hint}</small>{/if}
				<span>{prev.label}</span>
			</span>
		</a>
	{:else}
		<span></span>
	{/if}

	{#if next}
		<a href="{base}{next.href}" class="pager-link next">
			<span class="text">
				{#if next.hint}<small>{next.hint}</small>{/if}
				<span>{next.label}</span>
			</span>
			<span class="arrow"><Icon name="arrow-right" size={18} /></span>
		</a>
	{/if}
</nav>

<style>
	.pager {
		display: grid;
		gap: 0.75rem;
		margin-top: clamp(3rem, 6vw, 4.5rem);
	}

	.pager-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 1.25rem;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		color: var(--text-main);
		text-decoration: none;
		transition:
			box-shadow var(--dur) var(--ease-spring),
			transform var(--dur) var(--ease-spring);
	}

	.pager-link:hover {
		box-shadow:
			0 0 0 1px var(--primary),
			var(--shadow-md);
	}

	.pager-link:active {
		transform: scale(0.99);
	}

	.next {
		justify-content: space-between;
		text-align: right;
		background: var(--primary);
		color: #fff;
		box-shadow: var(--shadow-sm);
	}

	.next:hover {
		background: var(--primary-hover);
		box-shadow: var(--shadow-hover);
	}

	.text {
		display: grid;
		gap: 0.1rem;
		flex: 1;
		font-weight: 600;
		line-height: 1.3;
	}

	.text small {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.65;
	}

	.arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--primary-soft);
		color: var(--primary);
		transition: transform var(--dur) var(--ease-spring);
	}

	.next .arrow {
		background: oklch(100% 0 0 / 0.16);
		color: #fff;
	}

	.prev:hover .arrow {
		transform: translateX(-3px);
	}

	.next:hover .arrow {
		transform: translateX(3px);
	}

	@media (min-width: 720px) {
		.pager {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
