<script>
    /**
     * Uitgelicht tekstblok met optionele actieknoppen.
     *
     * @property {string}  title   - Kop boven het blok (optioneel).
     * @property {'default'|'large'} size - `large` geeft het bredere CTA-formaat.
     * @property {Array<{text: string, href: string, variant?: string}>} actions
     *           Knoppen onder de tekst. `variant` is een .btn-modifier zonder
     *           prefix, bijv. 'solid' of 'outline'.
     */
    let { title = '', size = 'default', actions = [], children } = $props();
</script>

<section class="highlight-block" class:large={size === 'large'}>
    {#if title}
        <h2>{title}</h2>
    {/if}

    <div class="content">
        {@render children?.()}
    </div>

    {#if actions.length > 0}
        <div class="actions">
            {#each actions as action}
                <a href={action.href} class="btn btn--pill btn--{action.variant ?? 'solid'}">
                    {action.text}
                </a>
            {/each}
        </div>
    {/if}
</section>

<style>
    .highlight-block {
        max-width: 800px;
        margin: 0 auto 60px;
        text-align: center;
        background: var(--card-bg);
        padding: 30px;
        border-radius: var(--radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border-left: 5px solid var(--accent-amber);
        box-sizing: border-box;
    }

    .highlight-block.large {
        max-width: none;
        width: 100%;
        margin: 4rem 0;
        padding: 3rem 2rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        border-left-width: 8px;
    }

    h2 {
        color: var(--primary);
        font-size: 2rem;
        margin-top: 0;
        font-family: var(--font-heading);
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .large h2 {
        font-size: clamp(2.2rem, 6vw, 3rem);
        margin-bottom: 2rem;
    }

    .content :global(p) {
        color: var(--text-main);
        line-height: 1.6;
        font-family: var(--font-body);
    }

    .large .content :global(p) {
        line-height: 1.7;
        margin-bottom: 1.2rem;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2.5rem;
    }

    .actions :global(.btn) {
        min-width: 250px;
    }
</style>
