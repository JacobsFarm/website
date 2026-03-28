<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    
    // Updated image extensions to match the new assets directory
    import hardwareLogo from '$lib/assets/installation_hardware_1.jpg';
    import softwareLogo from '$lib/assets/installation_software_1.jpg';
    import optionsLogo from '$lib/assets/installation_software_options_1.jpg';
</script>

<div class="container">
    <section class="info-section">
        <h1>{m.install_title()}</h1>
        <p class="info-text">{m.install_info_text()}</p>
    </section>

    <section class="projects-grid">
        <ProjectCard 
            title={m.install_card_hardware_title()} 
            link="/installation/hardware" 
            desc={m.install_card_hardware_desc()} 
            logo={hardwareLogo} 
        />
        <ProjectCard 
            title={m.install_card_software_title()}
            link="/installation/download" 
            desc={m.install_card_software_desc()}
            logo={softwareLogo}
        />
        <ProjectCard 
            title={m.install_card_options_title()}
            link="/installation/options"
            desc={m.install_card_options_desc()}
            logo={optionsLogo}
        />
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI" target="_blank" rel="noopener noreferrer">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: oklch(98% 0.005 145); /* Off-white */
        font-family: 'Roboto', sans-serif;
        margin: 0;
        color: oklch(22% 0.02 145); /* Deep Ink */
        overflow-x: hidden;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    /* --- Info Sectie Styles --- */
    .info-section {
        text-align: center;
        background: #ffffff;
        border: 1px solid oklch(85% 0.01 145); /* Soft Gray */
        border-radius: 16px;
        padding: 3rem 2rem;
        margin-bottom: 4rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        border-top: 5px solid oklch(60% 0.09 195); /* Muted Teal accent */
    }

    .info-section h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        color: #386938; /* Emerald Green */
        margin-bottom: 1rem;
        margin-top: 0;
        text-transform: uppercase;
        line-height: 1;
    }

    .info-text {
        font-size: 1.15rem;
        color: oklch(22% 0.02 145); /* Deep Ink */
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
    }

    /* --- Grid Styles --- */
    .projects-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }

    /* --- Footer Styles --- */
    .official-links {
        margin-top: 4rem;
        text-align: center;
        font-size: 0.85rem;
        border-top: 1px solid oklch(60% 0.09 195); /* Muted Teal */
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938; /* Emerald Green */
        font-weight: bold;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .official-links a:hover {
        color: oklch(65% 0.16 75); /* Deep Amber */
    }

    @media (min-width: 768px) {
        .container {
            padding: 4rem 2rem;
        }
        .projects-grid {
            gap: 2rem;
        }
    }
</style>