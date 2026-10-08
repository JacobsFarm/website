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
    import imgFolder from '$lib/assets/installation_software_step_2.jpg';
    import imgUnblock from '$lib/assets/installation_software_unblock_protection.jpg';

    const toc = [
        { id: 'requirements', label: m.windows_req_title() },
        { id: 'step-1', label: m.windows_step1_title() },
        { id: 'step-2', label: m.windows_step2_title() },
        { id: 'step-3', label: m.windows_step3_title() },
        { id: 'step-4', label: m.inst_cams_title() },
        { id: 'step-5', label: m.inst_stream_title() },
        { id: 'step-6', label: m.inst_tele_title() },
        { id: 'step-7', label: m.inst_det_title() },
        { id: 'step-8', label: m.inst_start_title() },
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
    </div>
    <p class="note">
        <strong>{m.windows_note_title()}:</strong> {@html m.windows_note_text()}
    </p>

    <h2 id="steps">{m.inst_steps_title()}</h2>

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

    <h2 id="keep-running">{m.windows_keep_title()}</h2>
    <ul class="check-list">
        <li>{@html m.windows_keep_1()}</li>
        <li>{@html m.windows_keep_2()}</li>
        <li>{@html m.windows_keep_3()}</li>
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
