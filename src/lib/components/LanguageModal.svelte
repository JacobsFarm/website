<script lang="ts">
  import { browser } from '$app/environment';
  import { setLocale } from '$lib/paraglide/runtime';

  // --- CONFIGURATIE ---
  // true  = Toon de popup ALTIJD bij het opstarten (negeer opslag).
  // false = Toon de popup alleen als er nog geen taal is opgeslagen.
  const FORCE_SHOW = false; 
  const STORAGE_KEY = 'lang_chosen';

  // Logica voor het tonen van de modal
  let show = browser && (FORCE_SHOW || !localStorage.getItem(STORAGE_KEY));
  
  // Standaard selectie gebaseerd op browser of default naar Engels
  let selectedLocale = 'en';
  
  if (browser) {
    const navLang = navigator.language.toLowerCase().split('-')[0];
    const supported = ['en', 'nl', 'es', 'fr', 'pt', 'de', 'it', 'pl', 'ro', 'dn'];
    if (supported.includes(navLang)) {
      selectedLocale = navLang;
    }
  }

  function choose() {
    if (browser) {
      localStorage.setItem(STORAGE_KEY, selectedLocale);
    }
    setLocale(selectedLocale as any);
    show = false;
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'dn', name: 'Dansk', flag: '🇩🇰' }
  ];
</script>

{#if show}
  <div class="backdrop" role="dialog" aria-modal="true" aria-label="Kies je taal">
    <div class="modal">
      <div class="globe">🌍</div>
      <h2>Kies je taal</h2>
      <p>Select your preferred language</p>

      <div class="options">
        <select bind:value={selectedLocale} class="modal-dropdown">
          {#each languages as lang}
            <option value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          {/each}
        </select>

        <button class="confirm-btn" on:click={choose}>
          Confirm / Bevestig
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* De styling blijft exact hetzelfde als in jouw voorbeeld */
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
    background: oklch(98% 0.005 145);
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
    color: oklch(22% 0.02 145);
  }

  p {
    color: oklch(42% 0.07 145);
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
    border: 2px solid oklch(85% 0.01 145);
    border-radius: 14px;
    background: white;
    font-size: 1rem;
    font-weight: 600;
    color: oklch(22% 0.02 145);
    cursor: pointer;
    outline: none;
  }

  .confirm-btn {
    padding: 1.1rem;
    border: none;
    border-radius: 14px;
    background: #386938; 
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .confirm-btn:hover {
    background: oklch(28% 0.05 145);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(56,105,56,0.3);
  }
</style>
