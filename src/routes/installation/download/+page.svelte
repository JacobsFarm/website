<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    import windowsLogo from '$lib/assets/download_windows_logo.jpg';
    import macOSLogo from '$lib/assets/download_macOS_logo.jpg';
    import linuxLogo from '$lib/assets/download_linux_logo.jpg';

    const platforms = [
        {
            title: m.download_card_windows_title,
            link: '/installation/download/Windows',
            desc: m.download_card_windows_desc,
            logo: windowsLogo
        },
        {
            title: m.download_card_macos_title,
            link: '/installation/download/macOS',
            desc: m.download_card_macos_desc,
            logo: macOSLogo
        },
        {
            title: m.download_card_linux_title,
            link: '/installation/download/docker',
            desc: m.download_card_linux_desc,
            logo: linuxLogo
        }
    ];
</script>

<div class="page-container">
    <section class="info-section">
        <h1>{m.download_title()}</h1>
        <p class="info-text">{m.download_intro_text()}</p>
    </section>

    <section class="card-grid">
        {#each platforms as platform}
            <ProjectCard
                title={platform.title()}
                link={platform.link}
                desc={platform.desc()}
                logo={platform.logo}
            />
        {/each}
    </section>

    <footer class="official-links">
        <p>
            Part of the <a
                href="https://github.com/CowCatcherAI/CowCatcherAI"
                target="_blank"
                rel="noopener noreferrer">Official Open Source Project</a
            >
        </p>
    </footer>
</div>
