<script lang="ts">
  import { browser } from '$app/environment';
  import { setLocale } from '$lib/paraglide/runtime';
  import { languages, languageCodes } from '$lib/config/languages.js';

  // --- CONFIGURATIE ---
  // true  = Toon de popup ALTIJD bij het opstarten (negeer opslag).
  // false = Toon de popup alleen als er nog geen taal is opgeslagen.
  const FORCE_SHOW = false;
  const STORAGE_KEY = 'lang_chosen';

  let show = $state(browser && (FORCE_SHOW || !localStorage.getItem(STORAGE_KEY)));

  // Standaard selectie gebaseerd op browsertaal, anders Engels.
  let selectedLocale = $state('en');

  if (browser) {
    const navLang = navigator.language.toLowerCase().split('-')[0];
    if (languageCodes.includes(navLang)) {
      selectedLocale = navLang;
    }
  }

  function choose() {
    if (browser) {
      localStorage.setItem(STORAGE_KEY, selectedLocale);
    }
    setLocale(selectedLocale as Parameters<typeof setLocale>[0]);
    show = false;
  }
</script>

{#if show}
  <div class="backdrop" role="dialog" aria-modal="true" aria-label="Kies je taal">
    <div class="modal">
      <div class="globe">🌍</div>
      <h2>Choose your language</h2>
      <p>Select your preferred language</p>

      <div class="options">
        <select bind:value={selectedLocale} class="modal-dropdown">
          {#each languages as lang}
            <option value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          {/each}
        </select>

        <button class="confirm-btn" onclick={choose} aria-label="Confirm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: oklch(22% 0.02 145 / 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: var(--bg-color);
    border-radius: var(--radius-lg);
    padding: 2.5rem 2rem;
    max-width: 360px;
    width: 90%;
    text-align: center;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
  }

  .globe {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0 0 0.25rem;
    font-size: 1.4rem;
    color: var(--text-main);
  }

  p {
    color: var(--text-muted);
    margin: 0 0 1.75rem;
    font-size: 0.9rem;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .modal-dropdown {
    width: 100%;
    padding: 1.1rem 0.75rem;
    border: 2px solid var(--soft-gray);
    border-radius: 14px;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-main);
    cursor: pointer;
    outline: none;
  }

  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.1rem;
    border: none;
    border-radius: 14px;
    background: var(--primary);
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .confirm-btn:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56, 105, 56, 0.3);
  }
</style>
