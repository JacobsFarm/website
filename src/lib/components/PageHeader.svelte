<script>
	import { base } from '$app/paths';
	import Icon from './Icon.svelte';

	/**
	 * Kop van een subpagina: kruimelpad, eyebrow, titel, intro en optioneel
	 * knoppen (`actions`) of een beeld rechts (`aside`).
	 *
	 * @property {Array<{href: string, label: string}>} crumbs - Links vóór de huidige pagina.
	 */
	/** @type {{ eyebrow?: string, title: string, lead?: string, crumbs?: Array<{ href: string, label: string }>, actions?: import('svelte').Snippet, aside?: import('svelte').Snippet, children?: import('svelte').Snippet }} */
	let { eyebrow = '', title, lead = '', crumbs = [], actions, aside, children } = $props();
</script>

<header class="page-header" class:has-aside={aside}>
	<div class="bg" aria-hidden="true"></div>
	<div class="container inner">
		<div class="copy">
			{#if crumbs.length}
				<nav class="crumbs" aria-label="Breadcrumb">
					<a href="{base}/" aria-label="Home"><Icon name="home" size={15} /></a>
					{#each crumbs as crumb (crumb.href)}
						<span class="sep" aria-hidden="true">/</span>
						<a href="{base}{crumb.href}">{crumb.label}</a>
					{/each}
				</nav>
			{/if}

			{#if eyebrow}
				<span class="eyebrow">{eyebrow}</span>
			{/if}

			<h1 class="title">{title}</h1>

			{#if lead}
				<p class="lead">{lead}</p>
			{/if}

			{@render children?.()}

			{#if actions}
				<div class="btn-row actions">{@render actions()}</div>
			{/if}
		</div>

		{#if aside}
			<div class="aside">{@render aside()}</div>
		{/if}
	</div>
</header>

<style>
	.page-header {
		position: relative;
		padding-top: calc(var(--nav-offset) + clamp(1.5rem, 4vw, 3rem));
		padding-bottom: clamp(3rem, 6vw, 4.5rem);
		overflow: hidden;
	}

	.bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(42rem 26rem at 8% 0%, oklch(92% 0.05 145 / 0.85), transparent 70%),
			radial-gradient(32rem 22rem at 95% 30%, oklch(94% 0.05 80 / 0.6), transparent 70%),
			linear-gradient(oklch(22% 0.02 145 / 0.04) 1px, transparent 1px) 0 0 / 100% 56px,
			linear-gradient(90deg, oklch(22% 0.02 145 / 0.04) 1px, transparent 1px) 0 0 / 56px 100%;
		-webkit-mask-image: linear-gradient(180deg, #000 50%, transparent);
		mask-image: linear-gradient(180deg, #000 50%, transparent);
	}

	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2.5rem;
		align-items: center;
	}

	.copy {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.25rem;
		justify-items: start;
		animation: rise 0.9s var(--ease-out) both;
	}

	.crumbs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.crumbs a {
		display: inline-flex;
		align-items: center;
		color: inherit;
		text-decoration: none;
		border-radius: 4px;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.crumbs a:hover {
		color: var(--primary);
	}

	.sep {
		opacity: 0.45;
	}

	.title {
		font-size: clamp(3rem, 7.5vw, 5.75rem);
		line-height: 0.9;
		max-width: 16ch;
	}

	.actions {
		margin-top: 0.5rem;
	}

	.aside {
		animation: rise 1s var(--ease-out) 0.12s both;
	}

	@media (min-width: 960px) {
		.has-aside .inner {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
			gap: 4rem;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(20px);
			filter: blur(6px);
		}
	}
</style>
