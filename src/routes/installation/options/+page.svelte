<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';

    /**
     * De configuratiemodules van de AI-detector.
     * Elke module heeft één of meer groepen variabelen; een groep met een
     * `label` wordt als subkop weergegeven (zoals Disk / Telegram / Webhook).
     */
    const modules = [
        {
            title: m.opt_det_title,
            desc: m.opt_det_desc,
            groups: [
                {
                    vars: [
                        { name: 'source', desc: m.opt_det_source },
                        { name: 'interval', desc: m.opt_det_interval },
                        { name: 'frame_retention', desc: m.opt_det_retention }
                    ]
                }
            ]
        },
        {
            title: m.opt_yolo_title,
            desc: m.opt_yolo_desc,
            groups: [
                {
                    vars: [
                        { name: 'model', desc: m.opt_yolo_model },
                        { name: 'confidence', desc: m.opt_yolo_conf },
                        { name: 'time_max', desc: m.opt_yolo_timemax },
                        { name: 'timeout', desc: m.opt_yolo_timeout },
                        { name: 'cooldown', desc: m.opt_yolo_cooldown },
                        { name: 'include_trailing_time', desc: m.opt_yolo_trailing },
                        { name: 'frames_min', desc: m.opt_yolo_framesmin },
                        { name: 'imgsz', desc: m.opt_yolo_imgsz },
                        { name: 'strategy', desc: m.opt_yolo_strat }
                    ]
                }
            ]
        },
        {
            title: m.opt_vlm_title,
            desc: m.opt_vlm_desc,
            groups: [
                {
                    vars: [
                        { name: 'prompt', desc: m.opt_vlm_prompt },
                        { name: 'model', desc: m.opt_vlm_model },
                        { name: 'key', desc: m.opt_vlm_key },
                        { name: 'url', desc: m.opt_vlm_url },
                        { name: 'strategy', desc: m.opt_vlm_strat }
                    ]
                }
            ]
        },
        {
            title: m.opt_exp_title,
            desc: m.opt_exp_desc,
            groups: [
                {
                    label: 'Disk (Opslag)',
                    vars: [
                        { name: 'directory', desc: m.opt_exp_disk_dir },
                        { name: 'strategy', desc: m.opt_exp_disk_strat },
                        { name: 'confidence', desc: m.opt_exp_disk_conf },
                        { name: 'export_rejected', desc: m.opt_exp_disk_rej }
                    ]
                },
                {
                    label: 'Telegram',
                    vars: [
                        { name: 'token', desc: m.opt_exp_tele_token },
                        { name: 'chat', desc: m.opt_exp_tele_chat },
                        { name: 'confidence', desc: m.opt_exp_tele_conf },
                        { name: 'alert_every', desc: m.opt_exp_tele_alert },
                        { name: 'include_plot', desc: m.opt_exp_tele_plot },
                        { name: 'include_crop', desc: m.opt_exp_tele_crop },
                        { name: 'include_video', desc: m.opt_exp_tele_vid },
                        { name: 'video_width', desc: m.opt_exp_tele_width },
                        { name: 'video_crf', desc: m.opt_exp_tele_crf },
                        { name: 'export_rejected', desc: m.opt_exp_tele_rej }
                    ]
                },
                {
                    label: 'Webhook',
                    vars: [
                        { name: 'url', desc: m.opt_exp_web_url },
                        { name: 'token', desc: m.opt_exp_web_token },
                        { name: 'confidence', desc: m.opt_exp_web_conf },
                        { name: 'data_type', desc: m.opt_exp_web_type },
                        { name: 'data_max', desc: m.opt_exp_web_max },
                        { name: 'include_plot', desc: m.opt_exp_web_plot },
                        { name: 'include_crop', desc: m.opt_exp_web_crop },
                        { name: 'include_video', desc: m.opt_exp_web_vid },
                        { name: 'video_width', desc: m.opt_exp_web_width },
                        { name: 'video_crf', desc: m.opt_exp_web_crf },
                        { name: 'export_rejected', desc: m.opt_exp_web_rej }
                    ]
                }
            ]
        },
        {
            title: m.opt_health_title,
            desc: m.opt_health_desc,
            groups: [
                {
                    vars: [
                        { name: 'url', desc: m.opt_health_url },
                        { name: 'method', desc: m.opt_health_method },
                        { name: 'interval', desc: m.opt_health_interval },
                        { name: 'timeout', desc: m.opt_health_timeout },
                        { name: 'headers', desc: m.opt_health_headers },
                        { name: 'body', desc: m.opt_health_body }
                    ]
                }
            ]
        },
        {
            title: m.opt_onnx_title,
            desc: m.opt_onnx_desc,
            groups: [
                {
                    vars: [
                        { name: 'provider', desc: m.opt_onnx_provider },
                        { name: 'winml', desc: m.opt_onnx_winml },
                        { name: 'opset', desc: m.opt_onnx_opset }
                    ]
                }
            ]
        }
    ];
</script>

<div class="container">
    <header class="page-header">
        <h1>{m.options_title()}</h1>
        <p class="intro-text">{m.options_intro()}</p>
    </header>

    <div class="content-wrapper">
        {#each modules as module}
            <section class="config-module">
                <h2>{module.title()}</h2>
                <p class="module-desc">{module.desc()}</p>

                {#each module.groups as group, groupIndex}
                    {#if group.label}
                        <h3 class="sub-module-title" class:spaced={groupIndex > 0}>{group.label}</h3>
                    {/if}
                    <ul class="variable-list">
                        {#each group.vars as variable}
                            <li>
                                <span class="var-name">{variable.name}</span>
                                <span class="var-desc">{variable.desc()}</span>
                            </li>
                        {/each}
                    </ul>
                {/each}
            </section>
        {/each}
    </div>

    <div class="action-buttons">
        <a href="{base}/installation" class="btn btn--solid">&larr; {m.options_btn_back()}</a>
    </div>

    <section class="github-section">
        <p>{m.options_github_text()}</p>
        <a
            href="https://github.com/ESchouten/ai-detector/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--amber github-btn"
        >
            {m.options_github_btn()}
        </a>
    </section>

    <footer class="official-links">
        <p>
            Part of the <a
                href="https://github.com/CowCatcherAI/CowCatcherAI"
                target="_blank"
                rel="noopener noreferrer">Official Open Source Project</a
            >
        </p>
    </footer>
</div>

<style>
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
        font-family: var(--font-heading);
        font-size: clamp(2.5rem, 6vw, 4rem);
        color: var(--primary);
        margin-top: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .intro-text {
        font-size: 1.2rem;
        color: var(--accent-teal);
        font-weight: 500;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
    }

    /* --- Modules --- */
    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .config-module {
        background: var(--card-bg);
        border: 1px solid var(--border-soft);
        border-radius: var(--radius);
        padding: 2.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
        border-left: 5px solid var(--primary);
        transition: transform 0.2s, border-left-color 0.2s;
    }

    .config-module:hover {
        transform: translateX(3px);
        border-left-color: var(--accent-amber);
    }

    .config-module h2 {
        font-family: var(--font-heading);
        font-size: 2.2rem;
        color: var(--primary);
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    .sub-module-title {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        color: var(--accent-teal);
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-soft);
        padding-bottom: 0.5rem;
    }

    .sub-module-title.spaced {
        margin-top: 2.5rem;
    }

    .module-desc {
        font-size: 1.1rem;
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    /* --- Variabelenlijst --- */
    .variable-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    .variable-list li {
        background: var(--bg-color);
        padding: 1rem;
        border-radius: var(--radius-sm);
        border: 1px dashed #cde0cd;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .var-name {
        font-family: monospace;
        font-weight: bold;
        color: var(--primary);
        font-size: 1.1rem;
        background: var(--surface-tint);
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        display: inline-block;
        align-self: flex-start;
    }

    .var-desc {
        color: var(--text-muted);
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

    /* --- Overig --- */
    .github-section {
        text-align: center;
        padding: 2.5rem;
        background: var(--surface-tint);
        border-radius: var(--radius);
        border: 1px dashed var(--primary);
        margin: 3rem 0;
    }

    .github-section p {
        font-size: 1.1rem;
        color: var(--text-main);
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
</style>
