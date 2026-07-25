<script>
  import * as m from '$lib/paraglide/messages.js';

  const sections = [
    { title: m.about_us_opensource_title, text: m.about_us_opensource_text },
    { title: m.about_us_team_title, text: m.about_us_team_text },
    { title: m.about_us_longevity_title, text: m.about_us_longevity_text },
    { title: m.about_us_independence_title, text: m.about_us_independence_text },
    { title: m.about_us_reality_title, text: m.about_us_reality_text },
    { title: m.about_us_contribute_title, text: m.about_us_contribute_text }
  ];
</script>

<svelte:head>
  <title>{m.about_us_title()} | CowCatcherAI</title>
</svelte:head>

<div class="page-container">
  <header class="hero-section">
    <h1>{m.about_us_title()}</h1>
    <p class="lead-text">{m.about_us_intro()}</p>
  </header>

  <div class="grid-layout">
    {#each sections as section}
      <section class="card">
        <h2>{section.title()}</h2>
        <p>{section.text()}</p>
      </section>
    {/each}
  </div>

  <section class="cta-section">
    <p class="cta-text">{m.about_us_conclusion()}</p>
    <a
      href="https://github.com/CowCatcherAI/CowCatcherAI"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn--ink github-btn"
    >
      {m.about_us_github_button()}
    </a>
  </section>
</div>

<style>
  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: var(--card-bg);
    border-radius: var(--radius);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  }

  h1 {
    font-family: var(--font-heading);
    color: var(--primary);
    font-size: 3.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .lead-text {
    font-size: 1.25rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    color: var(--text-main);
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 768px) {
    .grid-layout {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    height: 100%;
    box-sizing: border-box;
  }

  .card h2 {
    font-family: var(--font-heading);
    color: var(--primary);
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--soft-gray);
    padding-bottom: 0.5rem;
  }

  .card p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
  }

  .cta-section {
    background-color: var(--accent-amber);
    color: white;
    text-align: center;
    padding: 3rem 2rem;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .cta-text {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0;
    max-width: 700px;
  }

  .github-btn {
    padding: 1rem 2.5rem;
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: normal;
    letter-spacing: 1px;
    border-radius: 6px;
  }
</style>
