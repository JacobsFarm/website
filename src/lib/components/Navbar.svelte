<script>
  import * as m from '$lib/paraglide/messages.js';
</script>

<nav>
  <div class="logo">CowCatcherAI</div>
  <div class="links">
    <a href="/">{m.nav_home()}</a>
    <a href="/projects/cowcatcher">CowCatcher</a>
    <a href="/installation">{m.nav_install()}</a>
    <a href="/about-us">{m.nav_about()}</a>
  </div>
</nav>

<style>
  nav { 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem; 
    background: #386938; /* RAL 6001 Emerald Green */
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
</style>