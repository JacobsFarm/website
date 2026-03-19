<script lang="ts">
  import { browser } from '$app/environment';
  import { setLocale } from '$lib/paraglide/runtime';

  const STORAGE_KEY = 'lang_chosen';

  // Toon de modal alleen als we in de browser zijn én de gebruiker nog geen keuze heeft gemaakt
  let show = browser && !localStorage.getItem(STORAGE_KEY);

  // Detecteer de browsertaal als suggestie
  let suggestedLocale = 'en';
  if (browser) {
    suggestedLocale = navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
  }

  function choose(locale: string) {
    localStorage.setItem(STORAGE_KEY, locale);
    setLocale(locale);
    show = false;
  }
</script>

{#if show}
  <div class="backdrop" role="dialog" aria-modal="true" aria-label="Kies je taal">
    <div class="modal">
      <div class="globe">🌍</div>
      <h2>Kies je taal</h2>
      <p>Choose your preferred language</p>

      <div class="options">
        <button
          class="lang-btn"
          class:suggested={suggestedLocale === 'nl'}
          on:click={() => choose('nl')}
        >
          <span class="flag">🇳🇱</span>
          <span class="label">Nederlands</span>
          {#if suggestedLocale === 'nl'}
            <span class="hint">aanbevolen</span>
          {/if}
        </button>

        <button
          class="lang-btn"
          class:suggested={suggestedLocale === 'en'}
          on:click={() => choose('en')}
        >
          <span class="flag">🇬🇧</span>
          <span class="label">English</span>
          {#if suggestedLocale === 'en'}
            <span class="hint">suggested</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: white;
    border-radius: 20px;
    padding: 2.5rem 2rem;
    max-width: 360px;
    width: 90%;
    text-align: center;
    box-shadow: 0 24px 64px rgba(0,0,0,0.25);
  }

  .globe {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0 0 0.25rem;
    font-size: 1.4rem;
    color: #1a1a1a;
  }

  p {
    color: #777;
    margin: 0 0 1.75rem;
    font-size: 0.9rem;
  }

  .options {
    display: flex;
    gap: 1rem;
  }

  .lang-btn {
    flex: 1;
    padding: 1.1rem 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 14px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .lang-btn:hover {
    border-color: #386938;
    background: #f0f7f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56,105,56,0.15);
  }

  .lang-btn.suggested {
    border-color: #386938;
    background: #386938;
    color: white;
  }

  .lang-btn.suggested:hover {
    background: #2d5a2d;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56,105,56,0.3);
  }

  .flag {
    font-size: 1.75rem;
  }

  .label {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .hint {
    font-size: 0.65rem;
    font-weight: 500;
    opacity: 0.75;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>