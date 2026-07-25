<script>
    import { fade } from 'svelte/transition';
    import MediaCard from './MediaCard.svelte';
    import CarouselDots from './CarouselDots.svelte';

    let {
        title,
        desc,
        images = [],
        altText = 'Media image sequence',
        reverse = false,
        autoPlayInterval = 5000
    } = $props();

    let currentIndex = $state(0);
    let isPaused = $state(false);

    let hasMultipleImages = $derived(images.length > 1);

    // Draait de afbeeldingen automatisch door, behalve als de muis erop staat.
    // De timer herstart vanzelf als de gebruiker handmatig navigeert, omdat
    // currentIndex een dependency van dit effect is.
    $effect(() => {
        if (!hasMultipleImages || isPaused) return;

        currentIndex;

        const id = setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
        }, autoPlayInterval);

        return () => clearTimeout(id);
    });
</script>

<MediaCard
    {title}
    {desc}
    {reverse}
    label="Image carousel"
    onmouseenter={() => (isPaused = true)}
    onmouseleave={() => (isPaused = false)}
>
    {#snippet visual()}
        {#each images as image, index}
            {#if index === currentIndex}
                <img
                    src={image}
                    alt="{altText} - {index + 1}"
                    class="media-img"
                    transition:fade={{ duration: 400 }}
                />
            {/if}
        {/each}

        {#if hasMultipleImages}
            <CarouselDots
                count={images.length}
                current={currentIndex}
                onSelect={(index) => (currentIndex = index)}
                label="Image selection"
                itemLabel="image"
            />
        {/if}
    {/snippet}
</MediaCard>

<style>
    .media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
    }
</style>
