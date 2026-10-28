<script>
    import * as m from '$lib/paraglide/messages.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import DocLayout from '$lib/components/DocLayout.svelte';
    import DownloadCard from '$lib/components/DownloadCard.svelte';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import InstallCommonSteps, { commonToc } from '$lib/components/InstallCommonSteps.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';

    import imgRelease from '$lib/assets/app_github_release.jpg';

    const toc = [
        { id: 'requirements', label: m.os_macos_req_title() },
        { id: 'step-1', label: m.os_macos_step1_title() },
        { id: 'step-2', label: m.os_macos_step2_title() },
        { id: 'step-3', label: m.os_macos_step3_title() },
        ...commonToc(4),
        { id: 'keep-running', label: m.os_macos_keep_title() },
        { id: 'support', label: m.inst_support_title() }
    ];
</script>

<Seo title={m.os_macos_title()} description={m.os_macos_intro()} />

<PageHeader
    eyebrow="macOS 14+ · Apple Silicon"
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
                    <th>{m.os_table_mac()}</th>
                    <th>{m.os_table_engine()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{m.os_hw_apple_silicon()}</td>
                    <td>{m.os_engine_neural()}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="note">
        <strong>{m.os_note_title()}:</strong> {m.os_note_text()}
    </p>

    <h2 id="steps">{m.inst_steps_title()}</h2>

    <InstallStep
        number="1"
        title={m.os_macos_step1_title()}
        image={imgRelease}
        imageAlt="The latest AI Detector release on GitHub with the macOS download file under Assets"
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
                <pre><code>sudo xattr -rd com.apple.quarantine "/Applications/AI Detector.app"</code></pre>
            </li>
            <li>{@html m.os_macos_step3_c_3()}</li>
        </ol>
    </InstallStep>

    <InstallCommonSteps start={4}>
        <h2 id="keep-running">{m.os_macos_keep_title()}</h2>
        <ul class="check-list">
            <li>{@html m.os_macos_keep_1()}</li>
            <li>{@html m.os_macos_keep_2()}</li>
            <li>{@html m.os_macos_keep_3()}</li>
        </ul>
    </InstallCommonSteps>

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
