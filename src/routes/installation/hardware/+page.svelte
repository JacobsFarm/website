<script>
    import * as m from '$lib/paraglide/messages.js';
    import { base } from '$app/paths';
    import HardwareSection from '$lib/components/HardwareSection.svelte';
    import imgHardware1 from '$lib/assets/installation_hardware_1.jpg';
    import imgPlaceholder from '$lib/assets/place-holder 875x875.jpg';
    
    // Computers
    import imgNvidiaDesktop from '$lib/assets/Hardware_nvidia_desktop_875x875.jpg';
    import imgMacMini from '$lib/assets/Hardware_Mac_mini_m4_875x875.jpg';
    import imgJetsonNano from '$lib/assets/Hardware_jetson_nano_orin_875x875.jpg';
    import imgStandardDesktop from '$lib/assets/Hardware_standard_desktop_875x875.jpg';

    // Nieuwe toevoegingen
    import imgPoeSwitch from '$lib/assets/Hardware_poe switch_875x875.jpg';
    import imgEthernetCable from '$lib/assets/Hardware_ethernet_cable_875x875.jpg';
    import imgCrimpTool from '$lib/assets/Hardware_crimp_tool_rj45_875x875.jpg';

    $: computerOptions = [
        {
            title: m.hardware_comp_opt1_title(),
            desc: m.hardware_comp_opt1_desc(),
            moreInfo: m.hardware_comp_opt1_more(),
            imageSrc: imgNvidiaDesktop,
            imageAlt: "Gaming PC",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_comp_opt2_title(),
            desc: m.hardware_comp_opt2_desc(),
            moreInfo: m.hardware_comp_opt2_more(),
            imageSrc: imgMacMini,
            imageAlt: "Mac mini",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_comp_opt3_title(),
            desc: m.hardware_comp_opt3_desc(),
            moreInfo: m.hardware_comp_opt3_more(),
            imageSrc: imgJetsonNano,
            imageAlt: "Jetson Nano",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_comp_opt4_title(),
            desc: m.hardware_comp_opt4_desc(),
            moreInfo: m.hardware_comp_opt4_more(),
            imageSrc: imgStandardDesktop,
            imageAlt: "Refurbished PC",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        }
    ];

    $: cameraOptions = [
        {
            title: m.hardware_cam_opt1_title(),
            desc: m.hardware_cam_opt1_desc(),
            moreInfo: m.hardware_cam_opt1_more(),
            imageSrc: imgHardware1,
            imageAlt: "Standard Camera",
            imageLink: "#",
            videoLink: null,
            // De nieuwe PDF link toegevoegd:
            pdfLink: "/docs/camera_setup_trackmix.pdf"
        }
    ];

    $: requirementsOptions = [
        {
            title: m.hardware_req_opt1_title(),
            desc: m.hardware_req_opt1_desc(),
            moreInfo: m.hardware_req_opt1_more(),
            imageSrc: imgPoeSwitch,
            imageAlt: "PoE Switch",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_req_opt2_title(),
            desc: m.hardware_req_opt2_desc(),
            moreInfo: m.hardware_req_opt2_more(),
            imageSrc: imgEthernetCable,
            imageAlt: "Internet Cable",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_req_opt3_title(),
            desc: m.hardware_req_opt3_desc(),
            moreInfo: m.hardware_req_opt3_more(),
            imageSrc: imgPlaceholder, // Nog geen afbeelding voor de waterdichte doos
            imageAlt: "Waterproof Box",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        }
    ];

    $: diyOptions = [
        {
            title: m.hardware_diy_opt1_title(),
            desc: m.hardware_diy_opt1_desc(),
            moreInfo: m.hardware_diy_opt1_more(),
            imageSrc: imgCrimpTool,
            imageAlt: "Crimp Tool",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_diy_opt2_title(),
            desc: m.hardware_diy_opt2_desc(),
            moreInfo: m.hardware_diy_opt2_more(),
            imageSrc: imgPlaceholder, // Nog geen afbeelding voor connectoren
            imageAlt: "Pass-through Connectors",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_diy_opt3_title(),
            desc: m.hardware_diy_opt3_desc(),
            moreInfo: m.hardware_diy_opt3_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "DIY IP Box Components",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
        },
        {
            title: m.hardware_diy_opt4_title(),
            desc: m.hardware_diy_opt4_desc(),
            moreInfo: m.hardware_diy_opt4_more(),
            imageSrc: imgPlaceholder,
            imageAlt: "Impact-Resistant PVC",
            imageLink: "#",
            videoLink: null,
            pdfLink: null
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
        <a href="{base}/installation" class="btn secondary-btn">&larr; {m.hardware_btn_back()}</a>
        <a href="{base}/installation/options" class="btn primary-btn">{m.hardware_btn_next()} &rarr;</a>
    </div>
</div>

<style>
    :global(body) {
        background-color: oklch(98% 0.005 145);
        font-family: 'Roboto', sans-serif;
        margin: 0;
        color: #333;
        overflow-x: hidden;
    }

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
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(3rem, 6vw, 4.5rem);
        color: #386938;
        margin-top: 0;
        margin-bottom: 1rem;
        text-transform: uppercase;
        line-height: 1;
    }

    .intro-text {
        font-size: 1.3rem;
        color: #4DA699;
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
        border-top: 2px solid #e0eee0;
        padding-top: 2.5rem;
    }

    .btn {
        display: inline-block;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: bold;
        font-size: 1.1rem;
        text-decoration: none;
        transition: background 0.2s, transform 0.2s;
        text-align: center;
    }

    .btn:hover {
        transform: translateY(-3px);
    }

    .primary-btn {
        background: oklch(65% 0.16 75);
        color: #ffffff;
    }

    .primary-btn:hover {
        background: oklch(60% 0.16 75);
    }

    .secondary-btn {
        background: #386938;
        color: #ffffff;
    }

    .secondary-btn:hover {
        background: oklch(60% 0.09 195);
    }

    @media (max-width: 600px) {
        .action-buttons {
            flex-direction: column;
        }
        .btn {
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>