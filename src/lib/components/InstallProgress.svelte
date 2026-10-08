<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { stripNumber } from '$lib/utils/text.js';
	import Icon from './Icon.svelte';

	/**
	 * De drie stappen van de installatie als voortgangsbalk. Laat zien waar de
	 * bezoeker is, wat al achter de rug is en wat nog komt.
	 *
	 * @property {1|2|3} current
	 */
	let { current = 1 } = $props();

	const steps = [
		{ href: '/installation/hardware', icon: 'wrench', title: m.install_card_hardware_title },
		{ href: '/installation/download', icon: 'download', title: m.install_card_software_title },
		{ href: '/installation/options', icon: 'sliders', title: m.install_card_options_title }
	];
</script>

<nav class="progress" aria-label={m.install_title()}>
	<ol>
		{#each steps as step, i (step.href)}
			{@const n = i + 1}
			<li class:done={n < current} class:current={n === current}>
				<a href="{base}{step.href}" aria-current={n === current ? 'step' : undefined}>
					<span class="dot">
						{#if n < current}
							<Icon name="check" size={15} stroke={2.4} />
						{:else}
							{n}
						{/if}
					</span>
					<span class="text">
						<small>{m.step_label()} {n}</small>
						<span>{stripNumber(step.title())}</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.progress {
		padding: 0.4rem;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
	}

	ol {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.3rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		height: 100%;
		padding: 0.7rem 0.85rem;
		border-radius: calc(var(--radius-lg) - 0.4rem);
		color: var(--text-muted);
		text-decoration: none;
		transition:
			background-color var(--dur) var(--ease-spring),
			color var(--dur) var(--ease-spring);
	}

	a:hover {
		background: var(--bg-sunken);
		color: var(--text-main);
	}

	.current a {
		background: var(--primary-soft);
		color: var(--text-main);
	}

	.dot {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: var(--bg-sunken);
		box-shadow: inset 0 0 0 1px var(--line-strong);
		font-family: var(--font-heading);
		font-size: 1.15rem;
		line-height: 1;
		padding-top: 0.1rem;
	}

	.current .dot {
		background: var(--primary);
		box-shadow: none;
		color: #fff;
	}

	.done .dot {
		background: var(--accent-amber);
		box-shadow: none;
		color: var(--text-main);
		padding-top: 0;
	}

	.text {
		display: grid;
		line-height: 1.25;
		min-width: 0;
		font-weight: 500;
		font-size: 0.95rem;
	}

	.text small {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.7;
	}

	@media (max-width: 640px) {
		a {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
			padding: 0.65rem;
		}

		.text > span {
			font-size: 0.82rem;
		}
	}
</style>
