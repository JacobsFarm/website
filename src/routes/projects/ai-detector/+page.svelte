<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import { reveal } from '$lib/actions/reveal.js';
    import { links } from '$lib/config/links.js';
    import { splitLabel } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import Gallery from '$lib/components/Gallery.svelte';
    import ZoomableImage from '$lib/components/ZoomableImage.svelte';
    import Icon from '$lib/components/Icon.svelte';

    import liveViewImg from '$lib/assets/ai_detector_live_view.png';
    import dashboardImg from '$lib/assets/ai_detector_home_page.png';
    import imageDetectionImg1 from '$lib/assets/ai_detector_pictured_detection.jpg';
    import imageDetectionImg2 from '$lib/assets/ai_detector_pictured_detection-2-896x512.jpg';
    import imageDetectionImg3 from '$lib/assets/ai_detector_pictured_detection-3-896x512.jpg';
    import imageDetectionImg4 from '$lib/assets/ai_detector_pictured_detection-4-896x512.jpg';
    import imageDetectionImg5 from '$lib/assets/ai_detector_pictured_detection-5-896x512.jpg';
    import originalGif from '$lib/assets/ai_detector_video_detection.gif';
    import originalGif2 from '$lib/assets/ai_detector_video_detection-2-896x512.gif';

    const pictures = [imageDetectionImg1, imageDetectionImg2, imageDetectionImg3, imageDetectionImg4, imageDetectionImg5].map(
        (src, i) => ({ src, alt: `Detection photo sent by the AI Detector, example ${i + 1}` })
    );

    const clips = [originalGif, originalGif2].map((src, i) => ({
        src,
        alt: `Short detection clip recorded by the AI Detector, example ${i + 1}`
    }));

    const features = [
        { icon: 'shield', title: m.ai_detector_feature_local_title, desc: m.ai_detector_feature_local_desc },
        { icon: 'phone', title: m.ai_detector_feature_network_title, desc: m.ai_detector_feature_network_desc },
        { icon: 'sliders', title: m.ai_detector_feature_custom_title, desc: m.ai_detector_feature_custom_desc }
    ];

    const steps = [
        { title: m.ai_detector_step_1_title, desc: m.ai_detector_step_1_desc },
        { title: m.ai_detector_step_2_title, desc: m.ai_detector_step_2_desc },
        { title: m.ai_detector_step_3_title, desc: m.ai_detector_step_3_desc }
    ].map((step) => ({ ...splitLabel(step.title()), desc: step.desc() }));
</script>

<Seo title={m.ai_detector_hero_title()} description={m.ai_detector_hero_subtitle()} />

<PageHeader eyebrow={m.home_tools_detector_tag()} title={m.ai_detector_hero_title()} lead={m.ai_detector_hero_subtitle()}>
    {#snippet actions()}
        <a href={links.detectorReleases} target="_blank" rel="noopener noreferrer" class="btn btn--solid btn--lg">
            <Icon name="download" size={18} />
            {m.ai_detector_btn_download()}
            <span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
        </a>
        <a href={links.detectorRepo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--lg">
            <Icon name="github" size={18} />
            {m.ai_detector_btn_github()}
        </a>
    {/snippet}

    {#snippet aside()}
        <div class="code-window" aria-label="Example config.json">
            <div class="code-bar">
                <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="file">config.json</span>
            </div>
            <pre><code><span class="p">{'{'}</span>
  <span class="k">"detectors"</span>: [{'{'}
    <span class="k">"detection"</span>: {'{'}
      <span class="k">"source"</span>: [<span class="s">"rtsp://…/sub"</span>]
    {'}'},
    <span class="k">"yolo"</span>: {'{'}
      <span class="k">"model"</span>: <span class="s">"cowcatcherV15.pt"</span>,
      <span class="k">"confidence"</span>: <span class="n">0.90</span>,
      <span class="k">"frames_min"</span>: <span class="n">4</span>
    {'}'},
    <span class="k">"exporters"</span>: {'{'}
      <span class="k">"telegram"</span>: [{'{'} <span class="k">"chat"</span>: <span class="s">"…"</span> {'}'}]
    {'}'}
  {'}'}]
<span class="p">{'}'}</span></code></pre>
        </div>
    {/snippet}
</PageHeader>

<!-- ── Wat het is ── -->
<section class="section about">
    <div class="container about-grid" use:reveal>
        <h2 class="h-section">{m.ai_detector_about_title()}</h2>
        <div class="about-text">
            <p class="about-lead">{m.ai_detector_about_p1()}</p>
            <p>{m.ai_detector_about_p2()}</p>
        </div>
    </div>
</section>

<!-- ── Foto's en video ── -->
<section class="section media-section">
    <div class="container">
        <header class="section-head" use:reveal>
            <span class="eyebrow">Telegram · Webhook · Disk</span>
            <h2 class="h-section">{m.ai_detector_media_title()}</h2>
        </header>

        <div class="media-row" use:reveal>
            <div class="media-copy">
                <span class="media-icon"><Icon name="eye" size={22} /></span>
                <h3>{m.ai_detector_image_title()}</h3>
                <p>{m.ai_detector_image_desc()}</p>
            </div>
            <Gallery items={pictures} label={m.ai_detector_image_title()} />
        </div>

        <div class="media-row media-row--reverse" use:reveal>
            <div class="media-copy">
                <span class="media-icon"><Icon name="play" size={18} /></span>
                <h3>{m.ai_detector_video_title()}</h3>
                <p>{m.ai_detector_video_desc()}</p>
            </div>
            <Gallery items={clips} interval={9000} label={m.ai_detector_video_title()} />
        </div>
    </div>
</section>

<!-- ── Kenmerken ── -->
<section class="section features-section">
    <div class="container">
        <ul class="features" use:reveal={{ stagger: 100 }}>
            {#each features as feature}
                <li>
                    <span class="f-icon"><Icon name={feature.icon} size={22} /></span>
                    <h3>{feature.title()}</h3>
                    <p>{feature.desc()}</p>
                </li>
            {/each}
        </ul>
    </div>
</section>

<!-- ── Hoe het werkt ── -->
<section class="section how">
    <div class="container how-grid">
        <div class="how-copy" use:reveal>
            <h2 class="h-section">{m.ai_detector_how_title()}</h2>
            <ol class="how-steps">
                {#each steps as step, i}
                    <li>
                        <span class="how-num">0{i + 1}</span>
                        <div>
                            <h3>{step.text || step.label}</h3>
                            <p>{step.desc}</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="how-media" use:reveal={{ stagger: 120 }}>
            <ZoomableImage src={liveViewImg} alt="AI Detector live view with camera streams" />
            <ZoomableImage src={dashboardImg} alt="AI Detector home page with recent detections" />
        </div>
    </div>
</section>

<!-- ── Installatie ── -->
<section class="section install">
    <div class="container">
        <header class="section-head" use:reveal>
            <h2 class="h-section">{m.ai_detector_install_title()}</h2>
            <p class="lead">{m.ai_detector_install_desc()}</p>
        </header>

        <div class="install-options" use:reveal={{ stagger: 100 }}>
            <a href="{base}/installation/download/Windows" class="install-option">
                <span class="io-icon"><Icon name="computer" size={24} /></span>
                <h3>{m.ai_detector_install_win_title()}</h3>
                <p>{m.ai_detector_install_win_desc()}</p>
                <span class="io-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
            </a>
            <a href="{base}/installation/download/docker" class="install-option">
                <span class="io-icon"><Icon name="code" size={24} /></span>
                <h3>{m.ai_detector_install_docker_title()}</h3>
                <p>{m.ai_detector_install_docker_desc()}</p>
                <span class="io-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
            </a>
        </div>

        <div class="install-cta" use:reveal>
            <a href="{base}/installation" class="btn btn--solid btn--lg">
                {m.front_page_intro_btn_install()}
                <span class="btn__icon"><Icon name="arrow-right" /></span>
            </a>
        </div>
    </div>
</section>

<style>
    /* ── Codevenster in de kop ── */
    .code-window {
        border-radius: var(--radius-lg);
        background: var(--forest);
        box-shadow:
            inset 0 0 0 1px var(--line-dark),
            var(--shadow-lg);
        overflow: hidden;
        transform: rotate(-1.2deg);
    }

    .code-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--line-dark);
    }

    .dots {
        display: inline-flex;
        gap: 0.4rem;
    }

    .dots i {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        background: oklch(100% 0 0 / 0.18);
    }

    .dots i:first-child {
        background: var(--accent-amber);
    }

    .file {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--on-dark-muted);
    }

    .code-window pre {
        margin: 0;
        padding: 1.25rem 1.25rem 1.5rem;
        overflow-x: auto;
        font-size: 0.82rem;
        line-height: 1.7;
        color: var(--on-dark);
    }

    .k {
        color: oklch(82% 0.08 145);
    }

    .s {
        color: oklch(82% 0.12 80);
    }

    .n {
        color: oklch(80% 0.09 195);
    }

    .p {
        color: var(--on-dark-muted);
    }

    /* ── Over ── */
    .about-grid {
        display: grid;
        gap: 2rem;
    }

    .about-text {
        display: grid;
        gap: 1.1rem;
        color: var(--text-muted);
        max-width: 62ch;
    }

    .about-lead {
        font-size: clamp(1.15rem, 1.8vw, 1.35rem);
        line-height: 1.55;
        color: var(--text-main);
    }

    @media (min-width: 960px) {
        .about-grid {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
            gap: 5rem;
        }
    }

    /* ── Media ── */
    .media-section {
        padding-top: 0;
    }

    .media-row {
        display: grid;
        gap: 2rem;
        align-items: center;
        padding-block: 2rem;
    }

    .media-copy {
        display: grid;
        gap: 0.85rem;
        justify-items: start;
    }

    .media-icon {
        display: grid;
        place-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: var(--radius);
        background: var(--amber-soft);
        color: var(--amber-ink);
    }

    .media-copy h3 {
        font-family: var(--font-heading);
        font-weight: 400;
        font-size: 2.3rem;
        line-height: 1;
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }

    .media-copy p {
        color: var(--text-muted);
        max-width: 54ch;
    }

    @media (min-width: 960px) {
        .media-row {
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
            gap: 4rem;
        }

        .media-row--reverse .media-copy {
            order: 2;
        }
    }

    /* ── Kenmerken ── */
    .features {
        display: grid;
        gap: 1px;
        margin: 0;
        padding: 0;
        list-style: none;
        border-radius: var(--radius-xl);
        overflow: hidden;
        background: var(--line);
        box-shadow: 0 0 0 1px var(--line);
    }

    .features li {
        display: grid;
        gap: 0.6rem;
        align-content: start;
        padding: clamp(1.5rem, 3vw, 2.25rem);
        background: var(--card-bg);
    }

    .f-icon {
        display: grid;
        place-items: center;
        width: 2.9rem;
        height: 2.9rem;
        margin-bottom: 0.4rem;
        border-radius: var(--radius-sm);
        background: var(--primary-soft);
        color: var(--primary);
    }

    .features h3 {
        font-size: 1.12rem;
    }

    .features p {
        color: var(--text-muted);
        font-size: 0.97rem;
    }

    @media (min-width: 900px) {
        .features {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    /* ── Hoe het werkt ── */
    .how-grid {
        display: grid;
        gap: 2.5rem;
        align-items: start;
    }

    .how-copy {
        display: grid;
        gap: 2rem;
    }

    .how-steps {
        display: grid;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .how-steps li {
        display: flex;
        gap: 1.25rem;
        align-items: flex-start;
    }

    .how-num {
        flex-shrink: 0;
        font-family: var(--font-heading);
        font-size: 2.6rem;
        line-height: 0.85;
        color: var(--accent-amber);
    }

    .how-steps h3 {
        font-size: 1.15rem;
        margin-bottom: 0.3rem;
    }

    .how-steps p {
        color: var(--text-muted);
    }

    .how-media {
        display: grid;
        gap: 1rem;
    }

    @media (min-width: 960px) {
        .how-grid {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
            gap: 4rem;
        }

        .how-copy {
            position: sticky;
            top: 7rem;
        }
    }

    /* ── Installatie ── */
    .install {
        padding-top: 0;
    }

    .install-options {
        display: grid;
        gap: 1rem;
    }

    .install-option {
        display: grid;
        gap: 0.75rem;
        align-content: start;
        justify-items: start;
        padding: clamp(1.5rem, 3vw, 2.25rem);
        border-radius: var(--radius-xl);
        background: var(--card-bg);
        box-shadow:
            0 0 0 1px var(--line),
            var(--shadow-sm);
        color: inherit;
        text-decoration: none;
        transition:
            transform var(--dur) var(--ease-spring),
            box-shadow var(--dur) var(--ease-spring);
    }

    .install-option:hover {
        transform: translateY(-4px);
        box-shadow:
            0 0 0 1px var(--primary),
            var(--shadow-hover);
    }

    .io-icon {
        display: grid;
        place-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: var(--radius);
        background: var(--primary-soft);
        color: var(--primary);
    }

    .install-option h3 {
        font-size: 1.25rem;
    }

    .install-option p {
        color: var(--text-muted);
    }

    .io-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--primary);
        font-weight: 600;
    }

    .install-cta {
        display: flex;
        justify-content: center;
        margin-top: 2.5rem;
    }

    @media (min-width: 800px) {
        .install-options {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>
