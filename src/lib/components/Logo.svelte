<script>
	/** CowCatcher-beeldmerk (de koe met het oog) met de woordnaam ernaast. */
	import { logoMark as mark } from '$lib/utils/logoMark.js';

	let { size = 34, wordmark = true, tone = 'dark' } = $props();
</script>

<span class="logo logo--{tone}">
	<span class="mark" style="width: {size * 1.2}px; height: {size}px">{@html mark}</span>
	{#if wordmark}
		<span class="wordmark">CowCatcher<span class="ai">AI</span></span>
	{/if}
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		line-height: 1;
	}

	.mark {
		flex-shrink: 0;
		display: inline-flex;
	}

	.mark :global(.body) {
		fill: var(--primary);
	}

	.mark :global(.detail) {
		fill: #fff;
	}

	.logo--light .mark :global(.body) {
		fill: var(--on-dark);
	}

	.logo--light .mark :global(.detail) {
		fill: var(--forest);
	}

	.wordmark {
		font-family: var(--font-heading);
		font-size: 1.55rem;
		letter-spacing: 0.03em;
		padding-top: 0.15em;
		color: var(--text-main);
	}

	.ai {
		color: var(--primary);
		margin-left: 0.18em;
	}

	.logo--light .wordmark {
		color: var(--on-dark);
	}

	.logo--light .ai {
		color: var(--accent-amber);
	}
</style>
