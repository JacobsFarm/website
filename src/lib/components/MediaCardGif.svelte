<script>
    import { fade } from 'svelte/transition';
    import MediaCard from './MediaCard.svelte';
    import CarouselDots from './CarouselDots.svelte';

    let {
        title,
        desc,
        gifs = [],
        altText = 'Animated sequence',
        reverse = false
    } = $props();

    let currentIndex = $state(0);
    // Cache-buster: een nieuwe waarde dwingt de browser de GIF opnieuw te laden,
    // zodat de animatie weer vanaf het begin speelt.
    let timestamp = $state(Date.now());

    let hasMultipleGifs = $derived(gifs.length > 1);

    function restartGif() {
        timestamp = Date.now();
    }

    function goToGif(index) {
        currentIndex = index;
        restartGif();
    }
</script>

<MediaCard {title} {desc} {reverse} label="GIF carousel">
    {#snippet visual()}
        {#each gifs as gif, index}
            {#if index === currentIndex}
                <button
                    class="gif-button"
                    onmouseenter={restartGif}
                    onclick={restartGif}
                    aria-label="Restart detection animation"
                    transition:fade={{ duration: 400 }}
                >
                    <img
                        src="{gif}?t={timestamp}"
                        alt="{altText} - {index + 1}"
                        class="media-img"
                    />
                </button>
            {/if}
        {/each}

        {#if hasMultipleGifs}
            <CarouselDots
                count={gifs.length}
                current={currentIndex}
                onSelect={goToGif}
                label="GIF selection"
                itemLabel="GIF"
            />
        {/if}
    {/snippet}
</MediaCard>

<style>
    .gif-button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        display: flex;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        transition: opacity 0.2s ease;
    }

    .gif-button:active {
        opacity: 0.8;
    }

    .media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
</style>
