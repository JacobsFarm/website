<script>
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths'; // Cruciaal voor GitHub Pages
  
  // Houdt bij of het mobiele menu open of gesloten is [cite: 11]
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  // Sluit het menu wanneer er op een link wordt geklikt (mobiel) [cite: 12]
  function closeMenu() {
    isOpen = false;
  }
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
    <a href="{base}/projects/cowcatcher" on:click={closeMenu}>CowCatcher</a>
    <a href="{base}/installation" on:click={closeMenu}>{m.nav_install()}</a>
    <a href="{base}/about-us" on:click={closeMenu}>{m.nav_about()}</a>
  </div>
</nav>

<style>
  /* Base Desktop Styles [cite: 14] */
  nav { 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem; 
    background: #386938; /* RAL 6001 Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative; /* Nodig voor absolute positionering mobiel menu [cite: 15] */
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
  }

  a { 
    text-decoration: none; 
    color: rgba(255,255,255,0.9); 
    font-weight: bold;
    transition: all 0.2s ease;
  }

  a:hover { 
    color: #CCFF00; /* Electric Lime Accent [cite: 20] */
  }

  /* Hamburger Button Styles [cite: 21, 22] */
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

  /* Mobile Responsive Styles [cite: 24] */
  @media (max-width: 768px) {
    .hamburger {
      display: flex; 
    }

    /* Transformeer hamburger naar 'X' [cite: 25, 26, 27] */
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
      gap: 0;
      max-height: 0; 
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }

    .links.open {
      max-height: 300px; 
    }

    .links a {
      padding: 1rem 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
</style>
