<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import { languages } from '$lib/config/languages.js';
  import { projects } from '$lib/config/projects.js';

  let isOpen = $state(false);

  // setLocale herlaadt de pagina, dus dit hoeft niet reactief te zijn.
  const currentLocale = getLocale();

  const mainLinks = [
    { href: `${base}/`, label: m.nav_home },
    { href: `${base}/installation`, label: m.nav_install },
    { href: `${base}/about-us`, label: m.nav_about }
  ];

  function closeMenu() {
    isOpen = false;
  }

  function handleLocaleChange(event: Event) {
    const target = event.currentTarget as HTMLSelectElement;
    setLocale(target.value as Parameters<typeof setLocale>[0]);
    closeMenu();
  }
</script>

<nav>
  <div class="logo">CowCatcherAI</div>

  <button
    class="hamburger"
    onclick={() => (isOpen = !isOpen)}
    aria-label="Toggle navigation"
    aria-expanded={isOpen}
  >
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
    <span class="bar" class:open={isOpen}></span>
  </button>

  <div class="links" class:open={isOpen}>
    {#each mainLinks as link}
      <a href={link.href} onclick={closeMenu}>{link.label()}</a>
    {/each}

    {#each projects as project}
      <a href="{base}{project.link}" class="mobile-only" onclick={closeMenu}>{project.name}</a>
    {/each}

    <div class="lang-switcher">
      <select
        value={currentLocale}
        onchange={handleLocaleChange}
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
    background: var(--primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 100;
    font-family: var(--font-body);
  }

  .logo {
    color: var(--bg-color);
    font-family: var(--font-heading);
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
    color: var(--bg-color);
    font-weight: bold;
    transition: all 0.2s ease;
  }

  a:hover {
    color: var(--accent-amber);
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
    color: var(--bg-color);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    outline: none;
    transition: all 0.2s ease;
  }

  .lang-dropdown:hover {
    border-color: var(--accent-amber);
  }

  .lang-dropdown option {
    background: var(--primary);
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
    background-color: var(--bg-color);
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

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
      background: var(--primary);
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-in-out;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
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
