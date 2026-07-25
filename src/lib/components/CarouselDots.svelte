<script>
    /** Navigatiestipjes onder een carousel. */
    let { count, current, onSelect, label = 'Selection', itemLabel = 'item' } = $props();
</script>

<div class="carousel-dots" role="tablist" aria-label={label}>
    {#each { length: count } as _, index}
        <button
            class="dot"
            class:active={index === current}
            onclick={() => onSelect(index)}
            role="tab"
            aria-selected={index === current}
            aria-label="Go to {itemLabel} {index + 1}"
        ></button>
    {/each}
</div>

<style>
    .carousel-dots {
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        background: rgba(0, 0, 0, 0.3);
        padding: 8px 12px;
        border-radius: var(--radius-lg);
        z-index: 10;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        padding: 0;
        transition: all 0.3s ease;
        background-color: var(--text-main);
        opacity: 0.4;
    }

    .dot:hover {
        opacity: 0.8;
    }

    .dot.active {
        background-color: var(--accent-amber);
        opacity: 1;
        transform: scale(1.2);
    }
</style>
