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
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: #F9FBF9; /* Base Off-White [cite: 4] */
        font-family: 'Roboto', sans-serif; /* Secondary font  */
        margin: 0;
        color: #333;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
    }

    .brand-hero {
        text-align: center;
        margin-bottom: 5rem;
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif; /* Headline Font  */
        font-size: 4rem;
        color: #386938; /* Emerald Green  */
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    .brand-hero p {
        font-size: 1.25rem;
        color: #4DA699; /* Soft Teal Accent  */
        max-width: 600px;
        margin: 0 auto;
    }

    .projects-grid {
        display: grid;
        gap: 2rem; /* Increased spacing for modern feel [cite: 13] */
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }

    /* Customizing ProjectCard behavior via CSS variables or global styles */
    :global(.project-card) {
        border-top: 5px solid #386938; /* Branding  */
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    :global(.project-card:hover) {
        border-color: #CCFF00; /* Electric Lime Accent  */
        transform: translateY(-10px);
    }

    .official-links {
        margin-top: 6rem;
        text-align: center;
        font-size: 0.9rem;
        border-top: 1px solid #4DA699; /* Soft Teal  */
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938;
        font-weight: bold;
        text-decoration: none;
    }

    .official-links a:hover {
        color: #CCFF00; /* Electric Lime  */
    }
</style>