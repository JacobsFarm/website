<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    import cowcatcherLogo from '$lib/assets/CowCatchter-logo-875x875.jpg';
    import calfcatcherLogo from '$lib/assets/calvingcatcher-logo-875x-875.jpg';
    import aiDetectorLogo from '$lib/assets/Ai-detector-logo-800x800.jpg';
</script>

<div class="container">
    <header class="brand-hero">
        <h1>{m.front_page_title()}</h1>
        <h2 class="slogan">{m.front_page_subtitle()}</h2>
        <p class="description">{m.front_page_description()}</p>
    </header>

    <section class="projects-grid">
        <ProjectCard 
            title={m.front_page_cowcatcher_title()} 
            link="/projects/cowcatcher" 
            desc={m.front_page_cowcatcher_desc()} 
            logo={cowcatcherLogo}
        />
        <ProjectCard 
            title={m.front_page_calfcatcher_title()}
            link="/projects/calfcatcher"
            desc={m.front_page_calfcatcher_desc()}
            logo={calfcatcherLogo}
        />
        <ProjectCard 
            title={m.front_page_ai_detector_title()}
            link="/projects/ai-detector"
            desc={m.front_page_ai_detector_desc()}
            logo={aiDetectorLogo}
        />
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI">Official Open Source Project</a></p>
    </footer>
</div>

<style>
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

    .brand-hero {
        text-align: center;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        color: #386938;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .brand-hero .slogan {
        font-family: 'Roboto', sans-serif;
        font-size: clamp(1.2rem, 5vw, 1.75rem);
        color: #4DA699;
        margin: 0;
        font-weight: 500;
        text-transform: capitalize;
    }

    .brand-hero .description {
        font-size: clamp(1rem, 4vw, 1.15rem);
        color: #555;
        max-width: 600px;
        margin: 0;
        padding: 0 1rem;
    }

    .projects-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }

    @media (min-width: 768px) {
        .container {
            padding: 4rem 2rem;
        }
        .brand-hero {
            margin-bottom: 5rem;
        }
        .projects-grid {
            gap: 2rem;
        }
    }

    :global(.project-card) {
        border-top: 5px solid #386938;
        transition: transform 0.3s ease, border-color 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    @media (hover: hover) {
        :global(.project-card:hover) {
            border-color: #CCFF00;
            transform: translateY(-10px);
        }
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
</style>