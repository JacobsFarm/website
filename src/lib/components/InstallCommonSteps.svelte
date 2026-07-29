<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import RtspUrlFinder from '$lib/components/RtspUrlFinder.svelte';

    import imgRtspEnable from '$lib/assets/installation_software_rtsp_enabling.jpg';
    import imgAddStream from '$lib/assets/installation_software_add stream.jpg';
    import imgTelegram from '$lib/assets/installation_software_telegram_adding.jpg';
    import imgDetector from '$lib/assets/installation_software_step_7.jpg';
    import imgTerminal from '$lib/assets/installation_software_running_ai_detector_terminal.jpg';

    /**
     * Stappen 4 t/m 8 van de installatie. Deze zijn identiek voor Windows en
     * macOS: de webinterface en de AI-motor werken op beide systemen hetzelfde.
     * Alleen stap 1 t/m 3 (downloaden, uitpakken, beveiliging) staan per
     * platform op de pagina zelf.
     *
     * De schermafbeelding van de terminal komt van een Windows-pc; op andere
     * platformen laten we die weg en volstaat het voorbeeld in tekstvorm.
     */
    let { showTerminalImage = true } = $props();
</script>

<InstallStep
    number="4"
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

    <h4>{m.inst_cams_ip_title()}</h4>
    <p>{@html m.inst_cams_ip_text()}</p>

    <h4>{m.inst_cams_substream_title()}</h4>
    <p>{@html m.inst_cams_substream_text()}</p>
</InstallStep>

<InstallStep
    number="5"
    title={m.inst_stream_title()}
    image={imgAddStream}
    imageAlt="Add stream screen of the CowCatcher AI web interface"
    caption={m.inst_stream_caption()}
>
    <ol class="setup-steps">
        <li>{m.inst_stream_1()}</li>
        <li>{@html m.inst_stream_2()}</li>
        <li>{@html m.inst_stream_3()}</li>
        <li>{@html m.inst_stream_4()}</li>
        <li>{@html m.inst_stream_5()}</li>
        <li>{@html m.inst_stream_6()}</li>
        <li>{@html m.inst_stream_7()}</li>
    </ol>

    <h4>{m.inst_stream_urls_title()}</h4>
    <p class="note">{@html m.inst_stream_urls_note()}</p>
    <RtspUrlFinder />
</InstallStep>

<InstallStep
    number="6"
    title={m.inst_tele_title()}
    image={imgTelegram}
    imageAlt="Add Telegram notification screen of the CowCatcher AI web interface"
    caption={m.inst_tele_caption()}
>
    <p>{m.inst_tele_intro()}</p>

    <ol class="setup-steps">
        <li>{@html m.inst_tele_1()}</li>
        <li>{@html m.inst_tele_2()}</li>
        <li>{@html m.inst_tele_3()}</li>
        <li>{@html m.inst_tele_4()}</li>
        <li>{@html m.inst_tele_5()}</li>
    </ol>

    <h4>{m.inst_tele_groups_title()}</h4>
    <p>{@html m.inst_tele_groups_text()}</p>

    <h4>{m.inst_tele_webhook_title()}</h4>
    <p>{m.inst_tele_webhook_text()}</p>
</InstallStep>

<InstallStep
    number="7"
    title={m.inst_det_title()}
    image={imgDetector}
    imageAlt="Add detector screen of the CowCatcher AI web interface"
    caption={m.inst_det_caption()}
>
    <p>{@html m.inst_det_intro()}</p>

    <h4>{m.inst_det_cc_title()}</h4>
    <ol class="setup-steps">
        <li>{@html m.inst_det_cc_1()}</li>
        <li>{m.inst_det_cc_2()}</li>
        <li>{m.inst_det_cc_3()}</li>
        <li>{@html m.inst_det_cc_4()}</li>
    </ol>

    <h4>{m.inst_det_calv_title()}</h4>
    <ol class="setup-steps">
        <li>{@html m.inst_det_calv_1()}</li>
        <li>{m.inst_det_calv_2()}</li>
        <li>{@html m.inst_det_calv_3()}</li>
        <li>{@html m.inst_det_calv_4()}</li>
    </ol>

    <h4>{m.inst_det_conf_title()}</h4>
    <p>{m.inst_det_conf_intro()}</p>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>{m.inst_det_conf_th_value()}</th>
                    <th>{m.inst_det_conf_th_meaning()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>0.92</code></td>
                    <td>{m.inst_det_conf_092()}</td>
                </tr>
                <tr>
                    <td><code>0.90</code></td>
                    <td>{@html m.inst_det_conf_090()}</td>
                </tr>
                <tr>
                    <td><code>0.88</code></td>
                    <td>{m.inst_det_conf_088()}</td>
                </tr>
                <tr>
                    <td><code>0.85</code></td>
                    <td>{m.inst_det_conf_085()}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h4>{m.inst_det_advanced_title()}</h4>
    <p>{@html m.inst_det_advanced_text()}</p>
    <p>
        <a href="{base}/installation/options" class="text-link">{m.inst_det_options_link()} &rarr;</a>
    </p>
</InstallStep>

<InstallStep
    number="8"
    title={m.inst_start_title()}
    image={showTerminalImage ? imgTerminal : null}
    imageAlt="Terminal window with the detection log of the AI detector"
    caption={m.inst_start_caption()}
>
    <ol class="setup-steps">
        <li>{@html m.inst_start_1()}</li>
        <li>{@html m.inst_start_2()}</li>
        <li>{m.inst_start_3()}</li>
    </ol>

    <h4>{m.inst_start_log_title()}</h4>
    <p>{m.inst_start_log_text()}</p>
    <pre><code>aidetector.detection.detector - INFO - Detection time: 38ms for 1 frame(s). Avg: 38ms
aidetector.detection.detector - INFO - Detection time: 37ms for 1 frame(s). Avg: 37ms
aidetector.detection.detector - INFO - Checking for timeouts</code></pre>
</InstallStep>

<h3>{m.inst_storage_title()}</h3>
<p>{@html m.inst_storage_text()}</p>

<h3>{m.inst_support_title()}</h3>
<ul class="plain-list">
    <li>{@html m.inst_support_youtube()}</li>
    <li>
        {@html m.inst_support_email()}
        <a href="mailto:cowcatcherai@gmail.com" class="text-link">cowcatcherai@gmail.com</a>
    </li>
    <li>{@html m.inst_support_community()}</li>
</ul>

<style>
    /* Opsomming zonder bolletjes, met dezelfde regelafstand als .setup-steps. */
    .plain-list {
        list-style: none;
        padding-left: 0;
    }

    .plain-list li {
        margin-bottom: 1rem;
        line-height: 1.6;
        color: var(--text-main);
    }
</style>
