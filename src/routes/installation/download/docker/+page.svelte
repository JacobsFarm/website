<script>
    import * as m from '$lib/paraglide/messages.js';
</script>

<div class="doc-page">
    <section class="doc-section">
        <h1>{m.docker_title()}</h1>
        <p class="intro">{m.docker_intro()}</p>

        <h3>{m.docker_step1_title()}</h3>
        <div class="hardware-options">
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
            <p>
                <a
                    href="https://www.youtube.com/watch?v=-PjMC0gyH9s&t=1307s"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-link">{m.docker_video_link()}</a
                >
            </p>

            <h4>{m.docker_step1_opt2_title()}</h4>
            <ol class="setup-steps">
                <li>{m.docker_step1_opt2_step1()}</li>
                <li>{m.docker_step1_opt2_step2()}</li>
            </ol>
            <p>
                <a
                    href="https://www.youtube.com/watch?v=497u-CcYvE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-link">{m.docker_video_link()}</a
                >
            </p>

            <h4>{m.docker_step1_opt3_title()}</h4>
            <ol class="setup-steps">
                <li>{m.docker_step1_opt3_step1()}</li>
                <li>{m.docker_step1_opt3_step2()}</li>
                <li>{m.docker_step1_opt3_step3()}</li>
                <li>{m.docker_step1_opt3_step4()}</li>
            </ol>
        </div>

        <h3>{m.docker_step2_title()}</h3>
        <p>{m.docker_step2_desc()}</p>
        <pre><code>sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo apt install -y nvidia-container-runtime nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker</code></pre>

        <h3>{m.docker_step3_title()}</h3>
        <p>{m.docker_step3_desc()}</p>
        <pre><code>sudo docker pull ghcr.io/eschouten/ai-detector:main-jetpack6</code></pre>

        <h3>{m.docker_step4_title()}</h3>
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
        <pre><code>{`{
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
}`}</code></pre>

        <h3>{m.docker_step5_title()}</h3>
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
    </section>
</div>

<style>
    .doc-section h3 {
        border-bottom: 2px solid var(--border-soft);
        padding-bottom: 0.5rem;
    }

    .setup-steps li {
        margin-bottom: 0.8rem;
    }
</style>
