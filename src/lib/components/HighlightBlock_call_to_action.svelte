<script>
    export let title = "";
    export let btn1Text = "";
    export let btn1Link = "";
    export let btn2Text = "";
    export let btn2Link = "";
</script>

<section class="highlight-block-cta">
    {#if title}
        <h2>{title}</h2>
    {/if}
  
    <div class="content">
        <slot />
    </div>

    <div class="cta-buttons">
        <a href={btn1Link} class="cta-btn primary-btn">{btn1Text}</a>
        <a href={btn2Link} class="cta-btn secondary-btn">{btn2Text}</a>
    </div>
</section>

<style>
    .highlight-block-cta {
        width: 100%;
        box-sizing: border-box;
        margin: 4rem 0;
        text-align: center;
        background: #ffffff;
        padding: 3rem 2rem;
        border-radius: 20px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.03);
        border-left: 8px solid oklch(65% 0.16 75);
    }

    h2 {
        color: #386938;
        font-size: clamp(2.2rem, 6vw, 3rem);
        margin-top: 0;
        margin-bottom: 2rem;
        font-family: 'Bebas Kai', sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .content :global(p) {
        color: oklch(22% 0.02 145);
        line-height: 1.7;
        font-family: 'Roboto', sans-serif;
        margin-bottom: 1.2rem;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }

    .cta-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2.5rem;
    }

    .cta-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1.1rem 2.5rem;
        border-radius: 50px;
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.3rem;
        text-decoration: none;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        min-width: 250px;
    }

    .cta-btn.primary-btn {
        background-color: #386938;
        color: #ffffff;
        border: 2px solid #386938;
    }

    .cta-btn.primary-btn:hover {
        background-color: oklch(65% 0.16 75);
        border-color: oklch(65% 0.16 75);
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }

    .cta-btn.secondary-btn {
        background-color: transparent;
        color: #386938;
        border: 2px solid #386938;
    }

    .cta-btn.secondary-btn:hover {
        background-color: oklch(60% 0.09 195);
        color: #ffffff;
        border-color: oklch(60% 0.09 195);
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
</style>