<script>
    import * as m from '$lib/paraglide/messages.js';
    import agrarischOndernemerLogo from '$lib/assets/front_page_logo_agrarisch_ondernemer_2026.png';
    import prikkebordLogo from '$lib/assets/front_page_logo_prikkebord.png';

    const logos = [
        { 
            src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe72fda3c1fd7a4e08_veeteelt_logo.svg', 
            alt: 'Veeteelt',
            href: 'https://veeteelt.nl/gezondheid/gratis-ai-software-informeert-boeren-over-afkalvingen'
        },
        { 
            src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfee147649bdd8dd029_boerderij_logo.svg', 
            alt: 'Boerderij',
            href: 'https://www.boerderij.nl/video-jan-jaap-verweij-ontwikkelt-gratis-tool-voor-detecteren-tochtige-koeien'
        },
        { 
            src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe4919eaa9196cceb7_nieuwe%20oogst_logo.svg', 
            alt: 'Nieuwe Oogst',
            href: 'https://www.nieuweoogst.nl/nieuws/2025/09/30/melkveehouder-ontwikkelt-cowcatcher-gratis-programma-voor-tochtdetectie'
        },
        { 
            src: 'https://cdn.prod.website-files.com/67926f6051d52946b93dfd03/67969bfe08ff0a9f00554e61_veehouderij%20techniek_logo.svg', 
            alt: 'Veehouderij Techniek',
            href: 'https://www.mechaman.nl/veehouderij-techniek/artikel/20260310/cowcatcher-komt-met-afkalfdetectie/'
        },
        { 
            src: 'https://cdn.brandfetch.io/idgfMn7mzV/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1770955759252', 
            alt: 'VILT',
            href: 'https://vilt.be/nl/nieuws/groep-boeren-ontwikkelt-ai-tool-voor-tocht-en-afkalfdectie-melkvee'
        },
        { 
            src: 'https://cdn.brandfetch.io/idj2Epissl/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1771540125311', 
            alt: 'Omrop Fryslân',
            href: 'https://www.omropfryslan.nl/nl/nieuws/18353769/hoe-ai-de-friese-boer-kan-steunen-in-het-dagelijks-werk'
        },
        { 
            src: agrarischOndernemerLogo, 
            alt: 'Agrarisch Ondernemer 2026', 
            isWhiteLogo: true,
            href: 'https://agrarischondernemer.nl/jong-agrarisch-talent-genomineerden/' 
        },
        { 
            src: 'https://cdn.brandfetch.io/idArW_C6LY/w/2048/h/2048/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1775493657540', 
            alt: 'NOS Journaal Regio',
            href: 'https://npo.nl/start/afspelen/nos-journaal-regio_1359'
        },
        { 
            src: prikkebordLogo, 
            alt: 'prikkebord forum',
            href: 'https://www.prikkebord.nl/topic/362840/'
        }
    ];

    const carouselLogos = [...logos, ...logos];
</script>

<section class="featured-in-section">
    <h2>{m.front_page_featured_in_title()}</h2>
    
    <div class="carousel-container">
        <div class="carousel-track">
            {#each carouselLogos as logo}
                <div class="logo-item">
                    <a href={logo.href} target="_blank" rel="noopener noreferrer">
                        <img src={logo.src} alt={logo.alt} class:white-logo-fix={logo.isWhiteLogo} />
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .featured-in-section {
        margin-top: 5rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .featured-in-section h2 {
        font-family: 'Bebas Kai', sans-serif;
        font-size: clamp(2rem, 6vw, 3.5rem);
        color: #386938;
        margin-bottom: 2rem;
        text-transform: uppercase;
    }

    .carousel-container {
        overflow: hidden;
        width: 100%;
        max-width: 1000px;
        padding: 1rem 0;
        position: relative;
    }

    .carousel-container::before,
    .carousel-container::after {
        content: "";
        position: absolute;
        top: 0;
        width: 100px;
        height: 100%;
        z-index: 2;
        pointer-events: none;
    }

    .carousel-container::before {
        left: 0;
        background: linear-gradient(to right, oklch(98% 0.005 145) 0%, transparent 100%);
    }

    .carousel-container::after {
        right: 0;
        background: linear-gradient(to left, oklch(98% 0.005 145) 0%, transparent 100%);
    }

    .carousel-track {
        display: flex;
        width: calc(200px * 16);
        animation: scroll 30s linear infinite;
    }

    .carousel-track:hover {
        animation-play-state: paused;
    }

    .logo-item {
        flex: 0 0 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1.5rem;
    }

    .logo-item a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
    }

    .logo-item img {
        max-width: 100%;
        max-height: 80px;
        object-fit: contain;
        filter: grayscale(100%);
        opacity: 0.6;
        transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
        cursor: pointer;
    }

    .logo-item img:hover {
        filter: grayscale(0%);
        opacity: 1;
        transform: scale(1.15);
    }

    .logo-item img.white-logo-fix {
        background-color: oklch(22% 0.02 145);
        padding: 0.6rem 1.2rem;
        border-radius: 12px;
    }

    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-200px * 8)); }
    }

    @media (min-width: 768px) {
        .logo-item {
            flex: 0 0 250px;
        }
        .carousel-track {
            width: calc(250px * 16);
        }
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * 8)); }
        }
    }
</style>
