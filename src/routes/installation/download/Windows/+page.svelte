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
        { id: 'requirements', label: m.windows_req_title() },
        { id: 'step-1', label: m.windows_step1_title() },
        { id: 'step-2', label: m.windows_step2_title() },
        ...commonToc(3),
        { id: 'keep-running', label: m.windows_keep_title() },
        { id: 'support', label: m.inst_support_title() }
    ];
</script>

<Seo title={m.windows_title()} description={m.windows_intro()} />

<PageHeader
    eyebrow="Windows 10 · 11"
    title={m.windows_title()}
    lead={m.windows_intro()}
    crumbs={[
        { href: '/installation', label: m.nav_install() },
        { href: '/installation/download', label: stripNumber(m.install_card_software_title()) }
    ]}
>
    {#snippet aside()}
        <DownloadCard
            heading={m.windows_download_heading()}
            desc={m.windows_download_desc()}
            button={m.windows_btn_releases()}
        />
    {/snippet}
</PageHeader>

<div class="container progress-wrap">
    <InstallProgress current={2} />
</div>

<DocLayout {toc}>
    <h2 id="requirements">{m.windows_req_title()}</h2>
    <p>{m.windows_req_text()}</p>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>{m.windows_table_pc()}</th>
                    <th>{m.windows_table_engine()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{m.windows_hw_nvidia()}</td>
                    <td>{m.windows_engine_nvidia()}</td>
                </tr>
                <tr>
                    <td>{m.windows_hw_other()}</td>
                    <td>{m.windows_engine_other()}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p class="note">
        <strong>{m.windows_note_title()}:</strong> {m.windows_note_text()}
    </p>

    <h2 id="steps">{m.inst_steps_title()}</h2>

    <InstallStep
        number="1"
        title={m.windows_step1_title()}
        image={imgRelease}
        imageAlt="The latest AI Detector release on GitHub with the download files under Assets"
        caption={m.windows_step1_caption()}
    >
        <ol class="setup-steps">
            <li>{@html m.windows_step1_1()}</li>
            <li>{@html m.windows_step1_2()}</li>
        </ol>
    </InstallStep>

    <InstallStep number="2" title={m.windows_step2_title()}>
        <ol class="setup-steps">
            <li>{@html m.windows_step2_1()}</li>
            <li>{m.windows_step2_2()}</li>
            <li>{@html m.windows_step2_3()}</li>
            <li>{@html m.windows_step2_4()}</li>
        </ol>
    </InstallStep>

    <InstallCommonSteps start={3}>
        <h2 id="keep-running">{m.windows_keep_title()}</h2>
        <ul class="check-list">
            <li>{@html m.windows_keep_1()}</li>
            <li>{@html m.windows_keep_2()}</li>
            <li>{@html m.windows_keep_3()}</li>
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
