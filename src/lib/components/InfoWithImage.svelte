<script>
    import CarouselDots from './CarouselDots.svelte';

    let { title = '', images = [], reverse = false, children } = $props();

    let currentIndex = $state(0);
    let showNavigation = $derived(images.length > 1);
</script>

<section class="info-grid {reverse ? 'reverse' : ''}">
    <div class="content-col">
        {#if title}
            <h2>{title}</h2>
        {/if}
        <div class="custom-card">
            {#if children}
                {@render children()}
            {/if}
        </div>
    </div>
    
    <div class="image-col">
        <div class="slider-container">
            {#each images as img, i}
                <div class="slide {i === currentIndex ? 'active' : ''}">
                    <img src={img.src} alt={img.alt} class="img-fluid" />
                </div>
            {/each}
        </div>

        {#if showNavigation}
            <CarouselDots
                count={images.length}
                current={currentIndex}
                onSelect={(index) => (currentIndex = index)}
                label="Image selection"
                itemLabel="image"
            />
        {/if}
    </div>
</section>

<style>
    .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center; /* Garandeert verticale uitlijning */
        margin-bottom: 3rem;
    }

    /* Omdraaien van de kolommen als 'reverse' true is */
    .info-grid.reverse .content-col {
        order: 2;
    }
    .info-grid.reverse .image-col {
        order: 1;
    }

    h2 {
        font-family: var(--font-heading);
        color: var(--primary);
        font-size: 2rem;
        margin-top: 0;
        padding-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: normal;
    }

    /* De globale .custom-card heeft ondermarge; in deze grid-cel niet nodig. */
    .custom-card {
        margin-bottom: 0;
    }

    /* CSS voor de afbeeldingen-slider */
    .image-col {
        position: relative;
        border-radius: var(--radius);
        overflow: hidden;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .slider-container {
        display: flex;
        width: 100%;
    }

    .slide {
        display: none; 
        width: 100%;
        flex-shrink: 0;
    }

    .slide.active {
        display: block; 
    }

    .img-fluid {
        width: 100%;
        height: auto;
        display: block;
        border-radius: inherit;
    }

    /* Mobiele weergave */
    @media (max-width: 768px) {
        .info-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .info-grid.reverse .content-col { order: 1; }
        .info-grid.reverse .image-col { order: 2; }
    }
</style>