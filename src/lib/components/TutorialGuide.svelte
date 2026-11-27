<script>
	import { base } from '$app/paths';
	import InstallStep from './InstallStep.svelte';
	import ZoomableImage from './ZoomableImage.svelte';

	/**
	 * Renders a tutorial guide (see $lib/content/tutorials.js) as numbered steps
	 * in the same style as the installation guides. Each step gets
	 * `id="step-N"`, so DocLayout's table of contents can link to it.
	 *
	 * @type {{ guide: import('$lib/content/tutorials.js').Guide, slug: string }}
	 */
	let { guide, slug } = $props();

	const dir = $derived(`${base}/tutorials/${slug}/img`);

	/** Links in the guides are written as `{base}/…`. @param {string | undefined} text */
	const html = (text) => (text ?? '').replaceAll('{base}', base);
</script>

{#each guide.steps as step, i (i)}
	<InstallStep number={i + 1} title={step.title}>
		{#each step.blocks as block, j (j)}
			{#if block.type === 'p'}
				<p>{@html html(block.html)}</p>
			{:else if block.type === 'ul'}
				<ul class="check-list">
					{#each block.items ?? [] as item}
						<li>{@html html(item)}</li>
					{/each}
				</ul>
			{:else if block.type === 'table'}
				<div class="table-container">
					<table>
						<thead>
							<tr>
								{#each block.head ?? [] as cell}
									<th>{@html html(cell)}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each block.rows ?? [] as row}
								<tr>
									{#each row as cell}
										<td>{@html html(cell)}</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else if block.type === 'figure'}
				<figure class="guide-figure" class:small={block.small}>
					<ZoomableImage src="{dir}/{block.src}" alt={block.alt} />
					{#if block.caption}
						<figcaption>{@html html(block.caption)}</figcaption>
					{/if}
				</figure>
			{:else if block.type === 'code'}
				<pre><code>{block.code}</code></pre>
			{:else if block.type === 'tip'}
				<p class="tip-box">{@html html(block.html)}</p>
			{:else if block.type === 'note'}
				<p class="note">{@html html(block.html)}</p>
			{:else if block.type === 'warning'}
				<p class="warn-box">{@html html(block.html)}</p>
			{/if}
		{/each}
	</InstallStep>
{/each}

<style>
	.guide-figure {
		margin: 1.5rem 0 0;
	}

	.guide-figure.small {
		max-width: 26rem;
	}

	.guide-figure figcaption {
		margin-top: 0.65rem;
		font-size: 0.88rem;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
