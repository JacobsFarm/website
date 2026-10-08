<script>
	/** Beeldmerk (het oog uit het CowCatcher-logo) met de woordnaam ernaast. */
	let { size = 34, wordmark = true, tone = 'dark' } = $props();
</script>

<span class="logo logo--{tone}">
	<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" class="mark">
		<rect width="64" height="64" rx="16" class="mark-bg" />
		<path
			d="M10 33c6.5-8.5 13.7-12.7 22-12.7S47.5 24.5 54 33c-6.5 8.5-13.7 12.7-22 12.7S16.5 41.5 10 33z"
			fill="none"
			stroke="#fff"
			stroke-width="4"
			stroke-linejoin="round"
		/>
		<circle cx="32" cy="33" r="7.2" fill="#fff" />
		<circle cx="32" cy="33" r="3" class="mark-pupil" />
		<circle cx="49" cy="15" r="4.2" class="mark-dot" />
	</svg>
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
		border-radius: 10px;
	}

	.mark-bg,
	.mark-pupil {
		fill: var(--primary);
	}

	.mark-dot {
		fill: var(--accent-amber);
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
