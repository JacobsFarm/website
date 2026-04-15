<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  $: currentLocale = getLocale();

  // De talen in de gevraagde volgorde
  const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'nl', label: 'NL', flag: '🇳🇱' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'pt', label: 'PT', flag: '🇵🇹' },
    { code: 'de', label: 'DE', flag: '🇩🇪' },
    { code: 'it', label: 'IT', flag: '🇮🇹' },
    { code: 'pl', label: 'PL', flag: '🇵🇱' },
    { code: 'ro', label: 'RO', flag: '🇷🇴' },
    { code: 'dn', label: 'DN', flag: '🇩🇰' }
  ];
</script>

<nav>
  <div class="logo">CowCatcherAI</div>

  <button
    class="hamburger"
    on:click={toggleMenu}
    aria-label="Toggle navigation"
    aria-expanded={isOpen}
  >
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
  </button>

  <div class="links" class:open={isOpen}>
    <a href="{base}/" on:click={closeMenu}>{m.nav_home()}</a>
    <a href="{base}/installation" on:click={closeMenu}>{m.nav_install()}</a>
    <a href="{base}/about-us" on:click={closeMenu}>{m.nav_about()}</a>

    <a href="{base}/projects/cowcatcher" class="mobile-only" on:click={closeMenu}>CowCatcher</a>
    <a href="{base}/projects/calvingcatcher" class="mobile-only" on:click={closeMenu}>CalvingCatcher</a>
    <a href="{base}/projects/ai-detector" class="mobile-only" on:click={closeMenu}>AI-Detector</a>

    <div class="lang-switcher">
      <select 
        value={currentLocale} 
        on:change={(e) => {
          // @ts-ignore
          setLocale(e.target.value);
          closeMenu();
        }}
        class="lang-dropdown"
        aria-label="Change language"
      >
        {#each languages as lang}
          <option value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        {/each}
      </select>
    </div>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #386938; /* Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative;
    z-index: 100;
    font-family: 'Roboto', sans-serif;
  }

  .logo {
    color: oklch(98% 0.005 145); /* Off White */
    font-family: 'Bebas Kai', 'Bebas Neue', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  .links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: oklch(98% 0.005 145);
    font-weight: bold;
    transition: all 0.2s ease;
  }

  a:hover {
    color: oklch(65% 0.16 75); /* Deep Amber */
  }

  .mobile-only {
    display: none;
  }

  .lang-switcher {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    padding-left: 1rem;
    border-left: 1px solid oklch(85% 0.01 145 / 0.4);
  }

  .lang-dropdown {
    background: transparent;
    border: 1px solid oklch(85% 0.01 145 / 0.4);
    color: oklch(98% 0.005 145);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    outline: none;
    transition: all 0.2s ease;
  }

  .lang-dropdown:hover {
    border-color: oklch(65% 0.16 75);
  }

  .lang-dropdown option {
    background: #386938;
    color: white;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .bar {
    width: 25px;
    height: 3px;
    background-color: oklch(98% 0.005 145);
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    .bar.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .bar.open:nth-child(2) { opacity: 0; }
    .bar.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    .links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #386938;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }

    .links.open {
      max-height: 600px;
    }

    .links a {
      padding: 1rem 2rem;
      width: 100%;
      border-top: 1px solid oklch(85% 0.01 145 / 0.2);
      box-sizing: border-box;
    }

    .mobile-only {
      display: block;
    }

    .lang-switcher {
      border-left: none;
      border-top: 1px solid oklch(85% 0.01 145 / 0.2);
      margin-left: 0;
      padding: 1.5rem 2rem;
      width: 100%;
      box-sizing: border-box;
    }

    .lang-dropdown {
      width: 100%;
      font-size: 1rem;
      padding: 0.75rem 1.2rem;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.1);
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>