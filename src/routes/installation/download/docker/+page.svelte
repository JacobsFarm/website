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
    import Icon from '$lib/components/Icon.svelte';

    /**
     * Drie routes op Linux: het Ubuntu-pakket, de container op een pc met
     * NVIDIA-kaart en de container op een Jetson. Daarna gaat de installatie
     * verder in de browser, net als op Windows en macOS.
     */
    const toc = [
        { id: 'requirements', label: m.docker_routes_title() },
        { id: 'step-1', label: m.docker_deb_title() },
        { id: 'step-2', label: m.docker_nvidia_title() },
        { id: 'step-3', label: m.docker_jetson_title() },
        { id: 'step-4', label: m.docker_open_title() },
        ...commonToc(5),
        { id: 'support', label: m.inst_support_title() }
    ];
</script>

<Seo title={m.docker_title()} description={m.docker_intro()} />

<PageHeader
    eyebrow="Ubuntu · Docker · Jetson"
    title={m.docker_title()}
    lead={m.docker_intro()}
    crumbs={[
        { href: '/installation', label: m.nav_install() },
        { href: '/installation/download', label: stripNumber(m.install_card_software_title()) }
    ]}
>
    {#snippet aside()}
        <DownloadCard
            heading={m.windows_download_heading()}
            desc={m.docker_download_desc()}
            button={m.windows_btn_releases()}
        />
    {/snippet}
</PageHeader>

<div class="container progress-wrap">
    <InstallProgress current={2} />
</div>

<DocLayout {toc}>
    <h2 id="requirements">{m.docker_routes_title()}</h2>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>{m.docker_routes_th_host()}</th>
                    <th>{m.docker_routes_th_route()}</th>
                    <th>{m.docker_routes_th_engine()}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{m.docker_route_deb_host()}</td>
                    <td><a href="#step-1" class="text-link">A · <code>.deb</code></a></td>
                    <td>{m.docker_route_deb_engine()}</td>
                </tr>
                <tr>
                    <td>{m.docker_route_nvidia_host()}</td>
                    <td><a href="#step-2" class="text-link">B · <code>compose.yml</code></a></td>
                    <td>{m.docker_route_nvidia_engine()}</td>
                </tr>
                <tr>
                    <td>{m.docker_route_jetson_host()}</td>
                    <td><a href="#step-3" class="text-link">C · <code>compose.jetson.yml</code></a></td>
                    <td>{m.docker_route_jetson_engine()}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h2 id="steps">{m.inst_steps_title()}</h2>

    <InstallStep number="1" title={m.docker_deb_title()}>
        <ol class="setup-steps">
            <li>{@html m.docker_deb_1()}</li>
            <li>
                {@html m.docker_deb_2()}
                <pre><code>cd ~/Downloads
sudo apt install ./AI-Detector-*-linux-amd64.deb</code></pre>
            </li>
            <li>{@html m.docker_deb_3()}</li>
            <li>{@html m.docker_deb_4()}</li>
        </ol>
        <p class="note">{@html m.docker_deb_update()}</p>
    </InstallStep>

    <InstallStep number="2" title={m.docker_nvidia_title()}>
        <p>{m.docker_nvidia_req()}</p>
        <pre><code>git clone https://github.com/ESchouten/ai-detector.git
cd ai-detector/example
sudo docker compose up -d</code></pre>
        <p>{@html m.docker_nvidia_open()}</p>
    </InstallStep>

    <InstallStep number="3" title={m.docker_jetson_title()}>
        <div class="options">
            <div class="option">
                <h4>{m.docker_jetson_flash_title()}</h4>
                <ol class="setup-steps">
                    <li>{m.docker_jetson_flash_1()}</li>
                    <li>{m.docker_jetson_flash_2()}</li>
                    <li>{m.docker_jetson_flash_3()}</li>
                </ol>
                <p class="note"><strong>{m.docker_important()}:</strong> {m.docker_jetson_flash_note()}</p>
                <a
                    href="https://www.youtube.com/watch?v=497u-CcYvE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="video-link"
                >
                    <Icon name="play" size={14} />
                    {m.docker_video_link()}
                </a>
            </div>

            <div class="option">
                <h4>{m.docker_jetson_docker_title()}</h4>
                <p>{m.docker_jetson_docker_desc()}</p>
                <pre><code>sudo apt update
sudo apt install -y docker.io git
sudo systemctl enable --now docker
sudo apt install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker</code></pre>
            </div>

            <div class="option">
                <h4>{m.docker_jetson_start_title()}</h4>
                <p>{m.docker_jetson_start_desc()}</p>
                <pre><code>git clone https://github.com/ESchouten/ai-detector.git
cd ai-detector/example
sudo docker compose -f compose.jetson.yml up -d</code></pre>
            </div>

            <div class="option">
                <h4>{m.docker_jetson_auto_title()}</h4>
                <p>{@html m.docker_jetson_auto_desc()}</p>
                <pre><code>cd ~/ai-detector
python3 distribution/linux_startup.py install --compose example/compose.jetson.yml</code></pre>
                <p class="note">{@html m.docker_jetson_auto_note()}</p>
            </div>
        </div>

        <div class="tip-box">
            <strong>{m.docker_manage_title()}</strong>
            <p>{m.docker_manage_update()}:</p>
            <pre><code>sudo docker compose pull && sudo docker compose up -d</code></pre>
            <p>{m.docker_manage_stop()}:</p>
            <pre><code>sudo docker compose down</code></pre>
            <p>{m.docker_manage_logs()}:</p>
            <pre><code>sudo docker compose logs -f aidetector</code></pre>
            <p>{@html m.docker_jetson_compose_note()}</p>
        </div>
    </InstallStep>

    <InstallStep number="4" title={m.docker_open_title()}>
        <p>{@html m.docker_open_text()}</p>
    </InstallStep>

    <InstallCommonSteps start={5} />

    <PagerNav
        prev={{ href: '/installation/download', label: m.inst_back_to_platforms() }}
        next={{ href: '/installation/options', label: stripNumber(m.install_card_options_title()), hint: m.next_step() }}
    />
</DocLayout>

<style>
    .progress-wrap {
        margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }

    .options {
        display: grid;
        gap: 1rem;
    }

    .option {
        min-width: 0;
        padding: 1.25rem;
        border-radius: var(--radius);
        background: var(--bg-sunken);
    }

    .option h4 {
        margin: 0 0 1rem;
    }

    .option > * + * {
        margin-top: 1rem;
    }

    .video-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--primary);
        font-weight: 600;
        text-decoration: none;
    }

    .video-link:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
    }

    .tip-box > * + * {
        margin-top: 0.75rem;
    }
</style>
