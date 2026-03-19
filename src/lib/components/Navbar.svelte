<<<<<<< HEAD
<script>
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths'; // Cruciaal voor GitHub Pages
  
  // Houdt bij of het mobiele menu open of gesloten is [cite: 11]
=======
<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';

>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

<<<<<<< HEAD
  // Sluit het menu wanneer er op een link wordt geklikt (mobiel) [cite: 12]
  function closeMenu() {
    isOpen = false;
  }
=======
  function closeMenu() {
    isOpen = false;
  }

  $: currentLocale = getLocale();
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
</script>

<nav>
  <div class="logo">CowCatcherAI</div>
<<<<<<< HEAD
  
  <button 
    class="hamburger" 
    on:click={toggleMenu} 
    aria-label="Toggle navigation" 
=======

  <button
    class="hamburger"
    on:click={toggleMenu}
    aria-label="Toggle navigation"
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
    aria-expanded={isOpen}
  >
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
  </button>

  <div class="links" class:open={isOpen}>
    <a href="{base}/" on:click={closeMenu}>{m.nav_home()}</a>
    <a href="{base}/projects/cowcatcher" on:click={closeMenu}>CowCatcher</a>
    <a href="{base}/installation" on:click={closeMenu}>{m.nav_install()}</a>
    <a href="{base}/about-us" on:click={closeMenu}>{m.nav_about()}</a>
<<<<<<< HEAD
=======

    <div class="lang-switcher">
      <button
        class:active={currentLocale === 'nl'}
        on:click={() => { setLocale('nl'); closeMenu(); }}
        aria-label="Schakel naar Nederlands"
      >
        🇳🇱 NL
      </button>
      <button
        class:active={currentLocale === 'en'}
        on:click={() => { setLocale('en'); closeMenu(); }}
        aria-label="Switch to English"
      >
        🇬🇧 EN
      </button>
    </div>
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
  </div>
</nav>

<style>
<<<<<<< HEAD
  /* Base Desktop Styles [cite: 14] */
  nav { 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem; 
    background: #386938; /* RAL 6001 Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative; /* Nodig voor absolute positionering mobiel menu [cite: 15] */
=======
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #386938;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative;
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
    z-index: 100;
  }

  .logo {
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  .links {
    display: flex;
    gap: 1.5rem;
<<<<<<< HEAD
  }

  a { 
    text-decoration: none; 
    color: rgba(255,255,255,0.9); 
=======
    align-items: center;
  }

  a {
    text-decoration: none;
    color: rgba(255,255,255,0.9);
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
    font-weight: bold;
    transition: all 0.2s ease;
  }

<<<<<<< HEAD
  a:hover { 
    color: #CCFF00; /* Electric Lime Accent [cite: 20] */
  }

  /* Hamburger Button Styles [cite: 21, 22] */
=======
  a:hover {
    color: #CCFF00;
  }

  /* Taalwisselaar */
  .lang-switcher {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    margin-left: 0.5rem;
    padding-left: 1rem;
    border-left: 1px solid rgba(255,255,255,0.3);
  }

  .lang-switcher button {
    background: transparent;
    border: 1px solid transparent;
    color: rgba(255,255,255,0.7);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    transition: all 0.2s ease;
  }

  .lang-switcher button:hover {
    color: #CCFF00;
    border-color: rgba(255,255,255,0.3);
  }

  .lang-switcher button.active {
    color: #CCFF00;
    border-color: #CCFF00;
    background: rgba(204,255,0,0.1);
  }

  /* Hamburger */
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
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
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

<<<<<<< HEAD
  /* Mobile Responsive Styles [cite: 24] */
  @media (max-width: 768px) {
    .hamburger {
      display: flex; 
    }

    /* Transformeer hamburger naar 'X' [cite: 25, 26, 27] */
=======
  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
    .bar.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    .bar.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    .links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #386938;
      flex-direction: column;
<<<<<<< HEAD
      gap: 0;
      max-height: 0; 
=======
      align-items: flex-start;
      gap: 0;
      max-height: 0;
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }

    .links.open {
<<<<<<< HEAD
      max-height: 300px; 
=======
      max-height: 400px;
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
    }

    .links a {
      padding: 1rem 2rem;
<<<<<<< HEAD
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
</style>
=======
      width: 100%;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .lang-switcher {
      border-left: none;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-left: 0;
      padding: 0.75rem 2rem;
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
