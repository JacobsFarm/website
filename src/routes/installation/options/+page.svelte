<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
</script>

<div class="container">
    <header class="page-header">
        <h1>{m.options_title()}</h1>
        <p class="intro-text">{m.options_intro()}</p>
    </header>

    <div class="content-wrapper">
        <section class="config-module">
            <h2>{m.opt_det_title()}</h2>
            <p class="module-desc">{m.opt_det_desc()}</p>
            <ul class="variable-list">
                <li><span class="var-name">source</span> <span class="var-desc">{m.opt_det_source()}</span></li>
                <li><span class="var-name">interval</span> <span class="var-desc">{m.opt_det_interval()}</span></li>
                <li><span class="var-name">frame_retention</span> <span class="var-desc">{m.opt_det_retention()}</span></li>
            </ul>
        </section>

        <section class="config-module">
            <h2>{m.opt_yolo_title()}</h2>
            <p class="module-desc">{m.opt_yolo_desc()}</p>
            <ul class="variable-list">
                <li><span class="var-name">model</span> <span class="var-desc">{m.opt_yolo_model()}</span></li>
                <li><span class="var-name">confidence</span> <span class="var-desc">{m.opt_yolo_conf()}</span></li>
                <li><span class="var-name">time_max</span> <span class="var-desc">{m.opt_yolo_timemax()}</span></li>
                <li><span class="var-name">timeout</span> <span class="var-desc">{m.opt_yolo_timeout()}</span></li>
                <li><span class="var-name">cooldown</span> <span class="var-desc">{m.opt_yolo_cooldown()}</span></li>
                <li><span class="var-name">include_trailing_time</span> <span class="var-desc">{m.opt_yolo_trailing()}</span></li>
                <li><span class="var-name">frames_min</span> <span class="var-desc">{m.opt_yolo_framesmin()}</span></li>
                <li><span class="var-name">imgsz</span> <span class="var-desc">{m.opt_yolo_imgsz()}</span></li>
                <li><span class="var-name">strategy</span> <span class="var-desc">{m.opt_yolo_strat()}</span></li>
            </ul>
        </section>

        <section class="config-module">
            <h2>{m.opt_vlm_title()}</h2>
            <p class="module-desc">{m.opt_vlm_desc()}</p>
            <ul class="variable-list">
                <li><span class="var-name">prompt</span> <span class="var-desc">{m.opt_vlm_prompt()}</span></li>
                <li><span class="var-name">model</span> <span class="var-desc">{m.opt_vlm_model()}</span></li>
                <li><span class="var-name">key</span> <span class="var-desc">{m.opt_vlm_key()}</span></li>
                <li><span class="var-name">url</span> <span class="var-desc">{m.opt_vlm_url()}</span></li>
                <li><span class="var-name">strategy</span> <span class="var-desc">{m.opt_vlm_strat()}</span></li>
            </ul>
        </section>

        <section class="config-module">
            <h2>{m.opt_exp_title()}</h2>
            <p class="module-desc">{m.opt_exp_desc()}</p>
            
            <h3 class="sub-module-title">Disk (Opslag)</h3>
            <ul class="variable-list">
                <li><span class="var-name">directory</span> <span class="var-desc">{m.opt_exp_disk_dir()}</span></li>
                <li><span class="var-name">strategy</span> <span class="var-desc">{m.opt_exp_disk_strat()}</span></li>
                <li><span class="var-name">confidence</span> <span class="var-desc">{m.opt_exp_disk_conf()}</span></li>
                <li><span class="var-name">export_rejected</span> <span class="var-desc">{m.opt_exp_disk_rej()}</span></li>
            </ul>

            <h3 class="sub-module-title" style="margin-top: 2.5rem;">Telegram</h3>
            <ul class="variable-list">
                <li><span class="var-name">token</span> <span class="var-desc">{m.opt_exp_tele_token()}</span></li>
                <li><span class="var-name">chat</span> <span class="var-desc">{m.opt_exp_tele_chat()}</span></li>
                <li><span class="var-name">confidence</span> <span class="var-desc">{m.opt_exp_tele_conf()}</span></li>
                <li><span class="var-name">alert_every</span> <span class="var-desc">{m.opt_exp_tele_alert()}</span></li>
                <li><span class="var-name">include_plot</span> <span class="var-desc">{m.opt_exp_tele_plot()}</span></li>
                <li><span class="var-name">include_crop</span> <span class="var-desc">{m.opt_exp_tele_crop()}</span></li>
                <li><span class="var-name">include_video</span> <span class="var-desc">{m.opt_exp_tele_vid()}</span></li>
                <li><span class="var-name">video_width</span> <span class="var-desc">{m.opt_exp_tele_width()}</span></li>
                <li><span class="var-name">video_crf</span> <span class="var-desc">{m.opt_exp_tele_crf()}</span></li>
                <li><span class="var-name">export_rejected</span> <span class="var-desc">{m.opt_exp_tele_rej()}</span></li>
            </ul>

            <h3 class="sub-module-title" style="margin-top: 2.5rem;">Webhook</h3>
            <ul class="variable-list">
                <li><span class="var-name">url</span> <span class="var-desc">{m.opt_exp_web_url()}</span></li>
                <li><span class="var-name">token</span> <span class="var-desc">{m.opt_exp_web_token()}</span></li>
                <li><span class="var-name">confidence</span> <span class="var-desc">{m.opt_exp_web_conf()}</span></li>
                <li><span class="var-name">data_type</span> <span class="var-desc">{m.opt_exp_web_type()}</span></li>
                <li><span class="var-name">data_max</span> <span class="var-desc">{m.opt_exp_web_max()}</span></li>
                <li><span class="var-name">include_plot</span> <span class="var-desc">{m.opt_exp_web_plot()}</span></li>
                <li><span class="var-name">include_crop</span> <span class="var-desc">{m.opt_exp_web_crop()}</span></li>
                <li><span class="var-name">include_video</span> <span class="var-desc">{m.opt_exp_web_vid()}</span></li>
                <li><span class="var-name">video_width</span> <span class="var-desc">{m.opt_exp_web_width()}</span></li>
                <li><span class="var-name">video_crf</span> <span class="var-desc">{m.opt_exp_web_crf()}</span></li>
                <li><span class="var-name">export_rejected</span> <span class="var-desc">{m.opt_exp_web_rej()}</span></li>
            </ul>
        </section>

        <section class="config-module">
            <h2>{m.opt_health_title()}</h2>
            <p class="module-desc">{m.opt_health_desc()}</p>
            <ul class="variable-list">
                <li><span class="var-name">url</span> <span class="var-desc">{m.opt_health_url()}</span></li>
                <li><span class="var-name">method</span> <span class="var-desc">{m.opt_health_method()}</span></li>
                <li><span class="var-name">interval</span> <span class="var-desc">{m.opt_health_interval()}</span></li>
                <li><span class="var-name">timeout</span> <span class="var-desc">{m.opt_health_timeout()}</span></li>
                <li><span class="var-name">headers</span> <span class="var-desc">{m.opt_health_headers()}</span></li>
                <li><span class="var-name">body</span> <span class="var-desc">{m.opt_health_body()}</span></li>
            </ul>
        </section>

        <section class="config-module">
            <h2>{m.opt_onnx_title()}</h2>
            <p class="module-desc">{m.opt_onnx_desc()}</p>
            <ul class="variable-list">
                <li><span class="var-name">provider</span> <span class="var-desc">{m.opt_onnx_provider()}</span></li>
                <li><span class="var-name">winml</span> <span class="var-desc">{m.opt_onnx_winml()}</span></li>
                <li><span class="var-name">opset</span> <span class="var-desc">{m.opt_onnx_opset()}</span></li>
            </ul>
        </section>
    </div>

    <div class="action-buttons">
        <a href="{base}/installation" class="btn secondary-btn">&larr; {m.options_btn_back()}</a>
    </div>

    <section class="github-section">
        <p>{m.options_github_text()}</p>
        <a href="https://github.com/ESchouten/ai-detector/tree/main" target="_blank" rel="noopener noreferrer" class="btn primary-btn github-btn">
            {m.options_github_btn()}
        </a>
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
        max-width: 1000px;
        margin: 0 auto;
        padding: 4rem 1rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    h1 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2.5rem, 6vw, 4rem);
        color: #386938;
        margin-top: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .intro-text {
        font-size: 1.2rem;
        color: #4DA699;
        font-weight: 500;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
    }

    /* --- Modules Layout --- */
    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .config-module {
        background: #ffffff;
        border: 1px solid #e0eee0;
        border-radius: 12px;
        padding: 2.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
        border-left: 5px solid #386938;
        transition: transform 0.2s;
    }

    .config-module:hover {
        transform: translateX(3px);
        border-left-color: #CCFF00;
    }

    .config-module h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 2.2rem;
        color: #386938;
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .sub-module-title {
        font-family: 'Bebas Kai', sans-serif;
        font-size: 1.5rem;
        color: #4DA699;
        margin-bottom: 1rem;
        border-bottom: 1px solid #e0eee0;
        padding-bottom: 0.5rem;
    }

    .module-desc {
        font-size: 1.1rem;
        color: #555;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    /* --- Variables List --- */
    .variable-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .variable-list li {
        background: #F9FBF9;
        padding: 1rem;
        border-radius: 8px;
        border: 1px dashed #cde0cd;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .var-name {
        font-family: monospace;
        font-weight: bold;
        color: #386938;
        font-size: 1.1rem;
        background: #eaf3ea;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        display: inline-block;
        align-self: flex-start;
    }

    .var-desc {
        color: #555;
        font-size: 1rem;
        line-height: 1.5;
    }

    @media (min-width: 768px) {
        .variable-list li {
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
        }
        .var-name {
            min-width: 220px;
            flex-shrink: 0;
            align-self: center;
        }
    }

    /* --- General Elements --- */
    .github-section {
        text-align: center;
        padding: 2.5rem;
        background: #eaf3ea;
        border-radius: 12px;
        border: 1px dashed #386938;
        margin-bottom: 3rem;
        margin-top: 3rem;
    }

    .github-section p {
        font-size: 1.1rem;
        color: #2c3e2c;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .github-btn {
        padding: 0.8rem 2rem;
        font-size: 1.1rem;
    }

    .action-buttons {
        display: flex;
        justify-content: flex-start;
        margin-top: 2rem;
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
        background: #CCFF00;
        color: #386938;
    }

    .primary-btn:hover {
        background: #b6e600;
    }

    .secondary-btn {
        background: #386938;
        color: #ffffff;
    }

    .secondary-btn:hover {
        background: #4DA699;
    }

    .official-links {
        text-align: center;
        font-size: 0.85rem;
        padding-top: 2rem;
        border-top: 1px solid #4DA699;
    }

    .official-links a {
        color: #386938;
        font-weight: bold;
        text-decoration: none;
    }

    .official-links a:hover {
        color: #CCFF00;
    }
</style>