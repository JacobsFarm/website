<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    // Importeer de juiste afbeeldingen uit de assets map
    import windowsLogo from '$lib/assets/download_windows_logo.jpg';
    import macOSLogo from '$lib/assets/download_macOS_logo.jpg';
    import linuxLogo from '$lib/assets/download_linux_logo.jpg';
</script>

<div class="container">
    <section class="info-section">
        <h1>{m.download_title()}</h1>
        <p class="info-text">{m.download_intro_text()}</p>
    </section>

    <section class="projects-grid">
        <ProjectCard 
            title={m.download_card_windows_title()} 
            link="/installation/download/Windows" 
            desc={m.download_card_windows_desc()} 
            logo={windowsLogo} 
        />
        <ProjectCard 
            title={m.download_card_macos_title()}
            link="/installation/download/macOS"
            desc={m.download_card_macos_desc()}
            logo={macOSLogo}
        />
        <ProjectCard 
            title={m.download_card_linux_title()}
            link="/installation/download/docker"
            desc={m.download_card_linux_desc()}
            logo={linuxLogo}
        />
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI" target="_blank" rel="noopener noreferrer">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    /* Styling overgenomen en consistent gehouden met de rest van de website */
    :global(body) {
        background-color: #F9FBF9;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        color: #333;
        overflow-x: hidden;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .info-section {
        text-align: center;
        background: #ffffff;
        border: 1px solid #e0eee0;
        border-radius: 16px;
        padding: 3rem 2rem;
        margin-bottom: 4rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        border-top: 5px solid #4DA699; /* Soft Teal accent */
    }

    .info-section h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        color: #386938;
        margin-bottom: 1rem;
        margin-top: 0;
        text-transform: uppercase;
        line-height: 1;
    }

    .info-text {
        font-size: 1.15rem;
        color: #555;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
    }

    .projects-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }

    .official-links {
        margin-top: 4rem;
        text-align: center;
        font-size: 0.85rem;
        border-top: 1px solid #4DA699;
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938;
        font-weight: bold;
        text-decoration: none;
    }

    .official-links a:hover {
        color: #CCFF00;
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