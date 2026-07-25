<script>
    import * as m from '$lib/paraglide/messages.js';
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

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{m.os_table_file()}</th>
                        <th>{m.os_table_hardware()}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>aidetector-osx-&lt;version&gt;</code></td>
                        <td>{m.os_hw_macos_any()}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>{m.os_setup_title()}</h3>
        <ol class="setup-steps">
            <li>{@html m.os_macos_setup_step1()}</li>
            <li>{@html m.os_setup_step2()}</li>
            <li>{@html m.os_macos_setup_step3()}</li>
            <li>{@html m.os_setup_step4()}</li>
        </ol>

        <div class="tip-box">
            <strong>{m.os_tip_title()}:</strong> {m.os_tip_text()}
        </div>
    </section>
</div>

<style>
    .release-btn {
        margin-top: 1rem;
    }
</style>
