<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import HardwareSection from '$lib/components/HardwareSection.svelte';
    
    import imgHardware1 from '$lib/assets/installation_hardware_1.jpg';
    import imgPlaceholder from '$lib/assets/place-holder 875x875.jpg';
    import imgNvidiaDesktop from '$lib/assets/Hardware_nvidia_desktop_875x875.jpg';
    import imgMacMini from '$lib/assets/Hardware_Mac_mini_m4_875x875.jpg';
    import imgJetsonNano from '$lib/assets/Hardware_jetson_nano_orin_875x875.jpg';
    import imgStandardDesktop from '$lib/assets/Hardware_standard_desktop_875x875.jpg';
    import imgPoeSwitch from '$lib/assets/Hardware_poe switch_875x875.jpg';
    import imgEthernetCable from '$lib/assets/Hardware_ethernet_cable_875x875.jpg';
    import imgCrimpTool from '$lib/assets/Hardware_crimp_tool_rj45_875x875.jpg';

    // Geen reactieve declaraties nodig: setLocale herlaadt de pagina.
    const computerOptions = [
        {
            title: m.hardware_comp_opt1_title(),
            desc: m.hardware_comp_opt1_desc(),
            moreInfo: m.hardware_comp_opt1_more(),
            imageSrc: imgNvidiaDesktop,
            imageAlt: "Gaming PC",
            imageLink: "#",
            links: [
                { text: "See setup video", url: "https://youtube.com/watch", icon: "▶" }
            ]
        },
        {
            title: m.hardware_comp_opt2_title(),
            desc: m.hardware_comp_opt2_desc(),
            moreInfo: m.hardware_comp_opt2_more(),
            imageSrc: imgMacMini,
            imageAlt: "Mac mini",
            imageLink: "#",
            links: []
        },
        {
            title: m.hardware_comp_opt3_title(),
            desc: m.hardware_comp_opt3_desc(),
            moreInfo: m.hardware_comp_opt3_more(),
            imageSrc: imgJetsonNano,
            imageAlt: "Jetson Nano",
            imageLink: "#",
            links: [
                { text: "View Docker installation guide", url: "/docs/docker_guide.pdf", icon: "📄" }
            ]
        },
        {
            title: m.hardware_comp_opt4_title(),
            desc: m.hardware_comp_opt4_desc(),
            moreInfo: m.hardware_comp_opt4_more(),
            imageSrc: imgStandardDesktop,
            imageAlt: "Refurbished PC",
            imageLink: "#",
            links: []
        }
    ];

    const cameraOptions = [
        {
            title: m.hardware_cam_opt1_title(),
            desc: m.hardware_cam_opt1_desc(),
            moreInfo: m.hardware_cam_opt1_more(),
            imageSrc: imgHardware1,
            imageAlt: "Standard Camera",
            imageLink: "#",
            links: [
                { text: "See camera setup video", url: "https://youtube.com/watch", icon: "▶" },
                { text: "Camera Setup Manual (PDF)", url: `${base}/docs/camera_setup_trackmix.pdf`, icon: "📄" }
            ]
        }
    ];

    const requirementsOptions = [
        {
            title: m.hardware_req_opt1_title(),
            desc: m.hardware_req_opt1_desc(),
            moreInfo: m.hardware_req_opt1_more(),
            imageSrc: imgPoeSwitch,
            imageAlt: "PoE Switch",
            imageLink: "#",
            links: [
                { text: "Buy PoE Switch on AliExpress", url: "https://aliexpress.com", icon: "🛒" }
            ]
        },
        {
            title: m.hardware_req_opt2_title(),
            desc: m.hardware_req_opt2_desc(),
            moreInfo: m.hardware_req_opt2_more(),
            imageSrc: imgEthernetCable,
            imageAlt: "Internet Cable",
            imageLink: "#",
            links: [
                { text: "Buy Cat6 Cable on AliExpress", url: "https://aliexpress.com", icon: "🛒" }
            ]
        },
        {
            title: m.hardware_req_opt3_title(),
            desc: m.hardware_req_opt3_desc(),
            moreInfo: m.hardware_req_opt3_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "Waterproof Box",
            imageLink: "#",
            links: [
                { text: "Buy Waterproof Box", url: "https://aliexpress.com", icon: "📦" }
            ]
        }
    ];

    const diyOptions = [
        {
            title: m.hardware_diy_opt1_title(),
            desc: m.hardware_diy_opt1_desc(),
            moreInfo: m.hardware_diy_opt1_more(),
            imageSrc: imgCrimpTool,
            imageAlt: "Crimp Tool",
            imageLink: "#",
            links: [
                { text: "See how to crimp cables", url: "https://youtube.com/watch", icon: "▶" },
                { text: "Buy Pass-through Tool", url: "https://aliexpress.com", icon: "🛠️" }
            ]
        },
        {
            title: m.hardware_diy_opt2_title(),
            desc: m.hardware_diy_opt2_desc(),
            moreInfo: m.hardware_diy_opt2_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "Pass-through Connectors",
            imageLink: "#",
            links: [
                { text: "Buy Connectors (Cat6)", url: "https://aliexpress.com", icon: "🔌" }
            ]
        },
        {
            title: m.hardware_diy_opt3_title(),
            desc: m.hardware_diy_opt3_desc(),
            moreInfo: m.hardware_diy_opt3_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "DIY IP Box Components",
            imageLink: "#",
            links: [
                { text: "Buy Junction Box", url: "https://aliexpress.com", icon: "📦" },
                { text: "Buy Cable Glands", url: "https://aliexpress.com", icon: "🔧" }
            ]
        },
        {
            title: m.hardware_diy_opt4_title(),
            desc: m.hardware_diy_opt4_desc(),
            moreInfo: m.hardware_diy_opt4_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "Impact-Resistant PVC",
            imageLink: "#",
            links: []
        }
    ];
</script>

<div class="container">
    <div class="page-header">
        <h1>{m.hardware_title()}</h1>
        <p class="intro-text">{m.hardware_intro()}</p>
    </div>

    <HardwareSection 
        title={m.hardware_computer_title()}
        intro={m.hardware_computer_intro()}
        options={computerOptions}
    />

    <HardwareSection 
        title={m.hardware_cameras_title()}
        intro={m.hardware_cameras_intro()}
        options={cameraOptions}
    />

    <HardwareSection 
        title={m.hardware_requirements_title()}
        intro={m.hardware_requirements_intro()}
        options={requirementsOptions}
    />

    <HardwareSection 
        title={m.hardware_diy_title()}
        intro={m.hardware_diy_intro()}
        options={diyOptions}
    />

    <div class="action-buttons">
        <a href="{base}/installation" class="btn btn--lg btn--solid btn--responsive-block">
            &larr; {m.hardware_btn_back()}
        </a>
        <a href="{base}/installation/options" class="btn btn--lg btn--amber btn--responsive-block">
            {m.hardware_btn_next()} &rarr;
        </a>
    </div>
</div>

<style>
    .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 4rem 1.5rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    h1 {
        font-family: var(--font-heading);
        font-size: clamp(3rem, 6vw, 4.5rem);
        color: var(--primary);
        margin-top: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .intro-text {
        font-size: 1.3rem;
        color: var(--accent-teal);
        max-width: 800px;
        margin: 0 auto;
        font-weight: 500;
        line-height: 1.6;
    }

    .action-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 4rem;
        border-top: 2px solid var(--border-soft);
        padding-top: 2.5rem;
    }

    @media (max-width: 600px) {
        .action-buttons {
            flex-direction: column;
        }
    }
</style>