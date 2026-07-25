<script>
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';

  let { title, link, desc = '', logo = null } = $props();
</script>

<div class="card">
  {#if logo}
    <div class="logo-container">
      <img src={logo} alt="{title} logo" class="project-logo" />
    </div>
  {/if}
  <h2>{title}</h2>
  <p>{desc}</p>
  <a href="{base}{link}" class="btn btn--solid card-btn">{m.read_more()} &rarr;</a>
</div>

<style>
  .card {
    border: 1px solid var(--soft-gray);
    padding: 2rem;
    border-radius: var(--radius);
    background: var(--card-bg);
    box-shadow: var(--shadow-sm);
    transition: transform 0.3s ease, border-color 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  .card:hover {
    transform: translateY(-5px);
    border-color: var(--accent-amber);
  }

  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .project-logo {
    width: 100%;
    max-width: 200px;
    max-height: 150px;
    object-fit: contain;
  }

  h2 {
    margin-top: 0;
    color: var(--primary);
    font-size: 1.5rem;
    text-align: center;
  }

  p {
    color: var(--text-main);
    line-height: 1.6;
    flex-grow: 1;
    text-align: center;
  }

  .card-btn {
    margin-top: 1.5rem;
  }
</style>
