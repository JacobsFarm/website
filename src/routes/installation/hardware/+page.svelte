<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
</script>

<div class="container">
    <section class="content-section">
        <h1>{m.hardware_title()}</h1>
        <p class="intro-text">{m.hardware_intro()}</p>

        <div class="hardware-block">
            <h2>{m.hardware_cameras_title()}</h2>
            <p>{m.hardware_cameras_text()}</p>
        </div>

        <div class="hardware-block">
            <h2>{m.hardware_computer_title()}</h2>
            <p>{m.hardware_computer_text()}</p>
        </div>

        <div class="action-buttons">
            <a href="{base}/installation" class="btn secondary-btn">&larr; {m.hardware_btn_back()}</a>
            <a href="{base}/installation/options" class="btn primary-btn">{m.hardware_btn_next()} &rarr;</a>
        </div>
    </section>

    <footer class="official-links">
        <p>Part of the <a href="https://github.com/CowCatcherAI/CowCatcherAI" target="_blank" rel="noopener noreferrer">Official Open Source Project</a></p>
    </footer>
</div>

<style>
    :global(body) {
        background-color: #F9FBF9;
        font-family: 'Roboto', sans-serif;
        margin: 0;
        color: #333;
        overflow-x: hidden;
    }

    .container {
        max-width: 900px; /* Iets smaller voor een betere leesbaarheid van de tekst */
        margin: 0 auto;
        padding: 4rem 1rem;
    }

    .content-section {
        background: #ffffff;
        border: 1px solid #e0eee0;
        border-radius: 16px;
        padding: 3rem 2.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        border-top: 5px solid #386938; /* Emerald Green accent */
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 6vw, 4rem);
        color: #386938;
        margin-top: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
        text-align: center;
    }

    .intro-text {
        font-size: 1.2rem;
        color: #4DA699; /* Soft Teal */
        text-align: center;
        margin-bottom: 3rem;
        font-weight: 500;
        line-height: 1.5;
    }

    .hardware-block {
        margin-bottom: 2.5rem;
    }

    .hardware-block h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 2rem;
        color: #386938;
        margin-bottom: 0.5rem;
    }

    .hardware-block p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #555;
        margin: 0;
    }

    /* --- Button Styles --- */
    .action-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 4rem;
        border-top: 1px solid #e0eee0;
        padding-top: 2rem;
    }

    .btn {
        display: inline-block;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-weight: bold;
        text-decoration: none;
        transition: background 0.2s, transform 0.2s;
        text-align: center;
    }

    .btn:hover {
        transform: translateY(-3px);
    }

    .primary-btn {
        background: #CCFF00; /* Electric Lime */
        color: #386938;
    }

    .primary-btn:hover {
        background: #b6e600;
    }

    .secondary-btn {
        background: #386938; /* Emerald Green */
        color: #ffffff;
    }

    .secondary-btn:hover {
        background: #4DA699; /* Soft Teal */
    }

    /* --- Footer Styles --- */
    .official-links {
        margin-top: 4rem;
        text-align: center;
        font-size: 0.85rem;
        padding-top: 2rem;
    }

    .official-links a {
        color: #386938;
        font-weight: bold;
        text-decoration: none;
    }

    .official-links a:hover {
        color: #CCFF00;
    }

    @media (max-width: 600px) {
        .action-buttons {
            flex-direction: column;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>