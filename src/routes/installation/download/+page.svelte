<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import { reveal } from '$lib/actions/reveal.js';
    import { stripColon, stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';
    import Icon from '$lib/components/Icon.svelte';

    import windowsLogo from '$lib/assets/download_windows_logo.jpg';
    import macOSLogo from '$lib/assets/download_macOS_logo.jpg';
    import linuxLogo from '$lib/assets/download_linux_logo.jpg';

    const platforms = [
        {
            title: m.download_card_windows_title,
            link: '/installation/download/Windows',
            desc: m.download_card_windows_desc,
            logo: windowsLogo,
            meta: 'Windows 10 · 11'
        },
        {
            title: m.download_card_macos_title,
            link: '/installation/download/macOS',
            desc: m.download_card_macos_desc,
            logo: macOSLogo,
            meta: 'Apple Silicon · Intel'
        },
        {
            title: m.download_card_linux_title,
            link: '/installation/download/docker',
            desc: m.download_card_linux_desc,
            logo: linuxLogo,
            meta: 'Docker · Jetson'
        }
    ];
</script>

<Seo title={m.download_title()} description={m.download_intro_text()} />

<PageHeader
    eyebrow="{m.step_label()} 2"
    title={m.download_title()}
    lead={m.download_intro_text()}
    crumbs={[{ href: '/installation', label: m.nav_install() }]}
/>

<div class="container">
    <InstallProgress current={2} />

    <h2 class="choose" use:reveal>{stripColon(m.install_text())}</h2>

    <ul class="platforms" use:reveal={{ stagger: 110 }}>
        {#each platforms as platform (platform.link)}
            <li>
                <a href="{base}{platform.link}" class="platform">
                    <span class="logo-tile">
                        <img src={platform.logo} alt="" loading="lazy" />
                    </span>
                    <span class="body">
                        <span class="meta">{platform.meta}</span>
                        <span class="name">{platform.title()}</span>
                        <span class="desc">{platform.desc()}</span>
                    </span>
                    <span class="go" aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
                </a>
            </li>
        {/each}
    </ul>

    <div class="pager-wrap">
        <PagerNav
            prev={{ href: '/installation/hardware', label: stripNumber(m.install_card_hardware_title()), hint: `${m.step_label()} 1` }}
            next={{ href: '/installation/options', label: stripNumber(m.install_card_options_title()), hint: `${m.step_label()} 3` }}
        />
    </div>
</div>

<style>
    .choose {
        margin: clamp(3rem, 6vw, 4.5rem) 0 1.5rem;
        font-size: clamp(2rem, 4vw, 2.8rem);
    }

    .platforms {
        display: grid;
        gap: 1rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .platform {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 1.25rem;
        align-items: center;
        height: 100%;
        padding: 1.1rem 1.25rem 1.1rem 1.1rem;
        border-radius: var(--radius-xl);
        background: var(--card-bg);
        box-shadow:
            0 0 0 1px var(--line),
            var(--shadow-sm);
        color: inherit;
        text-decoration: none;
        transition:
            transform var(--dur) var(--ease-spring),
            box-shadow var(--dur) var(--ease-spring);
    }

    .platform:hover {
        transform: translateY(-3px);
        box-shadow:
            0 0 0 1px var(--primary),
            var(--shadow-hover);
    }

    .logo-tile {
        display: grid;
        place-items: center;
        width: 5.5rem;
        height: 5.5rem;
        border-radius: var(--radius-lg);
        background: var(--surface-tint);
        overflow: hidden;
    }

    .logo-tile img {
        width: 80%;
        height: 80%;
        object-fit: contain;
        mix-blend-mode: multiply;
    }

    .body {
        display: grid;
        gap: 0.2rem;
    }

    .meta {
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    .name {
        font-family: var(--font-heading);
        font-size: 2rem;
        line-height: 1;
        color: var(--text-main);
    }

    .desc {
        color: var(--text-muted);
        font-size: 0.95rem;
    }

    .go {
        display: grid;
        place-items: center;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
        background: var(--primary-soft);
        color: var(--primary);
        transition:
            transform var(--dur) var(--ease-spring),
            background-color var(--dur) var(--ease-spring),
            color var(--dur) var(--ease-spring);
    }

    .platform:hover .go {
        transform: translateX(3px);
        background: var(--primary);
        color: #fff;
    }

    .pager-wrap {
        padding-bottom: var(--section-y);
    }

    @media (min-width: 960px) {
        .platforms {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .platform {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 1.5rem;
            padding: 1.5rem;
        }

        .go {
            justify-self: end;
        }
    }

    @media (max-width: 520px) {
        .platform {
            grid-template-columns: auto minmax(0, 1fr);
        }

        .logo-tile {
            width: 4rem;
            height: 4rem;
        }

        .go {
            display: none;
        }
    }
</style>
