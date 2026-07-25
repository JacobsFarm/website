<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    import hardwareLogo from '$lib/assets/installation_hardware_1.jpg';
    import softwareLogo from '$lib/assets/installation_software_1.jpg';
    import optionsLogo from '$lib/assets/installation_software_options_1.jpg';

    const steps = [
        {
            title: m.install_card_hardware_title,
            link: '/installation/hardware',
            desc: m.install_card_hardware_desc,
            logo: hardwareLogo
        },
        {
            title: m.install_card_software_title,
            link: '/installation/download',
            desc: m.install_card_software_desc,
            logo: softwareLogo
        },
        {
            title: m.install_card_options_title,
            link: '/installation/options',
            desc: m.install_card_options_desc,
            logo: optionsLogo
        }
    ];
</script>

<div class="page-container">
    <section class="info-section">
        <h1>{m.install_title()}</h1>
        <p class="info-text">{m.install_info_text()}</p>
    </section>

    <section class="card-grid">
        {#each steps as step}
            <ProjectCard title={step.title()} link={step.link} desc={step.desc()} logo={step.logo} />
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
