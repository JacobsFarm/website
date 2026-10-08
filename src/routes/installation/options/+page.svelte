<script>
    import * as m from '$lib/paraglide/messages.js';
    import { links } from '$lib/config/links.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import DocLayout from '$lib/components/DocLayout.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';
    import Icon from '$lib/components/Icon.svelte';

    /**
     * De configuratiemodules van de AI-detector.
     * Elke module heeft één of meer groepen variabelen; een groep met een
     * `label` wordt als subkop weergegeven (zoals Disk / Telegram / Webhook).
     */
    /** @type {Array<{ title: () => string, desc: () => string, groups: Array<{ label?: string, vars: Array<{ name: string, desc: () => string }> }> }>} */
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

    const toc = modules.map((module, i) => ({ id: `module-${i + 1}`, label: stripNumber(module.title()) }));
</script>

<Seo title={m.options_title()} description={m.options_intro()} />

<PageHeader
    eyebrow="{m.step_label()} 3 · config.json"
    title={m.options_title()}
    lead={m.options_intro()}
    crumbs={[{ href: '/installation', label: m.nav_install() }]}
/>

<div class="container progress-wrap">
    <InstallProgress current={3} />
</div>

<DocLayout {toc}>
    {#each modules as module, i (module.title)}
        <section class="module" id="module-{i + 1}">
            <header class="module-head">
                <span class="module-num">0{i + 1}</span>
                <div>
                    <h2>{stripNumber(module.title())}</h2>
                    <p>{module.desc()}</p>
                </div>
            </header>

            {#each module.groups as group}
                {#if group.label}
                    <h3 class="group-label">{group.label}</h3>
                {/if}
                <dl class="vars">
                    {#each group.vars as variable (variable.name)}
                        <div class="var">
                            <dt><code>{variable.name}</code></dt>
                            <dd>{variable.desc()}</dd>
                        </div>
                    {/each}
                </dl>
            {/each}
        </section>
    {/each}

    <div class="github">
        <span class="github-icon"><Icon name="github" size={26} /></span>
        <p>{m.options_github_text()}</p>
        <a href={links.detectorConfig} target="_blank" rel="noopener noreferrer" class="btn btn--ink">
            {m.options_github_btn()}
            <span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
        </a>
    </div>

    <PagerNav
        prev={{ href: '/installation/download', label: stripNumber(m.install_card_software_title()), hint: `${m.step_label()} 2` }}
        next={{ href: '/installation', label: m.options_btn_back(), hint: m.nav_install() }}
    />
</DocLayout>

<style>
    .progress-wrap {
        margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }

    .module {
        margin: 0 0 1.25rem !important;
        padding: clamp(1.25rem, 3vw, 2rem);
        border-radius: var(--radius-lg);
        background: var(--card-bg);
        box-shadow:
            0 0 0 1px var(--line),
            var(--shadow-sm);
        scroll-margin-top: var(--nav-offset);
    }

    .module-head {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        padding-bottom: 1.25rem;
        margin-bottom: 0.5rem;
        border-bottom: 1px solid var(--line);
    }

    .module-num {
        flex-shrink: 0;
        font-family: var(--font-heading);
        font-size: 2.6rem;
        line-height: 0.85;
        color: var(--accent-amber);
    }

    .module-head h2 {
        margin: 0 0 0.5rem;
        font-size: clamp(1.8rem, 3.5vw, 2.3rem);
    }

    .module-head p {
        color: var(--text-muted);
    }

    .group-label {
        display: inline-block;
        margin: 1.75rem 0 0.25rem !important;
        padding: 0.2rem 0.6rem;
        border-radius: var(--radius-xs);
        background: var(--amber-soft);
        color: var(--amber-ink);
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .vars {
        margin: 0 !important;
    }

    .var {
        display: grid;
        gap: 0.35rem;
        padding: 0.95rem 0;
        border-bottom: 1px dashed var(--line-strong);
    }

    .var:last-child {
        border-bottom: 0;
        padding-bottom: 0;
    }

    .var dt code {
        font-weight: 600;
    }

    .var dd {
        margin: 0;
        color: var(--text-muted);
        font-size: 0.97rem;
    }

    @media (min-width: 720px) {
        .var {
            grid-template-columns: 12rem minmax(0, 1fr);
            gap: 1.5rem;
            align-items: baseline;
        }
    }

    .github {
        display: grid;
        gap: 1rem;
        justify-items: start;
        margin-top: 2.5rem !important;
        padding: clamp(1.5rem, 3vw, 2rem);
        border-radius: var(--radius-lg);
        background: var(--surface-tint);
        box-shadow: inset 0 0 0 1px var(--line);
    }

    .github-icon {
        display: grid;
        place-items: center;
        width: 3rem;
        height: 3rem;
        border-radius: var(--radius);
        background: var(--text-main);
        color: var(--bg-color);
    }
</style>
