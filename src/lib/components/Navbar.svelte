<script>
  import * as m from '$lib/paraglide/messages.js';
  
  // Track whether the mobile menu is open or closed
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  // Close the menu when a link is clicked on mobile
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
    <a href="/" on:click={closeMenu}>{m.nav_home()}</a>
    <a href="/projects/cowcatcher" on:click={closeMenu}>CowCatcher</a>
    <a href="/installation" on:click={closeMenu}>{m.nav_install()}</a>
    <a href="/about-us" on:click={closeMenu}>{m.nav_about()}</a>
  </div>
</nav>

<style>
  /* Base Desktop Styles */
  nav { 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem; 
    background: #386938; /* RAL 6001 Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    position: relative; /* Needed for absolute positioning of mobile menu */
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
    color: #CCFF00; /* Electric Lime Accent */
  }

  /* Hamburger Button Base Styles */
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

  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .hamburger {
      display: flex; /* Show hamburger on mobile */
    }

    /* Transform hamburger into an 'X' when open */
    .bar.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    .bar.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    /* Hide links by default on mobile, display as dropdown */
    .links {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #386938;
      flex-direction: column;
      gap: 0;
      max-height: 0; /* Hidden by default */
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    }

    /* Expand links container when menu is open */
    .links.open {
      max-height: 300px; /* Adjust if you add more links */
    }

    .links a {
      padding: 1rem 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
</style>
