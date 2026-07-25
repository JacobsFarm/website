<script>
    /**
     * Gedeelde opmaak voor een mediakaart: tekstkolom naast een visuele kolom.
     * De inhoud van de visuele kolom wordt als `visual` snippet doorgegeven,
     * zodat MediaCardPicture en MediaCardGif dezelfde layout kunnen hergebruiken.
     */
    let {
        title,
        desc,
        reverse = false,
        label = 'Media carousel',
        visual,
        onmouseenter,
        onmouseleave
    } = $props();
</script>

<div class="media-card" class:reverse role="region" aria-label={label} {onmouseenter} {onmouseleave}>
    <div class="media-text">
        <h3>{title}</h3>
        <p>{desc}</p>
    </div>
    <div class="media-visual">
        <div class="carousel-container">
            {@render visual()}
        </div>
    </div>
</div>

<style>
    .media-card {
        display: flex;
        align-items: center;
        background: var(--card-bg);
        border-radius: var(--radius);
        overflow: hidden;
        box-shadow: var(--shadow-md);
    }

    .media-card.reverse {
        flex-direction: row-reverse;
    }

    .media-text {
        flex: 1;
        padding: 40px;
    }

    .media-text h3 {
        font-size: 1.8rem;
        color: var(--primary);
        margin-top: 0;
        margin-bottom: 15px;
    }

    .media-visual {
        flex: 1;
        display: flex;
        width: 100%;
        position: relative;
    }

    .carousel-container {
        width: 100%;
        height: 100%;
        min-height: 300px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .media-card,
        .media-card.reverse {
            flex-direction: column;
        }
        .media-visual {
            width: 100%;
        }
        .media-text {
            padding: 25px;
        }
        .carousel-container {
            min-height: 250px;
        }
    }
</style>
