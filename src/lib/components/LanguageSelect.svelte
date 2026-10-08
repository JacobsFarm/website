<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { languages } from '$lib/config/languages.js';
	import Icon from './Icon.svelte';

	/**
	 * Taalkeuze als compacte pil. Het native <select> ligt er onzichtbaar
	 * overheen, zodat toetsenbord, schermlezer en mobiele kiezer gewoon werken.
	 */
	let { variant = 'compact', tone = 'light' } = $props();

	// setLocale herlaadt de pagina, dus dit hoeft niet reactief te zijn.
	const currentLocale = getLocale();
	const current = languages.find((lang) => lang.code === currentLocale) ?? languages[0];

	function handleChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;
		try {
			localStorage.setItem('lang_chosen', target.value);
		} catch {
			// Opslag geblokkeerd: de taal wordt dan alleen voor deze sessie gezet.
		}
		setLocale(target.value as Parameters<typeof setLocale>[0]);
	}
</script>

<label class="lang lang--{variant} lang--{tone}">
	<span class="visually-hidden">{m.nav_language()}</span>
	<Icon name="globe" size={17} />
	<span class="current">{variant === 'full' ? current.name : current.label}</span>
	<Icon name="chevron-down" size={14} class="chev" />
	<select value={currentLocale} onchange={handleChange} aria-label={m.nav_language()}>
		{#each languages as lang (lang.code)}
			<option value={lang.code}>{lang.flag} {lang.name}</option>
		{/each}
	</select>
</label>

<style>
	.lang {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 2.5rem;
		padding: 0 0.85rem;
		border-radius: var(--radius-pill);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition:
			background-color var(--dur) var(--ease-spring),
			box-shadow var(--dur) var(--ease-spring);
	}

	.lang--light {
		color: var(--text-main);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.lang--light:hover {
		background: var(--card-bg);
		box-shadow: inset 0 0 0 1px var(--line-strong);
	}

	.lang--dark {
		color: var(--on-dark);
		box-shadow: inset 0 0 0 1px var(--line-dark);
	}

	.lang--dark:hover {
		background: oklch(100% 0 0 / 0.06);
	}

	.lang--full {
		min-height: 3rem;
		padding: 0 1.1rem;
		font-size: 1rem;
		letter-spacing: 0;
	}

	.lang:focus-within {
		outline: 2px solid var(--accent-amber);
		outline-offset: 3px;
	}

	.lang :global(.chev) {
		opacity: 0.55;
	}

	select {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		font-size: 1rem;
	}
</style>
