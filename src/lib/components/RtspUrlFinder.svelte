<script>
    import * as m from '$lib/paraglide/messages.js';

    /**
     * Vaste lijst met RTSP-padtemplates per cameramerk. Dit zijn technische
     * URL-sjablonen (geen leesbare tekst), daarom niet via paraglide vertaald.
     */
    const CAMERAS = [
        {
            brand: 'Reolink',
            streams: [
                { label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/h264Preview_01_main' },
                { label: 'Sub', url: 'rtsp://admin:[PASS]@[IP]:554/h264Preview_01_sub' }
            ]
        },
        {
            brand: 'Dahua / Amcrest',
            streams: [
                {
                    label: 'Main',
                    url: 'rtsp://admin:[PASS]@[IP]:554/cam/realmonitor?channel=1&subtype=0'
                },
                {
                    label: 'Sub',
                    url: 'rtsp://admin:[PASS]@[IP]:554/cam/realmonitor?channel=1&subtype=1'
                }
            ]
        },
        {
            brand: 'Hikvision / Annke',
            streams: [
                { label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/Streaming/Channels/1' },
                { label: 'Sub', url: 'rtsp://admin:[PASS]@[IP]:554/Streaming/Channels/101' }
            ]
        },
        {
            brand: 'Axis',
            streams: [
                {
                    label: 'H.264',
                    url: 'rtsp://admin:[PASS]@[IP]:554/axis-media/media.amp?videocodec=h264'
                }
            ]
        },
        {
            brand: 'TP-Link Tapo',
            streams: [
                { label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/stream1' },
                { label: 'Sub', url: 'rtsp://admin:[PASS]@[IP]:554/stream2' }
            ]
        },
        {
            brand: 'Foscam',
            streams: [
                { label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/videoMain' },
                { label: 'Sub', url: 'rtsp://admin:[PASS]@[IP]:554/videoSub' }
            ]
        },
        {
            brand: 'Uniview',
            streams: [
                { label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/unicast/c1/s0/live' },
                { label: 'Sub', url: 'rtsp://admin:[PASS]@[IP]:554/unicast/c1/s2/live' }
            ]
        },
        {
            brand: 'D-Link',
            streams: [{ label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/live1.sdp' }]
        },
        {
            brand: 'Wyze',
            streams: [{ label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/live' }]
        },
        {
            brand: 'Ctronic',
            streams: [{ label: 'Main', url: 'rtsp://admin:[PASS]@[IP]:554/11' }]
        },
        {
            brand: 'Ubiquiti UniFi',
            streams: [
                { label: 'Main', url: 'rtsps://[IP]:[RTSPS_PORT]/[RTSP_ALIAS]?enableSrtp' }
            ]
        }
    ];

    let selectedBrand = $state(CAMERAS[0].brand);
    let copiedUrl = $state('');

    let selectedStreams = $derived(
        CAMERAS.find((camera) => camera.brand === selectedBrand)?.streams ?? []
    );

    async function copyUrl(url) {
        try {
            await navigator.clipboard.writeText(url);
            copiedUrl = url;
            setTimeout(() => {
                if (copiedUrl === url) copiedUrl = '';
            }, 1500);
        } catch {
            // Clipboard-API niet beschikbaar (bijv. geen HTTPS) — geen actie nodig,
            // de gebruiker kan de URL nog altijd handmatig selecteren.
        }
    }
</script>

<div class="rtsp-finder">
    <label class="brand-label" for="rtsp-brand-select">{m.inst_rtsp_finder_brand_label()}</label>
    <select id="rtsp-brand-select" class="brand-select" bind:value={selectedBrand}>
        {#each CAMERAS as camera (camera.brand)}
            <option value={camera.brand}>{camera.brand}</option>
        {/each}
    </select>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th class="stream-col">{m.inst_rtsp_finder_stream_th()}</th>
                    <th>{m.inst_rtsp_finder_url_th()}</th>
                    <th class="copy-col"></th>
                </tr>
            </thead>
            <tbody>
                {#each selectedStreams as stream (stream.label)}
                    <tr>
                        <td class="stream-col">{stream.label}</td>
                        <td><code class="rtsp-url">{stream.url}</code></td>
                        <td class="copy-col">
                            <button
                                type="button"
                                class="btn btn--outline copy-btn"
                                onclick={() => copyUrl(stream.url)}
                            >
                                {copiedUrl === stream.url
                                    ? m.inst_rtsp_finder_copied()
                                    : m.inst_rtsp_finder_copy()}
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .rtsp-finder {
        margin: 1rem 0 1.5rem;
    }

    .brand-label {
        display: block;
        font-weight: bold;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }

    .brand-select {
        width: 100%;
        max-width: 320px;
        padding: 0.6rem 0.8rem;
        border: 1px solid var(--soft-gray);
        border-radius: var(--radius-sm);
        background: var(--card-bg);
        color: var(--text-main);
        font-family: var(--font-body);
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }

    .stream-col {
        white-space: nowrap;
        width: 1%;
    }

    .copy-col {
        width: 1%;
        text-align: right;
    }

    .rtsp-url {
        word-break: break-all;
    }

    .copy-btn {
        padding: 0.4rem 0.9rem;
        font-size: 0.85rem;
        white-space: nowrap;
    }
</style>
