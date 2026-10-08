<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import { links } from '$lib/config/links.js';
    import { stripNumber } from '$lib/utils/text.js';
    import Seo from '$lib/components/Seo.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import InstallProgress from '$lib/components/InstallProgress.svelte';
    import HardwareSection from '$lib/components/HardwareSection.svelte';
    import PagerNav from '$lib/components/PagerNav.svelte';

    import imgHardware1 from '$lib/assets/installation_hardware_1.jpg';
    import imgPlaceholder from '$lib/assets/place-holder 875x875.jpg';
    import imgNvidiaDesktop from '$lib/assets/Hardware_nvidia_desktop_875x875.jpg';
    import imgMacMini from '$lib/assets/Hardware_Mac_mini_m4_875x875.jpg';
    import imgJetsonNano from '$lib/assets/Hardware_jetson_nano_orin_875x875.jpg';
    import imgStandardDesktop from '$lib/assets/Hardware_standard_desktop_875x875.jpg';
    import imgPoeSwitch from '$lib/assets/Hardware_poe switch_875x875.jpg';
    import imgEthernetCable from '$lib/assets/Hardware_ethernet_cable_875x875.jpg';
    import imgCrimpTool from '$lib/assets/Hardware_crimp_tool_rj45_875x875.jpg';

    // Zoekresultaten in plaats van de kale homepage, zodat de knop meteen iets oplevert.
    const shop = (/** @type {string} */ query) => `https://www.aliexpress.com/w/wholesale-${query}.html`;

    // Geen reactieve declaraties nodig: setLocale herlaadt de pagina.
    const sections = [
        {
            id: 'computer',
            title: m.hardware_computer_title(),
            intro: m.hardware_computer_intro(),
            options: [
                {
                    title: m.hardware_comp_opt1_title(),
                    desc: m.hardware_comp_opt1_desc(),
                    moreInfo: m.hardware_comp_opt1_more(),
                    imageSrc: imgNvidiaDesktop,
                    imageAlt: 'Gaming PC with an NVIDIA graphics card',
                    links: [{ text: 'See setup video', url: links.youtubeSearch, icon: 'play' }]
                },
                {
                    title: m.hardware_comp_opt2_title(),
                    desc: m.hardware_comp_opt2_desc(),
                    moreInfo: m.hardware_comp_opt2_more(),
                    imageSrc: imgMacMini,
                    imageAlt: 'Mac mini',
                    links: []
                },
                {
                    title: m.hardware_comp_opt3_title(),
                    desc: m.hardware_comp_opt3_desc(),
                    moreInfo: m.hardware_comp_opt3_more(),
                    imageSrc: imgJetsonNano,
                    imageAlt: 'NVIDIA Jetson Orin Nano',
                    links: [
                        {
                            text: 'View Docker installation guide',
                            url: `${base}/installation/download/docker`,
                            icon: 'book'
                        }
                    ]
                },
                {
                    title: m.hardware_comp_opt4_title(),
                    desc: m.hardware_comp_opt4_desc(),
                    moreInfo: m.hardware_comp_opt4_more(),
                    imageSrc: imgStandardDesktop,
                    imageAlt: 'Refurbished desktop PC',
                    links: []
                }
            ]
        },
        {
            id: 'cameras',
            title: m.hardware_cameras_title(),
            intro: m.hardware_cameras_intro(),
            options: [
                {
                    title: m.hardware_cam_opt1_title(),
                    desc: m.hardware_cam_opt1_desc(),
                    moreInfo: m.hardware_cam_opt1_more(),
                    imageSrc: imgHardware1,
                    imageAlt: 'IP camera',
                    links: [
                        { text: 'See camera setup video', url: links.youtubeSearch, icon: 'play' },
                        {
                            text: 'Camera Setup Manual (PDF)',
                            url: `${base}/docs/camera_setup_trackmix.pdf`,
                            icon: 'book'
                        }
                    ]
                }
            ]
        },
        {
            id: 'network',
            title: m.hardware_requirements_title(),
            intro: m.hardware_requirements_intro(),
            options: [
                {
                    title: m.hardware_req_opt1_title(),
                    desc: m.hardware_req_opt1_desc(),
                    moreInfo: m.hardware_req_opt1_more(),
                    imageSrc: imgPoeSwitch,
                    imageAlt: 'PoE network switch',
                    links: [{ text: 'Buy PoE Switch on AliExpress', url: shop('poe-switch'), icon: 'cart' }]
                },
                {
                    title: m.hardware_req_opt2_title(),
                    desc: m.hardware_req_opt2_desc(),
                    moreInfo: m.hardware_req_opt2_more(),
                    imageSrc: imgEthernetCable,
                    imageAlt: 'Network cable',
                    links: [{ text: 'Buy Cat6 Cable on AliExpress', url: shop('cat6-cable'), icon: 'cart' }]
                },
                {
                    title: m.hardware_req_opt3_title(),
                    desc: m.hardware_req_opt3_desc(),
                    moreInfo: m.hardware_req_opt3_more(),
                    imageSrc: imgPlaceholder,
                    imageAlt: 'Waterproof junction box',
                    links: [{ text: 'Buy Waterproof Box', url: shop('waterproof-junction-box'), icon: 'cart' }]
                }
            ]
        },
        {
            id: 'diy',
            title: m.hardware_diy_title(),
            intro: m.hardware_diy_intro(),
            options: [
                {
                    title: m.hardware_diy_opt1_title(),
                    desc: m.hardware_diy_opt1_desc(),
                    moreInfo: m.hardware_diy_opt1_more(),
                    imageSrc: imgCrimpTool,
                    imageAlt: 'Pass-through crimp tool',
                    links: [
                        { text: 'See how to crimp cables', url: links.youtubeSearch, icon: 'play' },
                        { text: 'Buy Pass-through Tool', url: shop('pass-through-crimp-tool'), icon: 'cart' }
                    ]
                },
                {
                    title: m.hardware_diy_opt2_title(),
                    desc: m.hardware_diy_opt2_desc(),
                    moreInfo: m.hardware_diy_opt2_more(),
                    imageSrc: imgPlaceholder,
                    imageAlt: 'Pass-through connectors',
                    links: [{ text: 'Buy Connectors (Cat6)', url: shop('cat6-pass-through-connector'), icon: 'cart' }]
                },
                {
                    title: m.hardware_diy_opt3_title(),
                    desc: m.hardware_diy_opt3_desc(),
                    moreInfo: m.hardware_diy_opt3_more(),
                    imageSrc: imgPlaceholder,
                    imageAlt: 'Components for a DIY junction box',
                    links: [
                        { text: 'Buy Junction Box', url: shop('waterproof-junction-box'), icon: 'cart' },
                        { text: 'Buy Cable Glands', url: shop('cable-gland'), icon: 'cart' }
                    ]
                },
                {
                    title: m.hardware_diy_opt4_title(),
                    desc: m.hardware_diy_opt4_desc(),
                    moreInfo: m.hardware_diy_opt4_more(),
                    imageSrc: imgPlaceholder,
                    imageAlt: 'Impact-resistant PVC conduit',
                    links: []
                }
            ]
        }
    ];
</script>

<Seo title={m.hardware_title()} description={m.hardware_intro()} />

<PageHeader
    eyebrow="{m.step_label()} 1"
    title={m.hardware_title()}
    lead={m.hardware_intro()}
    crumbs={[{ href: '/installation', label: m.nav_install() }]}
/>

<div class="container">
    <InstallProgress current={1} />

    <nav class="jump" aria-label={m.toc_title()}>
        {#each sections as section, i (section.id)}
            <a href="#{section.id}"><span>0{i + 1}</span>{stripNumber(section.title)}</a>
        {/each}
    </nav>

    {#each sections as section, i (section.id)}
        <HardwareSection
            id={section.id}
            number="0{i + 1}"
            title={stripNumber(section.title)}
            intro={section.intro}
            options={section.options}
        />
    {/each}

    <div class="pager-wrap">
        <PagerNav
            prev={{ href: '/installation', label: m.hardware_btn_back() }}
            next={{ href: '/installation/download', label: stripNumber(m.install_card_software_title()), hint: m.next_step() }}
        />
    </div>
</div>

<style>
    .jump {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 2rem 0 1rem;
    }

    .jump a {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.95rem;
        border-radius: var(--radius-pill);
        background: var(--card-bg);
        box-shadow: 0 0 0 1px var(--line);
        color: var(--text-main);
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
        transition:
            box-shadow var(--dur-fast) var(--ease-out),
            color var(--dur-fast) var(--ease-out);
    }

    .jump a:hover {
        box-shadow: 0 0 0 1px var(--primary);
        color: var(--primary);
    }

    .jump span {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--amber-ink);
    }

    .pager-wrap {
        padding-bottom: var(--section-y);
    }
</style>
