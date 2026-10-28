<script>
    import * as m from '$lib/paraglide/messages.js';
    import { links } from '$lib/config/links.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import DocLayout from '$lib/components/DocLayout.svelte';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';
    import Icon from '$lib/components/Icon.svelte';

    import imgRecordings from '$lib/assets/app_recordings.jpg';
    import imgViewer from '$lib/assets/app_recording_viewer.jpg';
    import imgCamerasLive from '$lib/assets/app_cameras_live.jpg';
    import imgCamerasHistory from '$lib/assets/app_cameras_history.jpg';
    import imgDetectors from '$lib/assets/app_detectors.jpg';
    import imgDetectorEdit from '$lib/assets/app_detector_edit.jpg';
    import imgStatus from '$lib/assets/app_status.jpg';
    import imgAlerts from '$lib/assets/app_alerts.jpg';
    import imgQuietHours from '$lib/assets/app_alerts_quiet_hours.jpg';
    import imgAiCheck from '$lib/assets/app_ai_check.jpg';
    import imgDevices from '$lib/assets/app_devices.jpg';
    import imgStorage from '$lib/assets/app_storage.jpg';
    import imgSettings from '$lib/assets/app_settings.jpg';

    /**
     * Rondleiding door de app, pagina voor pagina. Elke sectie heeft een
     * korte uitleg, de belangrijkste punten en de bijbehorende
     * schermafbeeldingen (gevoelige gegevens zijn daarin afgeschermd).
     */
    const sections = [
        {
            title: m.use_rec_title,
            desc: m.use_rec_desc,
            items: [m.use_rec_1, m.use_rec_2, m.use_rec_3, m.use_rec_4, m.use_rec_5],
            images: [
                { src: imgRecordings, alt: 'Recordings page of AI Detector', caption: m.use_rec_caption },
                { src: imgViewer, alt: 'Recording viewer with a detected mount', caption: m.use_rec_viewer_caption }
            ]
        },
        {
            title: m.use_cam_title,
            desc: m.use_cam_desc,
            items: [m.use_cam_1, m.use_cam_2, m.use_cam_3, m.use_cam_4],
            images: [
                { src: imgCamerasLive, alt: 'Cameras page with live pictures', caption: m.use_cam_caption },
                { src: imgCamerasHistory, alt: 'Camera history of the last 24 hours', caption: m.use_cam_history_caption }
            ]
        },
        {
            title: m.use_det_title,
            desc: m.use_det_desc,
            items: [m.use_det_1, m.use_det_2, m.use_det_3, m.use_det_4, m.use_det_5],
            images: [
                { src: imgDetectors, alt: 'Detectors page with three detectors', caption: m.use_det_caption },
                { src: imgDetectorEdit, alt: 'Editing a detector: preset and cameras', caption: m.use_det_edit_caption }
            ]
        },
        {
            title: m.use_status_title,
            desc: m.use_status_desc,
            items: [m.use_status_1, m.use_status_2, m.use_status_3, m.use_status_4],
            images: [{ src: imgStatus, alt: 'Monitoring status page', caption: m.use_status_caption }]
        },
        {
            title: m.use_alerts_title,
            desc: m.use_alerts_desc,
            items: [m.use_alerts_1, m.use_alerts_2, m.use_alerts_3, m.use_alerts_4],
            images: [
                { src: imgAlerts, alt: 'Alerts settings with Telegram recipients', caption: m.use_alerts_caption },
                { src: imgQuietHours, alt: 'Telegram recipient with quiet hours', caption: m.use_alerts_quiet_caption }
            ]
        },
        {
            title: m.use_ai_title,
            desc: m.use_ai_desc,
            items: [m.use_ai_1, m.use_ai_2, m.use_ai_3],
            images: [{ src: imgAiCheck, alt: 'AI check settings page', caption: m.use_ai_caption }]
        },
        {
            title: m.use_devices_title,
            desc: m.use_devices_desc,
            items: [m.use_devices_1, m.use_devices_2, m.use_devices_3],
            images: [{ src: imgDevices, alt: 'Devices settings page', caption: m.use_devices_caption }]
        },
        {
            title: m.use_storage_title,
            desc: m.use_storage_desc,
            items: [m.use_storage_1, m.use_storage_2, m.use_storage_3, m.use_storage_4],
            images: [
                { src: imgStorage, alt: 'Storage settings page', caption: m.use_storage_caption },
                { src: imgSettings, alt: 'Settings overview of AI Detector', caption: m.use_settings_caption }
            ]
        },
        {
            title: m.use_more_title,
            desc: m.use_more_desc,
            items: [m.use_more_1, m.use_more_2, m.use_more_3, m.use_more_4, m.use_more_5],
            images: []
        }
    ];

    const toc = sections.map((section, i) => ({ id: `step-${i + 1}`, label: section.title() }));
</script>

<Seo title={m.options_title()} description={m.options_intro()} />

<PageHeader
    eyebrow="{m.step_label()} 3"
    title={m.options_title()}
    lead={m.options_intro()}
    crumbs={[{ href: '/installation', label: m.nav_install() }]}
/>

<div class="container progress-wrap">
    <InstallProgress current={3} />
</div>

<DocLayout {toc}>
    {#each sections as section, i (section.title)}
        <InstallStep
            number={i + 1}
            title={section.title()}
            images={section.images.map((image) => ({ ...image, caption: image.caption() }))}
        >
            <p class="section-desc">{section.desc()}</p>
            <ul class="check-list">
                {#each section.items as item}
                    <li>{@html item()}</li>
                {/each}
            </ul>
        </InstallStep>
    {/each}

    <div class="github">
        <span class="github-icon"><Icon name="github" size={26} /></span>
        <p>{m.options_github_text()}</p>
        <a href={links.detectorRepo} target="_blank" rel="noopener noreferrer" class="btn btn--ink">
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

    .section-desc {
        color: var(--text-muted);
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
