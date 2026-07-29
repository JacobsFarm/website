<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import InstallCommonSteps from '$lib/components/InstallCommonSteps.svelte';

    import imgReleases from '$lib/assets/installation_software_github_releases.jpg';
    import imgFolder from '$lib/assets/installation_software_step_2.jpg';
    import imgUnblock from '$lib/assets/installation_software_unblock_protection.jpg';
</script>

<div class="doc-page">
    <section class="doc-section">
        <h1>{m.windows_title()}</h1>
        <p class="intro">{m.windows_intro()}</p>

        <div class="download-box">
            <h3>{m.windows_download_heading()}</h3>
            <p>{m.windows_download_desc()}</p>
            <a
                href="https://github.com/ESchouten/ai-detector/releases"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--solid release-btn"
            >
                {m.windows_btn_releases()} &rarr;
            </a>
        </div>

        <h3>{m.windows_req_title()}</h3>
        <p>{m.windows_req_text()}</p>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{m.windows_table_file()}</th>
                        <th>{m.windows_table_hardware()}</th>
                        <th>{m.windows_table_speed()}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>aidetector-winml-&lt;version&gt;.zip</code></td>
                        <td>{m.windows_hw_win11_any()}</td>
                        <td>{m.windows_speed_winml()}</td>
                    </tr>
                    <tr>
                        <td><code>aidetector-nvidia-cu130-&lt;version&gt;.zip</code></td>
                        <td>{m.windows_hw_win10_rtx3000()}</td>
                        <td>{m.windows_speed_cu130()}</td>
                    </tr>
                    <tr>
                        <td><code>aidetector-nvidia-cu126-&lt;version&gt;.zip</code></td>
                        <td>{m.windows_hw_win10_rtx2000()}</td>
                        <td>{m.windows_speed_cu126()}</td>
                    </tr>
                    <tr>
                        <td><code>aidetector-web-windows-&lt;version&gt;.exe</code></td>
                        <td>{m.windows_table_web()}</td>
                        <td>{m.windows_speed_web()}</td>
                    </tr>
                </tbody>
            </table>
            <p class="note">
                <strong>{m.windows_note_title()}:</strong> {@html m.windows_note_text()}
            </p>
        </div>

        <h3>{m.inst_steps_title()}</h3>

        <InstallStep
            number="1"
            title={m.windows_step1_title()}
            image={imgReleases}
            imageAlt="GitHub releases page of the AI detector with the download files"
            caption={m.windows_step1_caption()}
        >
            <ol class="setup-steps">
                <li>{@html m.windows_step1_1()}</li>
                <li>{@html m.windows_step1_2()}</li>
            </ol>
            <p class="note">{@html m.windows_step1_github_note()}</p>
        </InstallStep>

        <InstallStep
            number="2"
            title={m.windows_step2_title()}
            image={imgFolder}
            imageAlt="The unpacked programs in the Cowcatcher folder on the Windows desktop"
            caption={m.windows_step2_caption()}
        >
            <ol class="setup-steps">
                <li>{@html m.windows_step2_1()}</li>
                <li>{@html m.windows_step2_2()}</li>
                <li>{@html m.windows_step2_3()}</li>
                <li>{@html m.windows_step2_4()}</li>
            </ol>
        </InstallStep>

        <InstallStep
            number="3"
            title={m.windows_step3_title()}
            image={imgUnblock}
            imageAlt="Windows file properties with the Unblock checkbox ticked"
            caption={m.windows_step3_caption()}
        >
            <p>{m.windows_step3_intro()}</p>

            <h4>{m.windows_step3_a_title()}</h4>
            <ol class="setup-steps">
                <li>{@html m.windows_step3_a_1()}</li>
                <li>{@html m.windows_step3_a_2()}</li>
                <li>{@html m.windows_step3_a_3()}</li>
            </ol>

            <h4>{m.windows_step3_b_title()}</h4>
            <ol class="setup-steps">
                <li>{m.windows_step3_b_1()}</li>
                <li>{@html m.windows_step3_b_2()}</li>
            </ol>
        </InstallStep>

        <InstallCommonSteps />

        <h3>{m.windows_keep_title()}</h3>
        <ul class="keep-list">
            <li>{@html m.windows_keep_1()}</li>
            <li>{@html m.windows_keep_2()}</li>
            <li>{@html m.windows_keep_3()}</li>
        </ul>

        <div class="tip-box">
            <strong>{m.os_tip_title()}:</strong> {@html m.os_tip_text()}
        </div>

        <div class="action-buttons">
            <a href="{base}/installation/download" class="btn btn--solid">
                &larr; {m.inst_back_to_platforms()}
            </a>
        </div>
    </section>
</div>

<style>
    .release-btn {
        margin-top: 1rem;
    }

    .keep-list {
        list-style: none;
        padding-left: 0;
    }

    .keep-list li {
        margin-bottom: 1rem;
        line-height: 1.6;
        color: var(--text-main);
    }

    .action-buttons {
        margin-top: 2.5rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border-soft);
    }
</style>
