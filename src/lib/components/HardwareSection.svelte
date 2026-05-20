<script>
    export let title = '';
    export let intro = '';
    export let options = [];
</script>

<div class="hardware-section">
    <h2 class="section-title">{title}</h2>
    
    {#if intro}
        <p class="section-intro">{intro}</p>
    {/if}

    <div class="options-container">
        {#each options as option}
            <div class="option-card">
                <div class="option-main">
                    {#if option.imageSrc}
                        <a href={option.imageLink || '#'} target="_blank" rel="noopener noreferrer" class="image-wrapper">
                            <img src={option.imageSrc} alt={option.imageAlt} />
                        </a>
                    {/if}
                    <div class="text-wrapper">
                        <h3>{option.title}</h3>
                        <p class="short-desc">{option.desc}</p>
                    </div>
                </div>

                {#if option.moreInfo || (option.links && option.links.length > 0)}
                    <details class="more-info-accordion">
                        <summary>More information</summary>
                        <div class="accordion-content">
                            {#if option.moreInfo}
                                <p class="more-text">{option.moreInfo}</p>
                            {/if}
                            
                            {#if option.links && option.links.length > 0}
                                <div class="linktree-container">
                                    {#each option.links as link}
                                        <a href={link.url} target="_blank" rel="external noopener noreferrer" data-sveltekit-reload class="linktree-btn">
                                            {#if link.icon}
                                                <span class="icon">{link.icon}</span>
                                            {/if}
                                            <span class="link-text">{link.text}</span>
                                        </a>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </details>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .hardware-section {
        background-color: #ffffff;
        border: 1px solid #e0eee0;
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
    }

    .section-title {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 2.2rem;
        color: #386938;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .section-intro {
        font-family: 'Roboto', sans-serif;
        font-size: 1.1rem;
        line-height: 1.6;
        color: #4DA699;
        margin-bottom: 2rem;
        font-weight: 500;
    }

    .options-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .option-card {
        border: 1px solid #e0eee0;
        border-radius: 8px;
        background-color: oklch(98% 0.005 145);
        overflow: hidden;
    }

    .option-main {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    .image-wrapper {
        flex: 0 0 200px;
        border-radius: 6px;
        overflow: hidden;
        transition: transform 0.2s ease-in-out;
    }

    .image-wrapper:hover {
        transform: scale(1.03);
    }

    .image-wrapper img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }

    .text-wrapper {
        flex: 1;
    }

    h3 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.6rem;
        color: #386938;
        margin-top: 0;
        margin-bottom: 0.5rem;
        letter-spacing: 0.5px;
    }

    .short-desc {
        font-family: 'Roboto', sans-serif;
        font-size: 1.05rem;
        line-height: 1.5;
        color: #333;
        margin: 0;
    }

    .more-info-accordion {
        border-top: 1px solid #e0eee0;
        background-color: #ffffff;
    }

    .more-info-accordion summary {
        padding: 1rem 1.5rem;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        color: #386938;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s;
    }

    .more-info-accordion summary:hover {
        background-color: oklch(97% 0.01 145);
    }

    .accordion-content {
        padding: 1.5rem;
        padding-top: 0.5rem;
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
    }

    .more-text {
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    .linktree-container {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        border-top: 1px dashed #e0eee0;
        padding-top: 1.5rem;
    }

    .linktree-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        background-color: #ffffff;
        border: 2px solid #386938;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        color: #386938;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.2s ease;
        width: 100%;
        box-sizing: border-box;
    }

    .linktree-btn:hover {
        background-color: #386938;
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(56, 105, 56, 0.2);
    }

    .icon {
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        .option-main {
            flex-direction: column;
            align-items: flex-start;
        }

        .image-wrapper {
            flex: auto;
            width: 100%;
            max-width: 100%;
        }
    }
</style>