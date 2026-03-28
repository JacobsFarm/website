<script>
    import * as m from '$lib/paraglide/messages.js';
</script>

<div class="container">
    <section class="doc-section">
        <h1>{m.os_macos_title()}</h1>
        <p class="intro">{m.os_macos_intro()}</p>

        <div class="download-box">
            <h3>{m.os_macos_download_heading()}</h3>
            <p>{m.os_macos_download_desc()}</p>
            <a href="https://github.com/CowCatcherAI/CowCatcherAI/releases" target="_blank" rel="noopener noreferrer" class="btn">
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
    /* Zelfde stylingblok als de Windows pagina om consistentie te bewaren */
    .container { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Roboto', sans-serif; }
    .doc-section { background: #ffffff; border: 1px solid oklch(85% 0.01 145); border-radius: 12px; padding: 3rem 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 5px solid #386938; }
    h1 { font-family: 'Bebas Kai', sans-serif; color: #386938; font-size: 3rem; margin-top: 0; margin-bottom: 1rem; }
    h3 { color: #386938; font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; }
    .intro { font-size: 1.15rem; color: oklch(22% 0.02 145); margin-bottom: 2rem; }
    .download-box { background: #F9FBF9; border: 1px solid #4DA699; border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem; text-align: center; }
    .btn { display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background: #386938; color: oklch(98% 0.005 145); text-decoration: none; border-radius: 8px; font-weight: bold; transition: background 0.2s; }
    .btn:hover { background: oklch(65% 0.16 75); color: oklch(22% 0.02 145); }
    .table-container { overflow-x: auto; margin-bottom: 2.5rem; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid oklch(85% 0.01 145); }
    th { background-color: #F9FBF9; color: #386938; font-weight: bold; }
    code { background: oklch(97% 0.01 145); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; color: oklch(22% 0.02 145); }
    .setup-steps li { margin-bottom: 1rem; line-height: 1.6; color: oklch(22% 0.02 145); }
    .tip-box { background: #e0eee0; border-left: 4px solid #386938; padding: 1.5rem; border-radius: 4px; margin-top: 2rem; color: oklch(22% 0.02 145); line-height: 1.6; }
</style>