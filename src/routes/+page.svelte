<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    import cowcatcherLogo from '$lib/assets/CowCatchter-logo-875x875.jpg';
    import calvingcatcherLogo from '$lib/assets/calvingcatcher-logo-875x-875.jpg';
    import aiDetectorLogo from '$lib/assets/Ai-detector-logo-800x800.jpg';

    // Animation stores for the numbers
    const farms = tweened(0, { duration: 2000, easing: cubicOut });
    const detections = tweened(0, { duration: 2000, easing: cubicOut }); 
    const countries = tweened(0, { duration: 2000, easing: cubicOut });
    let statsRef;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Set the target numbers here
                farms.set(35);
                detections.set(100); 
                countries.set(5);
                observer.disconnect(); // Stop observing once animated
            }
        }, { threshold: 0.3 }); // Triggers when 30% of the section is visible

        if (statsRef) {
            observer.observe(statsRef);
        }

        return () => observer.disconnect();
    });
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
            title={m.front_page_calvingcatcher_title()}
            link="/projects/calvingcatcher"
            desc={m.front_page_calvingcatcher_desc()}
            logo={calvingcatcherLogo}
        />
        <ProjectCard 
            title={m.front_page_ai_detector_title()}
            link="/projects/ai-detector"
            desc={m.front_page_ai_detector_desc()}
            logo={aiDetectorLogo}
        />
    </section>

    <section class="stats-section" bind:this={statsRef}>
        <h2>{m.front_page_stats_title()}</h2>
        <p class="stats-subtitle">{m.front_page_stats_subtitle()}</p>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">{Math.floor($farms)}</span>
                <span class="stat-label">{m.front_page_stats_farms()}</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{Math.floor($detections)}K+</span>
                <span class="stat-label">{m.front_page_stats_detections()}</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{Math.floor($countries)}</span>
                <span class="stat-label">{m.front_page_stats_countries()}</span>
            </div>
        </div>
        
        <p class="stats-disclaimer">{m.front_page_stats_disclaimer()}</p>
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: oklch(98% 0.005 145); /* Off White */
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
        color: #386938; /* Emerald Green */
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .brand-hero .slogan {
        font-family: 'Roboto', sans-serif;
        font-size: clamp(1.2rem, 5vw, 1.75rem);
        color: oklch(60% 0.09 195); /* Muted Teal */
        margin: 0;
        font-weight: 500;
        text-transform: capitalize;
    }

    .brand-hero .description {
        font-size: clamp(1rem, 4vw, 1.15rem);
        color: oklch(22% 0.02 145); /* Deep Ink */
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
        border-top: 5px solid #386938; /* Emerald Green */
        transition: transform 0.3s ease, border-color 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    @media (hover: hover) {
        :global(.project-card:hover) {
            border-color: oklch(65% 0.16 75); /* Deep Amber */
            transform: translateY(-10px);
        }
    }

    /* --- Stats Section Styles --- */
    .stats-section {
        margin-top: 5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stats-section h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2rem, 6vw, 3.5rem);
        color: #386938; /* Emerald Green */
        margin-bottom: 0.5rem;
    }

    .stats-subtitle {
        color: oklch(60% 0.09 195); /* Muted Teal */
        font-size: clamp(1rem, 3vw, 1.25rem);
        max-width: 600px;
        margin-bottom: 3rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        width: 100%;
        max-width: 900px;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: #ffffff;
        border: 1px solid oklch(85% 0.01 145); /* Soft Gray */
        border-radius: 16px;
        padding: 2.5rem 1rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-5px);
        border-color: oklch(65% 0.16 75); /* Deep Amber */
    }

    .stat-number {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 4rem;
        color: #386938; /* Emerald Green */
        line-height: 1;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-weight: 500;
        color: oklch(22% 0.02 145); /* Deep Ink */
        font-size: 1.1rem;
    }

    .stats-disclaimer {
        font-size: 0.85rem;
        color: oklch(22% 0.02 145); /* Deep Ink */
        opacity: 0.8; /* Slightly faded for secondary text */
        max-width: 700px;
        line-height: 1.5;
        font-style: italic;
        margin-top: 1rem;
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
    }

    .official-links a:hover {
        color: oklch(65% 0.16 75); /* Deep Amber */
    }
</style>