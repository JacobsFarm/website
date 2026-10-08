<script>
    import * as m from '$lib/paraglide/messages.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import DocLayout from '$lib/components/DocLayout.svelte';
    import InstallStep from '$lib/components/InstallStep.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';
    import Icon from '$lib/components/Icon.svelte';

    const toc = [
        { id: 'step-1', label: m.docker_step1_title() },
        { id: 'step-2', label: m.docker_step2_title() },
        { id: 'step-3', label: m.docker_step3_title() },
        { id: 'step-4', label: m.docker_step4_title() },
        { id: 'step-5', label: m.docker_step5_title() }
    ];

    const configJson = `{
  "detectors": [
    {
      "detection": {
        "source": [
          "rtsp://admin:YourPassword123@192.168.100.22:554/h264Preview_01_sub"
        ]
      },
      "yolo": {
        "model": "https://github.com/CowCatcherAI/CowCatcherAI/releases/download/model-V16/cowcatcherV15.pt",
        "confidence": 0.84,
        "frames_min": 4,
        "timeout": 6,
        "time_max": 50
      },
      "exporters": {
        "telegram": [
          {
            "token": "<your_bot_token>",
            "chat": "<your_chat_id>",
            "alert_every": 5,
            "confidence": 0.87
          }
        ],
        "disk": {
          "directory": "mounts"
        }
      }
    }
  ]
}`;
</script>

<Seo title={m.docker_title()} description={m.docker_intro()} />

<PageHeader
    eyebrow="Linux · Docker · Jetson"
    title={m.docker_title()}
    lead={m.docker_intro()}
    crumbs={[
        { href: '/installation', label: m.nav_install() },
        { href: '/installation/download', label: stripNumber(m.install_card_software_title()) }
    ]}
/>

<div class="container progress-wrap">
    <InstallProgress current={2} />
</div>

<DocLayout {toc}>
    <InstallStep number="1" title={m.docker_step1_title()}>
        <div class="options">
            <div class="option">
                <h4>{m.docker_step1_opt1_title()}</h4>
                <ol class="setup-steps">
                    <li>{m.docker_step1_opt1_step1()}</li>
                    <li>{m.docker_step1_opt1_step2()}</li>
                    <li>{m.docker_step1_opt1_step3()}</li>
                    <li>{m.docker_step1_opt1_step4()}</li>
                    <li>{m.docker_step1_opt1_step5()}</li>
                    <li>{m.docker_step1_opt1_step6()}</li>
                </ol>
                <p class="note"><strong>{m.docker_important()}:</strong> {m.docker_step1_opt1_note()}</p>
                <a
                    href="https://www.youtube.com/watch?v=-PjMC0gyH9s&t=1307s"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="video-link"
                >
                    <Icon name="play" size={14} />
                    {m.docker_video_link()}
                </a>
            </div>

            <div class="option">
                <h4>{m.docker_step1_opt2_title()}</h4>
                <ol class="setup-steps">
                    <li>{m.docker_step1_opt2_step1()}</li>
                    <li>{m.docker_step1_opt2_step2()}</li>
                </ol>
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
                <h4>{m.docker_step1_opt3_title()}</h4>
                <ol class="setup-steps">
                    <li>{m.docker_step1_opt3_step1()}</li>
                    <li>{m.docker_step1_opt3_step2()}</li>
                    <li>{m.docker_step1_opt3_step3()}</li>
                    <li>{m.docker_step1_opt3_step4()}</li>
                </ol>
            </div>
        </div>
    </InstallStep>

    <InstallStep number="2" title={m.docker_step2_title()}>
        <p>{m.docker_step2_desc()}</p>
        <pre><code>sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo apt install -y nvidia-container-runtime nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker</code></pre>
    </InstallStep>

    <InstallStep number="3" title={m.docker_step3_title()}>
        <p>{m.docker_step3_desc()}</p>
        <pre><code>sudo docker pull ghcr.io/eschouten/ai-detector:main-jetpack6</code></pre>
    </InstallStep>

    <InstallStep number="4" title={m.docker_step4_title()}>
        <p>{m.docker_step4_desc()}</p>
        <pre><code>touch compose.yml
touch config.json</code></pre>

        <h4>{m.docker_step4_file1()}</h4>
        <p>{m.docker_step4_file1_desc()}</p>
        <pre><code>services:
  aidetector:
    image: "ghcr.io/eschouten/ai-detector:main-jetpack6"
    runtime: nvidia
    ipc: host
    ulimits:
      memlock: -1
      stack: 67108864
    volumes:
      - ./config.json:/app/config.json
      - ./sprong24.mp4:/app/sprong24.mp4
      - ./detections/:/app/detections
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]</code></pre>

        <h4>{m.docker_step4_file2()}</h4>
        <p>{m.docker_step4_file2_desc()}</p>
        <pre><code>{configJson}</code></pre>
    </InstallStep>

    <InstallStep number="5" title={m.docker_step5_title()}>
        <p>{m.docker_step5_start()}:</p>
        <pre><code>sudo docker compose up</code></pre>

        <p>{m.docker_step5_stop()}:</p>
        <pre><code>sudo docker compose down</code></pre>

        <div class="tip-box">
            <strong>{m.docker_step5_modify_title()}</strong>
            <ol class="setup-steps">
                <li><code>sudo docker compose down</code></li>
                <li>{m.docker_step5_modify_step2()}</li>
                <li><code>sudo docker compose up</code></li>
            </ol>
            <p>{m.docker_step5_result()}</p>
        </div>
    </InstallStep>

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
