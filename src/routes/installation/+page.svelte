<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import { reveal } from '$lib/actions/reveal.js';
    import { links } from '$lib/config/links.js';
    import { splitLabel, stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Icon from '$lib/components/Icon.svelte';

    import hardwareImg from '$lib/assets/installation_hardware_1.jpg';
    import softwareImg from '$lib/assets/installation_software_1.jpg';
    import optionsImg from '$lib/assets/installation_software_options_1.jpg';

    const steps = [
        {
            title: m.install_card_hardware_title,
            link: '/installation/hardware',
            desc: m.install_card_hardware_desc,
            img: hardwareImg,
            icon: 'wrench'
        },
        {
            title: m.install_card_software_title,
            link: '/installation/download',
            desc: m.install_card_software_desc,
            img: softwareImg,
            icon: 'download'
        },
        {
            title: m.install_card_options_title,
            link: '/installation/options',
            desc: m.install_card_options_desc,
            img: optionsImg,
            icon: 'sliders'
        }
    ];

    const needs = [
        { icon: 'computer', text: m.cowcatcher_needs_pc },
        { icon: 'camera', text: m.cowcatcher_needs_camera },
        { icon: 'spark', text: m.cowcatcher_needs_switch },
        { icon: 'code', text: m.cowcatcher_needs_cable },
        { icon: 'globe', text: m.cowcatcher_needs_internet }
    ].map((item) => ({ ...item, parts: splitLabel(item.text()) }));
</script>

<Seo title={m.install_title()} description={m.install_info_text()} />

<PageHeader eyebrow={m.nav_install()} title={m.install_title()} lead={m.install_info_text()}>
    {#snippet actions()}
        <a href="{base}/installation/hardware" class="btn btn--solid btn--lg">
            {stripNumber(m.install_card_hardware_title())}
            <span class="btn__icon"><Icon name="arrow-right" /></span>
        </a>
        <a href="{base}/installation/download" class="btn btn--ghost btn--lg">
            <Icon name="download" size={18} />
            {stripNumber(m.install_card_software_title())}
        </a>
    {/snippet}
</PageHeader>

<section class="container route-section">
    <h2 class="h-section route-title" use:reveal>{m.install_route_title()}</h2>

    <ol class="route" use:reveal={{ stagger: 120 }}>
        {#each steps as step, i (step.link)}
            <li class="route-step">
                <a href="{base}{step.link}" class="route-card">
                    <span class="route-num" aria-hidden="true">0{i + 1}</span>
                    <div class="route-img">
                        <img src={step.img} alt="" loading="lazy" />
                    </div>
                    <div class="route-body">
                        <span class="chip"><Icon name={step.icon} size={14} /> {m.step_label()} {i + 1}</span>
                        <h3>{stripNumber(step.title())}</h3>
                        <p>{step.desc()}</p>
                        <span class="route-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
                    </div>
                </a>
            </li>
        {/each}
    </ol>
</section>

<section class="section container needs-section">
    <div class="needs-grid">
        <div class="needs-head" use:reveal>
            <h2 class="h-section">{m.cowcatcher_needs_title()}</h2>
            <p class="lead">{m.hardware_intro()}</p>
            <a href="{base}/installation/hardware" class="text-link">
                {stripNumber(m.install_card_hardware_title())} &rarr;
            </a>
        </div>

        <ul class="needs" use:reveal={{ stagger: 80 }}>
            {#each needs as need}
                <li>
                    <span class="need-icon"><Icon name={need.icon} size={20} /></span>
                    <span>
                        {#if need.parts.label}<strong>{need.parts.label}</strong>{/if}
                        {need.parts.text}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
</section>

<section class="container help-section">
    <div class="help" use:reveal>
        <div>
            <h2>{m.inst_support_title()}</h2>
            <p>{m.install_help_text()}</p>
        </div>
        <div class="btn-row">
            <a href={links.telegram} target="_blank" rel="noopener noreferrer" class="btn btn--light">
                <Icon name="telegram" size={18} /> Telegram
            </a>
            <a href={links.facebook} target="_blank" rel="noopener noreferrer" class="btn btn--ghost-dark">
                <Icon name="facebook" size={18} /> Facebook
            </a>
            <a href="mailto:{links.email}" class="btn btn--ghost-dark">
                <Icon name="mail" size={18} /> E-mail
            </a>
        </div>
    </div>
</section>

<style>
    .route-section {
        padding-top: 1rem;
    }

    .route-title {
        margin-bottom: clamp(2rem, 4vw, 3rem);
        font-size: clamp(2.2rem, 4.5vw, 3.4rem);
    }

    .route {
        position: relative;
        display: grid;
        gap: 1.25rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .route-card {
        position: relative;
        display: grid;
        height: 100%;
        border-radius: var(--radius-xl);
        background: var(--card-bg);
        box-shadow:
            0 0 0 1px var(--line),
            var(--shadow-sm);
        color: inherit;
        text-decoration: none;
        overflow: hidden;
        transition:
            transform var(--dur) var(--ease-spring),
            box-shadow var(--dur) var(--ease-spring);
    }

    .route-card:hover {
        transform: translateY(-4px);
        box-shadow:
            0 0 0 1px var(--primary),
            var(--shadow-hover);
    }

    .route-num {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        z-index: var(--z-raised);
        font-family: var(--font-heading);
        font-size: 4.5rem;
        line-height: 0.8;
        color: var(--primary);
        opacity: 0.12;
    }

    .route-img {
        aspect-ratio: 16 / 10;
        margin: 0.5rem 0.5rem 0;
        border-radius: calc(var(--radius-xl) - 0.5rem);
        background: var(--surface-tint);
        overflow: hidden;
    }

    .route-img img {
        width: 100%;
        height: 100%;
        padding: 1.5rem;
        object-fit: contain;
        mix-blend-mode: multiply;
        transition: transform 0.9s var(--ease-out);
    }

    .route-card:hover .route-img img {
        transform: scale(1.05);
    }

    .route-body {
        display: grid;
        gap: 0.75rem;
        align-content: start;
        justify-items: start;
        padding: 1.5rem 1.75rem 1.75rem;
    }

    .route-body h3 {
        font-size: 1.4rem;
    }

    .route-body p {
        color: var(--text-muted);
    }

    .route-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        margin-top: 0.25rem;
        color: var(--primary);
        font-weight: 600;
    }

    .route-link :global(svg) {
        transition: transform var(--dur) var(--ease-spring);
    }

    .route-card:hover .route-link :global(svg) {
        transform: translateX(4px);
    }

    @media (min-width: 900px) {
        .route {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    /* ── Wat je nodig hebt ── */
    .needs-grid {
        display: grid;
        gap: 2.5rem;
    }

    .needs-head {
        display: grid;
        gap: 1.1rem;
        align-content: start;
        justify-items: start;
    }

    .needs {
        display: grid;
        gap: 0.6rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .needs li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        padding: 1.1rem 1.25rem;
        border-radius: var(--radius);
        background: var(--card-bg);
        box-shadow: 0 0 0 1px var(--line);
        line-height: 1.55;
    }

    .needs li > span:last-child {
        color: var(--text-muted);
    }

    .needs strong {
        display: block;
        font-weight: 600;
        color: var(--text-main);
    }

    .need-icon {
        display: grid;
        place-items: center;
        flex-shrink: 0;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-sm);
        background: var(--primary-soft);
        color: var(--primary);
    }

    @media (min-width: 960px) {
        .needs-grid {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
            gap: 5rem;
        }

        .needs-head {
            position: sticky;
            top: 7rem;
            align-self: start;
        }
    }

    /* ── Hulp ── */
    .help-section {
        padding-bottom: var(--section-y);
    }

    .help {
        display: grid;
        gap: 1.5rem;
        padding: clamp(1.75rem, 4vw, 3rem);
        border-radius: var(--radius-xl);
        background:
            radial-gradient(30rem 18rem at 100% 0%, oklch(40% 0.08 150 / 0.7), transparent 70%),
            var(--forest);
        color: var(--on-dark-muted);
    }

    .help h2 {
        margin-bottom: 0.5rem;
        font-size: clamp(2.2rem, 4.5vw, 3.2rem);
        color: var(--on-dark);
    }

    @media (min-width: 900px) {
        .help {
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 3rem;
        }
    }
</style>
