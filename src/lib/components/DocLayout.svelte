<script>
	import * as m from '$lib/paraglide/messages.js';

	/**
	 * Twee kolommen voor handleidingen: een inhoudsopgave die meeschuift
	 * (desktop) en de stappen zelf. De link van de stap die in beeld is, licht op.
	 *
	 * @property {Array<{id: string, label: string}>} toc
	 */
	/** @type {{ toc?: Array<{ id: string, label: string }>, children: import('svelte').Snippet }} */
	let { toc = [], children } = $props();

	let activeId = $state('');

	$effect(() => {
		const targets = toc
			.map((item) => document.getElementById(item.id))
			.filter((el) => el !== null);
		if (!targets.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);

		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	});
</script>

<div class="doc container">
	{#if toc.length}
		<aside class="toc">
			<nav aria-labelledby="toc-title">
				<p id="toc-title" class="toc-title">{m.toc_title()}</p>
				<ol>
					{#each toc as item, i (item.id)}
						<li>
							<a href="#{item.id}" class:active={activeId === item.id}>
								<span class="n">{String(i + 1).padStart(2, '0')}</span>
								<span>{item.label}</span>
							</a>
						</li>
					{/each}
				</ol>
			</nav>
		</aside>
	{/if}

	<article class="doc-body prose">
		{@render children()}
	</article>
</div>

<style>
	.doc {
		display: grid;
		gap: 2.5rem;
		padding-bottom: var(--section-y);
	}

	.toc {
		display: none;
	}

	.doc-body {
		min-width: 0;
	}

	@media (min-width: 1080px) {
		.doc {
			grid-template-columns: 16.5rem minmax(0, 1fr);
			gap: 4rem;
			align-items: start;
		}

		.toc {
			display: block;
			position: sticky;
			top: var(--nav-offset);
			max-height: calc(100dvh - var(--nav-offset) - 2rem);
			overflow-y: auto;
		}

		.doc-body {
			max-width: 50rem;
		}
	}

	.toc-title {
		margin-bottom: 0.75rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.toc ol {
		display: grid;
		gap: 0.15rem;
		margin: 0;
		padding: 0;
		list-style: none;
		border-left: 1px solid var(--line);
	}

	.toc a {
		display: grid;
		grid-template-columns: 1.6rem minmax(0, 1fr);
		gap: 0.4rem;
		margin-left: -1px;
		padding: 0.45rem 0.6rem 0.45rem 0.9rem;
		border-left: 2px solid transparent;
		color: var(--text-muted);
		font-size: 0.9rem;
		line-height: 1.35;
		text-decoration: none;
		transition:
			color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.toc a:hover {
		color: var(--text-main);
	}

	.toc a.active {
		color: var(--primary);
		border-left-color: var(--primary);
		font-weight: 500;
	}

	.n {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		opacity: 0.6;
		padding-top: 0.1rem;
	}
</style>
