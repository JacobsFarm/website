<script>
    import * as m from '$lib/paraglide/messages.js';
    import Icon from './Icon.svelte';

    /**
     * Eén hardwarecategorie (computer, camera's, …) met opties als kaarten.
     * Extra uitleg en koop-/videolinks zitten achter "Meer informatie".
     */
    let { id = '', number = '', title = '', intro = '', options = [] } = $props();
</script>

<section class="hw-section" {id}>
    <header class="head">
        {#if number}<span class="num">{number}</span>{/if}
        <div>
            <h2>{title}</h2>
            {#if intro}<p class="intro">{intro}</p>{/if}
        </div>
    </header>

    <ul class="options" class:single={options.length === 1}>
        {#each options as option (option.title)}
            <li class="option">
                {#if option.imageSrc}
                    <div class="media">
                        <img src={option.imageSrc} alt={option.imageAlt} loading="lazy" />
                    </div>
                {/if}

                <div class="body">
                    <h3>{option.title}</h3>
                    <p class="desc">{option.desc}</p>

                    {#if option.moreInfo || option.links?.length}
                        <details class="more">
                            <summary>
                                {m.hardware_more_info()}
                                <Icon name="chevron-down" size={16} class="chev" />
                            </summary>
                            <div class="more-body">
                                {#if option.moreInfo}
                                    <p>{option.moreInfo}</p>
                                {/if}

                                {#if option.links?.length}
                                    <div class="link-list">
                                        {#each option.links as link (link.url)}
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="external noopener noreferrer"
                                                data-sveltekit-reload
                                                class="hw-link"
                                            >
                                                <Icon name={link.icon} size={16} />
                                                <span>{link.text}</span>
                                                <Icon name="arrow-up-right" size={14} class="ext" />
                                            </a>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </details>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</section>

<style>
    .hw-section {
        padding-block: clamp(2.5rem, 5vw, 3.5rem);
        border-top: 1px solid var(--line);
        scroll-margin-top: var(--nav-offset);
    }

    .head {
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
        margin-bottom: 1.75rem;
    }

    .num {
        flex-shrink: 0;
        font-family: var(--font-heading);
        font-size: 3.25rem;
        line-height: 0.85;
        color: var(--accent-amber);
    }

    h2 {
        font-size: clamp(2rem, 4vw, 2.8rem);
        margin-bottom: 0.6rem;
    }

    .intro {
        color: var(--text-muted);
        max-width: 64ch;
    }

    .options {
        display: grid;
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .option {
        display: grid;
        grid-template-columns: 7.5rem minmax(0, 1fr);
        gap: 1.25rem;
        align-items: start;
        padding: 1rem;
        border-radius: var(--radius-lg);
        background: var(--card-bg);
        box-shadow:
            0 0 0 1px var(--line),
            var(--shadow-sm);
    }

    .media {
        aspect-ratio: 1;
        border-radius: var(--radius);
        background: var(--surface-tint);
        overflow: hidden;
    }

    .media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .body {
        display: grid;
        gap: 0.4rem;
        align-content: start;
        padding-top: 0.25rem;
        min-width: 0;
    }

    h3 {
        font-size: 1.12rem;
    }

    .desc {
        color: var(--text-muted);
        font-size: 0.97rem;
    }

    .more {
        margin-top: 0.5rem;
    }

    summary {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.75rem;
        border-radius: var(--radius-pill);
        background: var(--primary-soft);
        color: var(--primary-ink);
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        list-style: none;
        user-select: none;
        transition: background-color var(--dur-fast) var(--ease-out);
    }

    summary::-webkit-details-marker {
        display: none;
    }

    summary:hover {
        background: oklch(91% 0.045 145);
    }

    summary :global(.chev) {
        transition: transform var(--dur) var(--ease-spring);
    }

    details[open] summary :global(.chev) {
        transform: rotate(180deg);
    }

    .more-body {
        display: grid;
        gap: 1rem;
        padding-top: 0.9rem;
        font-size: 0.95rem;
        color: var(--text-muted);
        animation: open 0.4s var(--ease-out);
    }

    .link-list {
        display: grid;
        gap: 0.4rem;
    }

    .hw-link {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.6rem 0.85rem;
        border-radius: var(--radius-sm);
        background: var(--bg-sunken);
        color: var(--text-main);
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
        transition:
            background-color var(--dur-fast) var(--ease-out),
            color var(--dur-fast) var(--ease-out);
    }

    .hw-link span {
        flex: 1;
    }

    .hw-link :global(svg:first-child) {
        color: var(--primary);
    }

    .hw-link :global(.ext) {
        opacity: 0.5;
    }

    .hw-link:hover {
        background: var(--primary);
        color: #fff;
    }

    .hw-link:hover :global(svg) {
        color: #fff;
        opacity: 1;
    }

    @media (min-width: 900px) {
        .options {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .options.single {
            grid-template-columns: minmax(0, 1fr);
            max-width: calc(50% - 0.5rem);
        }

        .option {
            grid-template-columns: 9rem minmax(0, 1fr);
        }
    }

    @media (max-width: 480px) {
        .option {
            grid-template-columns: 1fr;
        }

        .media {
            aspect-ratio: 16 / 10;
        }
    }

    @keyframes open {
        from {
            opacity: 0;
            transform: translateY(-6px);
        }
    }
</style>
