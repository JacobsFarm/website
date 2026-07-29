<script>
    import { browser } from '$app/environment';

    /**
     * Afbeelding die bij een klik vergroot wordt getoond in een lightbox
     * over de rest van de pagina. Sluit via klik, Escape of de kruisknop.
     */
    let { src, alt = '', class: className = '' } = $props();

    let open = $state(false);

    function show() {
        open = true;
    }

    function hide() {
        open = false;
    }

    function handleKeydown(event) {
        if (open && event.key === 'Escape') hide();
    }

    $effect(() => {
        if (!browser) return;
        document.body.style.overflow = open ? 'hidden' : '';
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<button type="button" class="zoom-trigger {className}" onclick={show} aria-label="Enlarge image">
    <img {src} {alt} loading="lazy" />
</button>

{#if open}
    <div class="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={alt}>
        <button type="button" class="lightbox-close" onclick={hide} aria-label="Close">
            &times;
        </button>
        <button type="button" class="lightbox-panel" onclick={hide} aria-label="Close">
            <img {src} {alt} class="lightbox-img" />
        </button>
    </div>
{/if}

<style>
    .zoom-trigger {
        display: block;
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        cursor: zoom-in;
        font: inherit;
        color: inherit;
    }

    .zoom-trigger img {
        width: 100%;
        height: auto;
        display: block;
    }

    .lightbox-backdrop {
        position: fixed;
        inset: 0;
        background: oklch(15% 0.02 145 / 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 3rem 1.5rem;
        backdrop-filter: blur(2px);
    }

    .lightbox-panel {
        border: none;
        background: none;
        padding: 0;
        cursor: zoom-out;
        max-width: 100%;
        max-height: 100%;
        display: flex;
    }

    .lightbox-img {
        max-width: 100%;
        max-height: calc(100vh - 6rem);
        width: auto;
        height: auto;
        border-radius: var(--radius-sm);
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4);
        display: block;
    }

    .lightbox-close {
        position: fixed;
        top: 1.25rem;
        right: 1.5rem;
        width: 2.75rem;
        height: 2.75rem;
        border: none;
        border-radius: 50%;
        background: oklch(100% 0 0 / 0.15);
        color: #ffffff;
        font-size: 1.8rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
    }

    .lightbox-close:hover {
        background: oklch(100% 0 0 / 0.3);
    }
</style>
