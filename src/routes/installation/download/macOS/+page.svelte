<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import InstallCommonSteps from '$lib/components/InstallCommonSteps.svelte';

    import imgReleases from '$lib/assets/installation_software_github_releases.jpg';
</script>

<div class="doc-page">
    <section class="doc-section">
        <h1>{m.os_macos_title()}</h1>
        <p class="intro">{m.os_macos_intro()}</p>

        <div class="download-box">
            <h3>{m.os_macos_download_heading()}</h3>
            <p>{m.os_macos_download_desc()}</p>
            <a
                href="https://github.com/CowCatcherAI/CowCatcherAI/releases"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--solid release-btn"
            >
                {m.os_btn_releases()} &rarr;
            </a>
        </div>

        <h3>{m.os_macos_req_title()}</h3>
        <p>{m.os_macos_req_text()}</p>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{m.os_table_file()}</th>
                        <th>{m.os_table_hardware()}</th>
                        <th>{m.os_table_speed()}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>aidetector-osx-&lt;version&gt;.zip</code></td>
                        <td>{m.os_hw_macos_any()}</td>
                        <td>{m.os_speed_macos()}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>{m.inst_steps_title()}</h3>

        <InstallStep
            number="1"
            title={m.os_macos_step1_title()}
            image={imgReleases}
            imageAlt="GitHub releases page of the AI detector with the macOS download file"
            caption={m.os_macos_step1_caption()}
        >
            <ol class="setup-steps">
                <li>{@html m.os_macos_step1_1()}</li>
                <li>{@html m.os_macos_step1_2()}</li>
            </ol>
        </InstallStep>

        <InstallStep number="2" title={m.os_macos_step2_title()}>
            <ol class="setup-steps">
                <li>{@html m.os_macos_step2_1()}</li>
                <li>{@html m.os_macos_step2_2()}</li>
                <li>{@html m.os_macos_step2_3()}</li>
                <li>{@html m.os_macos_step2_4()}</li>
            </ol>
        </InstallStep>

        <InstallStep number="3" title={m.os_macos_step3_title()}>
            <p>{m.os_macos_step3_intro()}</p>

            <h4>{m.os_macos_step3_a_title()}</h4>
            <ol class="setup-steps">
                <li>{@html m.os_macos_step3_a_1()}</li>
                <li>{@html m.os_macos_step3_a_2()}</li>
                <li>{@html m.os_macos_step3_a_3()}</li>
                <li>{@html m.os_macos_step3_a_4()}</li>
            </ol>

            <h4>{m.os_macos_step3_b_title()}</h4>
            <ol class="setup-steps">
                <li>{@html m.os_macos_step3_b_1()}</li>
                <li>{@html m.os_macos_step3_b_2()}</li>
                <li>{@html m.os_macos_step3_b_3()}</li>
            </ol>

            <h4>{m.os_macos_step3_c_title()}</h4>
            <p>{m.os_macos_step3_c_intro()}</p>
            <ol class="setup-steps">
                <li>{@html m.os_macos_step3_c_1()}</li>
                <li>
                    {@html m.os_macos_step3_c_2()}
                    <pre><code>sudo xattr -rd com.apple.quarantine /Users/yourname/Desktop/Cowcatcher</code></pre>
                </li>
                <li>{@html m.os_macos_step3_c_3()}</li>
                <li>{m.os_macos_step3_c_4()}</li>
            </ol>
        </InstallStep>

        <InstallCommonSteps showTerminalImage={false} />

        <h3>{m.os_macos_keep_title()}</h3>
        <ul class="keep-list">
            <li>{@html m.os_macos_keep_1()}</li>
            <li>{@html m.os_macos_keep_2()}</li>
            <li>{@html m.os_macos_keep_3()}</li>
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
