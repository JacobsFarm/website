<script>
  import * as m from '$lib/paraglide/messages.js';
  import { reveal } from '$lib/actions/reveal.js';
  import { links } from '$lib/config/links.js';
  import { splitMotto } from '$lib/utils/text.js';
  import Seo from '$lib/components/Seo.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const sections = [
    { icon: 'unlock', title: m.about_us_opensource_title, text: m.about_us_opensource_text },
    { icon: 'code', title: m.about_us_team_title, text: m.about_us_team_text },
    { icon: 'clock', title: m.about_us_longevity_title, text: m.about_us_longevity_text },
    { icon: 'home', title: m.about_us_independence_title, text: m.about_us_independence_text },
    { icon: 'eye', title: m.about_us_reality_title, text: m.about_us_reality_text },
    { icon: 'users', title: m.about_us_contribute_title, text: m.about_us_contribute_text }
  ];

  const motto = splitMotto(m.footer_tagline());
</script>

<Seo title={m.about_us_title()} description={m.about_us_intro()} />

<PageHeader eyebrow={m.nav_about()} title={m.about_us_title()} lead={m.about_us_intro()}>
  {#snippet aside()}
    <div class="motto-card">
      {#each motto as part, i}
        <span class:accent={i === motto.length - 1}>{part}</span>
      {/each}
      <small>{m.front_page_intro_title()}</small>
    </div>
  {/snippet}
</PageHeader>

<section class="section principles">
  <div class="container">
    <ol class="grid" use:reveal={{ stagger: 90 }}>
      {#each sections as section, i}
        <li class="item">
          <div class="item-head">
            <span class="num">0{i + 1}</span>
            <span class="icon"><Icon name={section.icon} size={20} /></span>
          </div>
          <h2>{section.title()}</h2>
          <p>{section.text()}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <div class="cta" use:reveal>
      <p class="cta-text">{m.about_us_conclusion()}</p>
      <div class="btn-row">
        <a href={links.github} target="_blank" rel="noopener noreferrer" class="btn btn--light btn--lg">
          <Icon name="github" size={18} />
          {m.about_us_github_button()}
          <span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
        </a>
        <a href={links.telegram} target="_blank" rel="noopener noreferrer" class="btn btn--ghost-dark btn--lg">
          <Icon name="telegram" size={18} /> Telegram
        </a>
        <a href={links.facebook} target="_blank" rel="noopener noreferrer" class="btn btn--ghost-dark btn--lg">
          <Icon name="facebook" size={18} /> Facebook
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .motto-card {
    display: grid;
    gap: 0.1rem;
    padding: clamp(1.75rem, 4vw, 2.75rem);
    border-radius: var(--radius-xl);
    background:
      radial-gradient(28rem 18rem at 0% 0%, oklch(40% 0.08 150 / 0.75), transparent 70%),
      var(--forest);
    box-shadow: var(--shadow-lg);
    font-family: var(--font-heading);
    font-size: clamp(2.6rem, 5vw, 4rem);
    line-height: 0.95;
    color: var(--on-dark);
    transform: rotate(-1.5deg);
  }

  .motto-card .accent {
    color: var(--accent-amber);
  }

  .motto-card small {
    margin-top: 1.25rem;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-dark-muted);
  }

  .principles {
    padding-top: 1rem;
  }

  .grid {
    display: grid;
    gap: 1px;
    margin: 0;
    padding: 0;
    list-style: none;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--line);
    box-shadow: 0 0 0 1px var(--line);
  }

  .item {
    display: grid;
    gap: 0.9rem;
    align-content: start;
    padding: clamp(1.5rem, 3.5vw, 2.5rem);
    background: var(--card-bg);
    transition: background-color var(--dur) var(--ease-out);
  }

  .item:hover {
    background: oklch(99.4% 0.006 145);
  }

  .item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .num {
    font-family: var(--font-heading);
    font-size: 2.6rem;
    line-height: 0.85;
    color: var(--accent-amber);
  }

  .icon {
    display: grid;
    place-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: var(--radius-sm);
    background: var(--primary-soft);
    color: var(--primary);
  }

  .item h2 {
    font-size: clamp(1.8rem, 3vw, 2.2rem);
  }

  .item p {
    color: var(--text-muted);
  }

  @media (min-width: 800px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1100px) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .cta-section {
    padding-bottom: var(--section-y);
  }

  .cta {
    display: grid;
    gap: 1.75rem;
    padding: clamp(1.75rem, 4vw, 3.5rem);
    border-radius: var(--radius-xl);
    background:
      radial-gradient(34rem 20rem at 100% 100%, oklch(45% 0.1 80 / 0.35), transparent 70%),
      var(--forest);
  }

  .cta-text {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    line-height: 1.5;
    color: var(--on-dark);
    max-width: 48ch;
  }
</style>
