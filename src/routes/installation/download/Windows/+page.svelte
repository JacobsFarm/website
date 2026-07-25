<script>
    import * as m from '$lib/paraglide/messages.js';
</script>

<div class="doc-page">
    <section class="doc-section">
        <h1>{m.windows_title()}</h1>
        <p class="intro">{m.windows_intro()}</p>

        <div class="download-box">
            <h3>{m.windows_download_heading()}</h3>
            <p>{m.windows_download_desc()}</p>
            <a
                href="https://github.com/CowCatcherAI/CowCatcherAI/releases"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--solid release-btn"
            >
                {m.windows_btn_releases()} &rarr;
            </a>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{m.windows_table_file()}</th>
                        <th>{m.windows_table_hardware()}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>aidetector-winml-&lt;version&gt;.exe</code></td>
                        <td>{m.windows_hw_win11_any()}</td>
                    </tr>
                    <tr>
                        <td><code>aidetector-cuda130-&lt;version&gt;.exe</code></td>
                        <td>{m.windows_hw_win10_rtx3000()}</td>
                    </tr>
                    <tr>
                        <td><code>aidetector-cuda126-&lt;version&gt;.exe</code></td>
                        <td>{m.windows_hw_win10_rtx2000()}</td>
                    </tr>
                </tbody>
            </table>
            <p class="note"><strong>{m.windows_note_title()}:</strong> {m.windows_note_text()}</p>
        </div>

        <h3>{m.os_setup_title()}</h3>
        <ol class="setup-steps">
            <li>{@html m.windows_setup_step1()}</li>
            <li>{@html m.os_setup_step2()}</li>
            <li>{@html m.os_setup_step3()}</li>
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
