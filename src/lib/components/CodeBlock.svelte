<script>
	import * as m from '$lib/paraglide/messages.js';
	import Icon from './Icon.svelte';

	/**
	 * A code sample with a copy button and an optional label (such as a file
	 * name or "Example").
	 *
	 * @type {{ code: string, label?: string }}
	 */
	let { code, label = '' } = $props();

	let copied = $state(false);
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let timer;

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1800);
		} catch {
			copied = false;
		}
	}
</script>

<div class="code-block">
	<div class="bar">
		<span class="label">{label}</span>
		<button type="button" class="copy" onclick={copy} aria-live="polite">
			<Icon name={copied ? 'check' : 'code'} size={14} />
			{copied ? m.config_copied() : m.config_copy()}
		</button>
	</div>
	<pre><code>{code}</code></pre>
</div>

<style>
	.code-block {
		min-width: 0;
		margin: 1rem 0 0;
		border-radius: var(--radius);
		background: var(--forest);
		overflow: hidden;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.45rem 0.5rem 0.45rem 1rem;
		border-bottom: 1px solid var(--line-dark);
	}

	.label {
		color: var(--on-dark-muted);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
	}

	.copy {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.7rem;
		border: 0;
		border-radius: var(--radius-pill);
		background: oklch(100% 0 0 / 0.08);
		color: var(--on-dark);
		font: inherit;
		font-size: 0.78rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.copy:hover {
		background: oklch(100% 0 0 / 0.16);
	}

	pre {
		margin: 0 !important;
		padding: 1rem 1.1rem !important;
		border-radius: 0 !important;
		background: transparent !important;
		overflow-x: auto;
	}

	code {
		color: var(--on-dark);
		font-family: var(--font-mono);
		font-size: 0.84rem;
		line-height: 1.6;
		white-space: pre;
	}
</style>
