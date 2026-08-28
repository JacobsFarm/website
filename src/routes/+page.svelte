<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import FeaturedIn from '$lib/components/FeaturedIn.svelte';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import FeatureCard from '$lib/components/FeatureCard.svelte';
    import { Tween } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { base } from '$app/paths';
    import { projects } from '$lib/config/projects.js';

    const features = [
        { title: m.front_page_feature_community_title, desc: m.front_page_feature_community_desc },
        { title: m.front_page_feature_free_title, desc: m.front_page_feature_free_desc },
        { title: m.front_page_feature_smart_title, desc: m.front_page_feature_smart_desc }
    ];

    const demos = [
        {
            href: 'https://huggingface.co/spaces/CowcatcherAI/CowCatcherAI',
            text: m.front_page_test_cowcatcher_btn,
            variant: 'solid'
        },
        {
            href: 'https://huggingface.co/spaces/CowcatcherAI/CalvingcatcherAI',
            text: m.front_page_test_calvingcatcher_btn,
            variant: 'outline'
        }
    ];

    // Tellers die oplopen zodra het statistiekblok in beeld komt.
    const stats = [
        { target: 55, suffix: '', label: m.front_page_stats_farms },
        { target: 200, suffix: 'K+', label: m.front_page_stats_detections },
        { target: 6, suffix: '', label: m.front_page_stats_countries }
    ].map((stat) => ({
        ...stat,
        tween: new Tween(0, { duration: 2000, easing: cubicOut })
    }));

    let statsRef = $state();

    $effect(() => {
        if (!statsRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    for (const stat of stats) stat.tween.target = stat.target;
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(statsRef);
        return () => observer.disconnect();
    });
</script>

{#snippet externalLinkIcon()}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path>
    </svg>
{/snippet}

<div class="page-container">
    <header class="brand-hero">
        <h1>{m.front_page_title()}</h1>
        <h2 class="slogan">{m.front_page_subtitle()}</h2>
        <p class="description">{m.front_page_description()}</p>
    </header>

    <section class="card-grid">
        {#each projects as project}
            <ProjectCard
                title={project.title()}
                link={project.link}
                desc={project.desc()}
                logo={project.logo}
            />
        {/each}
    </section>

    <HighlightBlock
        size="large"
        title={m.front_page_intro_title()}
        actions={[
            { text: m.front_page_intro_btn_install(), href: `${base}/installation`, variant: 'solid' },
            { text: m.front_page_intro_btn_help(), href: `${base}/about-us`, variant: 'outline' }
        ]}
    >
        <p>{m.front_page_intro_p1()}</p>
        <p>{m.front_page_intro_p2()}</p>
        <p>{m.front_page_intro_p3()}</p>
        <p>{m.front_page_intro_p4()}</p>
        <p>{m.front_page_intro_p5()}</p>
    </HighlightBlock>

    <section class="features">
        {#each features as feature}
            <FeatureCard title={feature.title()} desc={feature.desc()} />
        {/each}
    </section>

    <section class="test-models-section">
        <h2>{m.front_page_test_models_title()}</h2>
        <p>{m.front_page_test_models_subtitle()}</p>

        <div class="demo-buttons">
            {#each demos as demo}
                <a
                    href={demo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn--pill btn--{demo.variant}"
                >
                    {demo.text()}
                    {@render externalLinkIcon()}
                </a>
            {/each}
        </div>
    </section>

    <FeaturedIn />

    <section class="stats-section" bind:this={statsRef}>
        <h2>{m.front_page_stats_title()}</h2>
        <p class="stats-subtitle">{m.front_page_stats_subtitle()}</p>

        <div class="stats-grid">
            {#each stats as stat}
                <div class="stat-card">
                    <span class="stat-number">{Math.floor(stat.tween.current)}{stat.suffix}</span>
                    <span class="stat-label">{stat.label()}</span>
                </div>
            {/each}
        </div>

        <p class="stats-disclaimer">{m.front_page_stats_disclaimer()}</p>
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    .brand-hero {
        text-align: center;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    h1 {
        font-family: var(--font-heading);
        font-size: clamp(2.5rem, 8vw, 4.5rem);
        color: var(--primary);
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .brand-hero .slogan {
        font-family: var(--font-body);
        font-size: clamp(1.2rem, 5vw, 1.75rem);
        color: var(--accent-teal);
        margin: 0;
        font-weight: 500;
        text-transform: capitalize;
    }

    .brand-hero .description {
        font-size: clamp(1rem, 4vw, 1.15rem);
        color: var(--text-main);
        max-width: 600px;
        margin: 0;
        padding: 0 1rem;
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        max-width: 1000px;
        margin: 0 auto 2rem auto;
    }

    @media (min-width: 768px) {
        .brand-hero {
            margin-bottom: 5rem;
        }
    }

    .test-models-section {
        margin-top: 5rem;
        background: var(--card-bg);
        border: 1px solid var(--soft-gray);
        border-radius: var(--radius-lg);
        padding: 4rem 2rem;
        text-align: center;
        box-shadow: var(--shadow-lg);
        border-top: 5px solid var(--accent-amber);
    }

    .test-models-section h2 {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 6vw, 3.5rem);
        color: var(--primary);
        margin-bottom: 1rem;
    }

    .test-models-section p {
        font-size: clamp(1rem, 3vw, 1.15rem);
        color: var(--text-main);
        max-width: 700px;
        margin: 0 auto 2.5rem auto;
        line-height: 1.6;
    }

    .demo-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }

    .stats-section {
        margin-top: 5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stats-section h2 {
        font-family: var(--font-heading);
        font-size: clamp(2rem, 6vw, 3.5rem);
        color: var(--primary);
        margin-bottom: 0.5rem;
    }

    .stats-subtitle {
        color: var(--accent-teal);
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
        background: var(--card-bg);
        border: 1px solid var(--soft-gray);
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
        border-color: var(--accent-amber);
    }

    .stat-number {
        font-family: var(--font-heading);
        font-size: 4rem;
        color: var(--primary);
        line-height: 1;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        font-weight: 500;
        color: var(--text-main);
        font-size: 1.1rem;
    }

    .stats-disclaimer {
        font-size: 0.85rem;
        color: var(--text-main);
        opacity: 0.8;
        max-width: 700px;
        line-height: 1.5;
        font-style: italic;
        margin-top: 1rem;
    }
</style>
