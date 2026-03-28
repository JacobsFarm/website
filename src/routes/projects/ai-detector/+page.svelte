<script>
    import * as m from '$lib/paraglide/messages.js';

    // Core Assets
    import logo from '$lib/assets/Ai-detector-logo-800x800.jpg';
    import liveViewImg from '$lib/assets/ai_detector_live_view.png';
    import dashboardImg from '$lib/assets/ai_detector_home_page.png';

    // Media assets
    import imageDetectionImg from '$lib/assets/ai_detector_pictured_detection.jpg';
    
    // GIF logica
    import originalGif from '$lib/assets/ai_detector_video_detection.gif';
    let videoDetectionGif = originalGif;

    // Herlaadt de GIF zodat deze opnieuw start
    function restartGif() {
        videoDetectionGif = `${originalGif}?t=${new Date().getTime()}`;
    }
</script>

<main class="ai-detector-wrapper">
    <header class="hero">
        <img src={logo} alt="AI Detector Logo" class="hero-logo" />
        <div class="hero-text">
            <h1>{m.ai_detector_hero_title()}</h1>
            <p class="subtitle">{m.ai_detector_hero_subtitle()}</p>
            <div class="cta-buttons">
                <a href="https://github.com/ESchouten/ai-detector/releases" class="btn primary">{m.ai_detector_btn_download()}</a>
                <a href="https://github.com/ESchouten/ai-detector" class="btn secondary">{m.ai_detector_btn_github()}</a>
            </div>
        </div>
    </header>

    <section class="about-section">
        <div class="about-content">
            <h2>{m.ai_detector_about_title()}</h2>
            <p>{m.ai_detector_about_p1()}</p>
            <p>{m.ai_detector_about_p2()}</p>
        </div>
    </section>

    <section class="media-section">
        <h2 class="section-title">{m.ai_detector_media_title()}</h2>
        <div class="media-grid">
            <div class="media-card">
                <div class="media-text">
                    <h3>{m.ai_detector_image_title()}</h3>
                    <p>{m.ai_detector_image_desc()}</p>
                </div>
                <div class="media-visual">
                    <img src={imageDetectionImg} alt="Detection output example" class="media-img" />
                </div>
            </div>

            <div class="media-card reverse">
                <div class="media-text">
                    <h3>{m.ai_detector_video_title()}</h3>
                    <p>{m.ai_detector_video_desc()}</p>
                </div>
                <div class="media-visual">
                    <button 
                        class="gif-button" 
                        on:mouseenter={restartGif}
                        on:click={restartGif}
                        aria-label="Restart detection animation"
                    >
                        <img 
                            src={videoDetectionGif} 
                            alt="Animated detection sequence" 
                            class="media-img interactive-gif" 
                        />
                    </button>
                </div>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="feature-card">
            <h2>{m.ai_detector_feature_local_title()}</h2>
            <p>{m.ai_detector_feature_local_desc()}</p>
        </div>
        <div class="feature-card">
            <h2>{m.ai_detector_feature_network_title()}</h2>
            <p>{m.ai_detector_feature_network_desc()}</p>
        </div>
        <div class="feature-card">
            <h2>{m.ai_detector_feature_custom_title()}</h2>
            <p>{m.ai_detector_feature_custom_desc()}</p>
        </div>
    </section>

    <section class="how-it-works">
        <h2 class="section-title">{m.ai_detector_how_title()}</h2>
        <div class="split-layout">
            <div class="text-content">
                <h3>{m.ai_detector_step_1_title()}</h3>
                <p>{m.ai_detector_step_1_desc()}</p>
                
                <h3>{m.ai_detector_step_2_title()}</h3>
                <p>{m.ai_detector_step_2_desc()}</p>

                <h3>{m.ai_detector_step_3_title()}</h3>
                <p>{m.ai_detector_step_3_desc()}</p>
            </div>
            <div class="image-content">
                <img src={liveViewImg} alt="Live View Dashboard" class="screenshot" />
                <img src={dashboardImg} alt="Home Page Dashboard" class="screenshot" />
            </div>
        </div>
    </section>

    <section class="installation">
        <h2 class="section-title">{m.ai_detector_install_title()}</h2>
        <p class="center-text">{m.ai_detector_install_desc()}</p>
        <div class="install-options">
            <div class="install-card">
                <h3>{m.ai_detector_install_win_title()}</h3>
                <p>{m.ai_detector_install_win_desc()}</p>
            </div>
            <div class="install-card">
                <h3>{m.ai_detector_install_docker_title()}</h3>
                <p>{m.ai_detector_install_docker_desc()}</p>
            </div>
        </div>
    </section>
</main>

<style>
    :root {
        --primary: #386938; /* Emerald Green */
        --primary-hover: oklch(28% 0.05 145);
        --accent: oklch(65% 0.16 75); /* Deep Amber */
        --text-main: oklch(22% 0.02 145); /* Deep Ink */
        --bg-color: oklch(98% 0.005 145); /* Off White */
        --card-bg: #ffffff;
    }

    .ai-detector-wrapper {
        font-family: 'Roboto', sans-serif;
        color: var(--text-main);
        background-color: var(--bg-color);
        line-height: 1.6;
        padding: 0 20px 60px;
    }

    h1, h2, h3, .btn {
        font-family: 'Bebas Kai', sans-serif;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .section-title {
        font-size: 2.5rem;
        text-align: center;
        color: var(--primary);
        margin-bottom: 40px;
    }

    .center-text {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 30px;
    }

    /* Hero Section */
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 60px 0 40px;
    }

    .hero-logo {
        max-width: 250px;
        border-radius: 20px;
        margin-bottom: 20px;
    }

    .hero h1 {
        font-size: 3.5rem;
        color: var(--primary);
        margin: 0;
    }

    .subtitle {
        font-size: 1.2rem;
        max-width: 600px;
        margin: 10px auto 30px;
        font-weight: 500;
    }

    /* Buttons */
    .cta-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
    }

    .btn {
        padding: 12px 24px;
        font-size: 1.2rem;
        text-decoration: none;
        border-radius: 6px;
        transition: background 0.2s ease;
    }

    .btn.primary {
        background-color: var(--primary);
        color: white;
    }

    .btn.primary:hover {
        background-color: var(--primary-hover);
    }

    .btn.secondary {
        background-color: transparent;
        border: 2px solid var(--primary);
        color: var(--primary);
    }

    .btn.secondary:hover {
        background-color: var(--primary);
        color: white;
    }

    /* About Section */
    .about-section {
        max-width: 800px;
        margin: 0 auto 60px;
        text-align: center;
        background: var(--card-bg);
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        border-left: 5px solid var(--accent);
    }

    .about-section h2 {
        color: var(--primary);
        font-size: 2rem;
        margin-top: 0;
    }

    /* Media Cards (Double Section) */
    .media-section {
        max-width: 1000px;
        margin: 60px auto;
    }

    .media-grid {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .media-card {
        display: flex;
        align-items: center;
        background: var(--card-bg);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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
    }

    /* GIF Button reset styles */
    .gif-button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        display: flex;
        cursor: pointer;
    }

    .media-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        min-height: 300px;
        display: block;
    }

    /* Interactieve GIF CSS */
    .interactive-gif {
        transition: opacity 0.2s ease;
    }

    .gif-button:active .interactive-gif {
        opacity: 0.8;
    }

    /* Features Grid */
    .features, .install-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        max-width: 1000px;
        margin: 60px auto;
    }

    .feature-card, .install-card {
        background: var(--card-bg);
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-top: 4px solid var(--primary);
    }

    .feature-card h2, .install-card h3 {
        color: var(--primary);
        margin-top: 0;
        font-size: 1.8rem;
    }

    /* Split Layout for How it Works */
    .how-it-works, .installation {
        max-width: 1000px;
        margin: 60px auto;
    }

    .split-layout {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        align-items: center;
    }

    .text-content {
        flex: 1;
        min-width: 300px;
    }

    .text-content h3 {
        font-size: 1.5rem;
        color: var(--accent);
        margin-bottom: 5px;
    }

    .image-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 300px;
    }

    .screenshot {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .hero h1 { font-size: 2.5rem; }
        .cta-buttons { flex-direction: column; }
        .media-card, .media-card.reverse { flex-direction: column; }
        .media-visual { width: 100%; }
        .media-text { padding: 25px; }
    }
</style>