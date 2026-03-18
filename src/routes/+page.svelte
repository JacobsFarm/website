<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<div class="container">
    <header class="brand-hero">
        <h1>{m.front_page_title()}</h1>
        <p>{m.front_page_subtitle()}</p>
    </header>

    <section class="projects-grid">
        <ProjectCard 
            title={m.front_page_cowcatcher_title()} 
            link="/projects/cowcatcher" 
            desc={m.front_page_cowcatcher_desc()} 
        />
        <ProjectCard 
            title={m.front_page_calfcatcher_title()} 
            link="/projects/calfcatcher" 
            desc={m.front_page_calfcatcher_desc()} 
        />
        <ProjectCard 
            title={m.front_page_ai_detector_title()} 
            link="/projects/ai-detector" 
            desc={m.front_page_ai_detector_desc()} 
        />
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI">Official Open Source Project</a> [cite: 6]</p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: #F9FBF9; /* Base Off-White [cite: 4] */
        font-family: 'Roboto', sans-serif; /* Secondary font [cite: 2] */
        margin: 0;
        color: #333;
        overflow-x: hidden; /* Prevent horizontal scroll on mobile */
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem; /* Smaller padding for mobile */
    }

    .brand-hero {
        text-align: center;
        margin-bottom: 3rem; /* Tighter spacing for mobile */
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif; /* Headline Font  */
        /* Fluid typography: shrinks on mobile, grows on desktop */
        font-size: clamp(2.5rem, 8vw, 4.5rem); 
        color: #386938; /* Emerald Green  */
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .brand-hero p {
        font-size: clamp(1rem, 4vw, 1.25rem);
        color: #4DA699; /* Soft Teal Accent  */
        max-width: 600px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .projects-grid {
        display: grid;
        gap: 1.5rem; /*  */
        /* Adjusted minmax to be more mobile-friendly */
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
    }

    /* Tablet/Desktop Adjustments */
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
        border-top: 5px solid #386938; /* Emerald Green  */
        transition: transform 0.3s ease, border-color 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /* Disable hover transform on touch devices to avoid "sticky" hover states */
    @media (hover: hover) {
        :global(.project-card:hover) {
            border-color: #CCFF00; /* Electric Lime Accent  */
            transform: translateY(-10px);
        }
    }

    .official-links {
        margin-top: 4rem;
        text-align: center;
        font-size: 0.85rem;
        border-top: 1px solid #4DA699; /* Soft Teal  */
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938; /* Emerald Green  */
        font-weight: bold;
        text-decoration: none;
    }

    .official-links a:hover {
        color: #CCFF00; /* Electric Lime  */
    }
</style>
