<script>
    import * as m from '$lib/paraglide/messages.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import DocLayout from '$lib/components/DocLayout.svelte';
    import DownloadCard from '$lib/components/DownloadCard.svelte';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import InstallCommonSteps from '$lib/components/InstallCommonSteps.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';

    import imgReleases from '$lib/assets/installation_software_github_releases.jpg';

    const toc = [
        { id: 'requirements', label: m.os_macos_req_title() },
        { id: 'step-1', label: m.os_macos_step1_title() },
        { id: 'step-2', label: m.os_macos_step2_title() },
        { id: 'step-3', label: m.os_macos_step3_title() },
        { id: 'step-4', label: m.inst_cams_title() },
        { id: 'step-5', label: m.inst_stream_title() },
        { id: 'step-6', label: m.inst_tele_title() },
        { id: 'step-7', label: m.inst_det_title() },
        { id: 'step-8', label: m.inst_start_title() },
        { id: 'keep-running', label: m.os_macos_keep_title() },
        { id: 'support', label: m.inst_support_title() }
    ];
</script>

<Seo title={m.os_macos_title()} description={m.os_macos_intro()} />

<PageHeader
    eyebrow="macOS · Apple Silicon & Intel"
    title={m.os_macos_title()}
    lead={m.os_macos_intro()}
    crumbs={[
        { href: '/installation', label: m.nav_install() },
        { href: '/installation/download', label: stripNumber(m.install_card_software_title()) }
    ]}
>
    {#snippet aside()}
        <DownloadCard
            heading={m.os_macos_download_heading()}
            desc={m.os_macos_download_desc()}
            button={m.os_btn_releases()}
        />
    {/snippet}
</PageHeader>

<div class="container progress-wrap">
    <InstallProgress current={2} />
</div>

<DocLayout {toc}>
    <h2 id="requirements">{m.os_macos_req_title()}</h2>
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

    <h2 id="steps">{m.inst_steps_title()}</h2>

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

    <h2 id="keep-running">{m.os_macos_keep_title()}</h2>
    <ul class="check-list">
        <li>{@html m.os_macos_keep_1()}</li>
        <li>{@html m.os_macos_keep_2()}</li>
        <li>{@html m.os_macos_keep_3()}</li>
    </ul>

    <div class="tip-box">
        <strong>{m.os_tip_title()}:</strong> {@html m.os_tip_text()}
    </div>

    <PagerNav
        prev={{ href: '/installation/download', label: m.inst_back_to_platforms() }}
        next={{ href: '/installation/options', label: stripNumber(m.install_card_options_title()), hint: m.next_step() }}
    />
</DocLayout>

<style>
    .progress-wrap {
        margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }
</style>
