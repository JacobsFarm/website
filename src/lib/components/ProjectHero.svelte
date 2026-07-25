<script>
    /** Kopblok van een projectdetailpagina: logo, titel, ondertitel en intro. */
    let { logo, logoAlt, title, subtitle = '', description = '' } = $props();
</script>

<header class="hero">
    <img src={logo} alt={logoAlt} class="hero-logo" />
    <div class="hero-text">
        <h1>{title}</h1>
        {#if subtitle}
            <p class="subtitle"><strong>{subtitle}</strong></p>
        {/if}
        {#if description}
            <p class="hero-desc">{description}</p>
        {/if}
    </div>
</header>

<style>
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 3rem;
        padding: 4rem 2rem 3rem;
        background-color: var(--card-bg);
        border-radius: var(--radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border-bottom: 5px solid var(--accent-amber);
    }

    .hero-logo {
        max-width: 250px;
        border-radius: var(--radius-lg);
        margin-bottom: 20px;
    }

    h1 {
        font-family: var(--font-heading);
        color: var(--primary);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: normal;
        font-size: 3.5rem;
        margin: 0;
    }

    .subtitle {
        color: var(--accent-teal);
        font-size: 1.3rem;
        margin-top: 5px;
    }

    .hero-desc {
        font-size: 1.1rem;
        max-width: 800px;
        margin: 1.5rem auto 0;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }
    }
</style>
