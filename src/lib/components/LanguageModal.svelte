<script lang="ts">
	import { browser } from '$app/environment';
	import { setLocale } from '$lib/paraglide/runtime';
	import { languages, languageCodes } from '$lib/config/languages.js';
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';

	// --- CONFIGURATIE ---
	// true  = Toon de popup ALTIJD bij het opstarten (negeer opslag).
	// false = Toon de popup alleen als er nog geen taal is opgeslagen.
	const FORCE_SHOW = false;
	const STORAGE_KEY = 'lang_chosen';

	function hasChosen() {
		try {
			return Boolean(localStorage.getItem(STORAGE_KEY));
		} catch {
			return true;
		}
	}

	let show = $state(browser && (FORCE_SHOW || !hasChosen()));

	// Standaard selectie gebaseerd op browsertaal, anders Engels.
	let selectedLocale = $state('en');

	if (browser) {
		const navLang = navigator.language.toLowerCase().split('-')[0];
		if (languageCodes.includes(navLang)) {
			selectedLocale = navLang;
		}
	}

	function choose(code: string) {
		selectedLocale = code;
		try {
			localStorage.setItem(STORAGE_KEY, code);
		} catch {
			// Opslag geblokkeerd: dan alleen voor deze sessie.
		}
		show = false;
		setLocale(code as Parameters<typeof setLocale>[0]);
	}
</script>

{#if show}
	<div class="backdrop">
		<div class="modal" role="dialog" aria-modal="true" aria-labelledby="lang-title">
			<div class="head">
				<Logo size={40} wordmark={false} />
				<div>
					<h2 id="lang-title">Choose your language</h2>
					<p>Select your preferred language</p>
				</div>
			</div>

			<ul class="grid">
				{#each languages as lang (lang.code)}
					<li>
						<button
							type="button"
							class="option"
							class:suggested={lang.code === selectedLocale}
							onclick={() => choose(lang.code)}
							lang={lang.code}
						>
							<span class="flag" aria-hidden="true">{lang.flag}</span>
							<span class="name">{lang.name}</span>
							{#if lang.code === selectedLocale}
								<span class="tick"><Icon name="check" size={16} stroke={2.2} /></span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
		display: grid;
		place-items: center;
		padding: 1rem;
		background: oklch(22% 0.03 150 / 0.55);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		animation: fade 0.4s var(--ease-out);
	}

	.modal {
		width: min(100%, 30rem);
		max-height: calc(100dvh - 2rem);
		overflow-y: auto;
		padding: 1.75rem;
		border-radius: var(--radius-xl);
		background: var(--bg-color);
		box-shadow:
			inset 0 0 0 1px oklch(100% 0 0 / 0.7),
			var(--shadow-lg);
		animation: rise 0.6s var(--ease-spring);
	}

	.head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	h2 {
		font-size: 2rem;
		color: var(--text-main);
	}

	p {
		color: var(--text-muted);
		font-size: 0.92rem;
	}

	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem;
	}

	.option {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.8rem 0.9rem;
		border: 0;
		border-radius: var(--radius);
		background: var(--card-bg);
		box-shadow: inset 0 0 0 1px var(--line);
		text-align: left;
		font-weight: 500;
		cursor: pointer;
		transition:
			box-shadow var(--dur) var(--ease-spring),
			transform var(--dur) var(--ease-spring);
	}

	.option:hover {
		box-shadow:
			inset 0 0 0 1px var(--primary),
			var(--shadow-sm);
	}

	.option:active {
		transform: scale(0.98);
	}

	.option.suggested {
		box-shadow: inset 0 0 0 2px var(--primary);
		background: var(--primary-soft);
	}

	.flag {
		font-size: 1.25rem;
		line-height: 1;
	}

	.name {
		flex: 1;
	}

	.tick {
		color: var(--primary);
		display: inline-flex;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.98);
		}
	}
</style>
