<script>
    import ZoomableImage from '$lib/components/ZoomableImage.svelte';

    /**
     * Eén stap uit de installatiehandleiding: genummerde badge, titel, inhoud
     * (children) en optioneel een schermafbeelding met bijschrift.
     */
    let { number, title, image = null, imageAlt = '', caption = '', children } = $props();
</script>

<section class="step">
    <div class="step-head">
        <span class="step-num">{number}</span>
        <h3>{title}</h3>
    </div>

    <div class="step-body">
        {@render children()}

        {#if image}
            <figure class="step-figure">
                <ZoomableImage src={image} alt={imageAlt} class="step-figure-img" />
                {#if caption}
                    <figcaption>{caption}</figcaption>
                {/if}
            </figure>
        {/if}
    </div>
</section>

<style>
    .step {
        border: 1px solid var(--border-soft);
        border-left: 5px solid var(--primary);
        border-radius: var(--radius-sm);
        background: var(--bg-color);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .step-head {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .step-num {
        flex: 0 0 auto;
        width: 2.4rem;
        height: 2.4rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--primary);
        color: #ffffff;
        font-family: var(--font-heading);
        font-size: 1.3rem;
        line-height: 1;
    }

    /* De h3 uit .doc-section heeft een ruime bovenmarge; binnen de kop van een
       stap staat de titel naast de badge en is die marge ongewenst. */
    .step-head h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--primary);
    }

    /* De inhoud komt uit de bovenliggende pagina, dus :global is nodig om de
       eerste en laatste alinea van een stap netjes tegen de rand te zetten. */
    .step-body > :global(*:first-child) {
        margin-top: 0;
    }

    .step-body > :global(*:last-child) {
        margin-bottom: 0;
    }

    .step-figure {
        margin: 1.5rem 0 0;
    }

    .step-figure :global(.step-figure-img img) {
        border: 1px solid var(--soft-gray);
        border-radius: var(--radius-sm);
    }

    .step-figure figcaption {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.5;
        margin-top: 0.6rem;
        font-style: italic;
    }
</style>
