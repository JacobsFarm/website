<script module>
    import * as m from '$lib/paraglide/messages.js';

    /**
     * Inhoudsopgave-items voor de gedeelde stappen, zodat elke platformpagina
     * dezelfde nummering gebruikt als de stappen zelf.
     * @param {number} start nummer van de eerste gedeelde stap
     */
    export function commonToc(start) {
        return [
            m.inst_cams_title,
            m.inst_setup_cams_title,
            m.inst_setup_det_title,
            m.inst_setup_start_title,
            m.inst_tele_title,
            m.inst_ai_title,
            m.inst_phone_title
        ].map((title, i) => ({ id: `step-${start + i}`, label: title() }));
    }
</script>

<script>
    import InstallStep from '$lib/components/InstallStep.svelte';
    import RtspUrlFinder from '$lib/components/RtspUrlFinder.svelte';
    import { links } from '$lib/config/links.js';

    import imgRtspEnable from '$lib/assets/installation_software_rtsp_enabling.jpg';
    import imgSetupCameras from '$lib/assets/app_setup_cameras.jpg';
    import imgAddCamera from '$lib/assets/app_add_camera.jpg';
    import imgSetupDetection from '$lib/assets/app_setup_detection.jpg';
    import imgSetupStart from '$lib/assets/app_setup_start.jpg';
    import imgTelegramToken from '$lib/assets/app_setup_telegram_token.jpg';
    import imgTelegramQr from '$lib/assets/app_setup_telegram_qr.jpg';
    import imgAiCheck from '$lib/assets/app_aicheck_connect.jpg';
    import imgDevices from '$lib/assets/app_devices.jpg';

    /**
     * De stappen na het installeren. Deze zijn op elk platform gelijk: zodra
     * AI Detector draait, gaat alles verder in de browser. Alleen downloaden
     * en installeren staan per platform op de pagina zelf.
     *
     * @property {number} start nummer van de eerste stap op deze pagina
     * @property children platform-specifieke tips, getoond vóór opslag en hulp
     */
    /** @type {{ start?: number, children?: import('svelte').Snippet }} */
    let { start = 3, children } = $props();
</script>

<InstallStep
    number={start}
    title={m.inst_cams_title()}
    image={imgRtspEnable}
    imageAlt="Enabling the RTSP toggle in the Reolink camera app"
    caption={m.inst_cams_rtsp_enable_caption()}
>
    <p>{m.inst_cams_intro()}</p>

    <h4>{m.inst_cams_brands_title()}</h4>
    <ul class="plain-list">
        <li>{@html m.inst_cams_reolink()}</li>
        <li>{@html m.inst_cams_hikvision()}</li>
        <li>{@html m.inst_cams_others()}</li>
    </ul>
</InstallStep>

<InstallStep
    number={start + 1}
    title={m.inst_setup_cams_title()}
    images={[
        { src: imgSetupCameras, alt: 'Setup step 1 of AI Detector: connect your cameras', caption: m.inst_setup_cams_caption() },
        { src: imgAddCamera, alt: 'Add cameras screen with the cameras found on the network', caption: m.inst_setup_cams_add_caption() }
    ]}
>
    <ol class="setup-steps">
        <li>{@html m.inst_setup_cams_1()}</li>
        <li>{m.inst_setup_cams_2()}</li>
        <li>{m.inst_setup_cams_3()}</li>
        <li>{@html m.inst_setup_cams_4()}</li>
        <li>{@html m.inst_setup_cams_5()}</li>
    </ol>
    <p class="note">{@html m.inst_setup_existing()}</p>

    <h4>{m.inst_stream_urls_title()}</h4>
    <p class="note">{@html m.inst_stream_urls_note()}</p>
    <RtspUrlFinder />
</InstallStep>

<InstallStep
    number={start + 2}
    title={m.inst_setup_det_title()}
    image={imgSetupDetection}
    imageAlt="Setup step 2 of AI Detector: choose a preset"
    caption={m.inst_setup_det_caption()}
>
    <p>{@html m.inst_setup_det_intro()}</p>
    <ul class="plain-list">
        <li>{@html m.inst_preset_cc()}</li>
        <li>{@html m.inst_preset_calv()}</li>
        <li>{@html m.inst_preset_tailup()}</li>
        <li>{@html m.inst_preset_general()}</li>
    </ul>
    <ol class="setup-steps">
        <li>{m.inst_setup_det_1()}</li>
        <li>{m.inst_setup_det_2()}</li>
        <li>{@html m.inst_setup_det_3()}</li>
    </ol>
</InstallStep>

<InstallStep
    number={start + 3}
    title={m.inst_setup_start_title()}
    image={imgSetupStart}
    imageAlt="Setup step 3 of AI Detector: start monitoring"
    caption={m.inst_setup_start_caption()}
>
    <ol class="setup-steps">
        <li>{@html m.inst_setup_start_1()}</li>
        <li>{m.inst_setup_start_2()}</li>
        <li>{@html m.inst_setup_start_3()}</li>
        <li>{m.inst_setup_start_4()}</li>
    </ol>
</InstallStep>

<InstallStep
    number={start + 4}
    title={m.inst_tele_title()}
    images={[
        { src: imgTelegramToken, alt: 'Connect Telegram dialog with the BotFather instructions', caption: m.inst_tele_caption_token() },
        { src: imgTelegramQr, alt: 'Connect Telegram dialog with a QR code to scan', caption: m.inst_tele_caption_qr() }
    ]}
>
    <p>{m.inst_tele_intro()}</p>

    <ol class="setup-steps">
        <li>{@html m.inst_tele_1()}</li>
        <li>{@html m.inst_tele_2()}</li>
        <li>{@html m.inst_tele_3()}</li>
        <li>{@html m.inst_tele_4()}</li>
        <li>{@html m.inst_tele_5()}</li>
    </ol>

    <h4>{m.inst_tele_review_title()}</h4>
    <p>{m.inst_tele_review_text()}</p>

    <h4>{m.inst_tele_groups_title()}</h4>
    <p>{@html m.inst_tele_groups_text()}</p>
</InstallStep>

<InstallStep
    number={start + 5}
    title={m.inst_ai_title()}
    image={imgAiCheck}
    imageAlt="Connect validator screen to link Google Gemini"
    caption={m.inst_ai_caption()}
>
    <p>{m.inst_ai_intro()}</p>
    <ol class="setup-steps">
        <li>{@html m.inst_ai_1()}</li>
        <li>{@html m.inst_ai_2()}</li>
        <li>{@html m.inst_ai_3()}</li>
        <li>{m.inst_ai_4()}</li>
    </ol>
    <p class="note">{@html m.inst_ai_note()}</p>
</InstallStep>

<InstallStep
    number={start + 6}
    title={m.inst_phone_title()}
    image={imgDevices}
    imageAlt="Devices page of AI Detector with the connected browsers"
    caption={m.inst_phone_caption()}
>
    <p>{m.inst_phone_intro()}</p>
    <ol class="setup-steps">
        <li>{@html m.inst_phone_1()}</li>
        <li>{@html m.inst_phone_2()}</li>
        <li>{@html m.inst_phone_3()}</li>
        <li>{@html m.inst_phone_4()}</li>
    </ol>
    <p class="note">{m.inst_phone_note()}</p>
</InstallStep>

{@render children?.()}

<section class="extra" id="storage">
    <h3>{m.inst_storage_title()}</h3>
    <p>{m.inst_storage_text()}</p>
    <div class="table-container">
        <table>
            <tbody>
                <tr>
                    <th>{m.inst_storage_win()}</th>
                    <td><code>%LOCALAPPDATA%\AI Detector</code></td>
                </tr>
                <tr>
                    <th>{m.inst_storage_mac()}</th>
                    <td><code>~/Library/Application Support/AI Detector</code></td>
                </tr>
                <tr>
                    <th>{m.inst_storage_linux()}</th>
                    <td><code>~/.local/share/ai-detector</code></td>
                </tr>
                <tr>
                    <th>{m.inst_storage_docker()}</th>
                    <td>{m.inst_storage_docker_path()}</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<section class="extra support" id="support">
    <h3>{m.inst_support_title()}</h3>
    <ul class="plain-list">
        <li>{@html m.inst_support_diag()}</li>
        <li>{@html m.inst_support_youtube()}</li>
        <li>
            {@html m.inst_support_email()}
            <a href="mailto:{links.email}" class="text-link">{links.email}</a>
        </li>
        <li>{@html m.inst_support_community()}</li>
    </ul>
</section>

<style>
    .plain-list {
        list-style: none;
        padding-left: 0 !important;
        display: grid;
        gap: 0.75rem;
    }

    .plain-list li {
        margin: 0 !important;
        padding-left: 1.1rem;
        border-left: 2px solid var(--primary-soft);
    }

    .extra {
        margin-top: 2.5rem !important;
        scroll-margin-top: var(--nav-offset);
    }

    .extra h3 {
        margin-top: 0;
        font-family: var(--font-heading);
        font-weight: 400;
        font-size: 2rem;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        line-height: 1;
    }

    .extra > * + * {
        margin-top: 1rem;
    }

    .extra th {
        white-space: nowrap;
    }

    .support {
        padding: clamp(1.25rem, 3vw, 2rem);
        border-radius: var(--radius-lg);
        background: var(--surface-tint);
        box-shadow: inset 0 0 0 1px var(--line);
    }
</style>
