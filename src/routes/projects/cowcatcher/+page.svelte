<script>
    // Asset imports based on the provided tree structure
    import cowcatcher1 from '$lib/assets/cowcatcher_1.jpg';
    import cowcatcher2 from '$lib/assets/cowcatcher_2.jpg';
    import cowcatcher3 from '$lib/assets/cowcatcher_3.jpg';
    import cowcatcher4 from '$lib/assets/cowcatcher_4.png';
    import demoQrCode from '$lib/assets/cowcatcher_demo_qr_code.png';
</script>

<style>
    /* Google Fonts import for typography */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    
    :global(body) {
        /* Brand Colors */
        --brand-hero: #386938; /* Emerald Green */
        --accent-1: #CCFF00; /* Electric Lime */
        --accent-2: #4DA699; /* Soft Teal */
        --base-bg: #F9FBF9; /* Off-White */
        
        /* Typography */
        --font-heading: 'Bebas Kai', sans-serif;
        --font-body: 'Roboto', sans-serif;

        background-color: var(--base-bg);
        color: #333;
        font-family: var(--font-body);
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }

    /* Base styles (Mobile First) */
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem 1rem;
    }

    h1, h2, h3 {
        font-family: var(--font-heading);
        color: var(--brand-hero);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    h1 {
        font-size: 2.5rem;
        border-bottom: 4px solid var(--accent-1);
        display: inline-block;
        margin-bottom: 0.5rem;
    }

    h2 {
        font-size: 2rem;
        margin-top: 2.5rem;
        border-bottom: 2px solid var(--accent-2);
        padding-bottom: 0.5rem;
    }

    .hero {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem 1rem;
        background-color: var(--brand-hero);
        color: var(--base-bg);
        border-radius: 8px;
    }

    .hero h1 {
        color: var(--accent-1);
        border-bottom: none;
    }

    .hero p {
        font-size: 1.1rem;
        max-width: 800px;
        margin: 0 auto;
    }

    /* Single column layout for mobile */
    .grid-2 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: center;
    }

    .card {
        background: white;
        padding: 1.25rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        margin-bottom: 1.5rem;
        border-left: 5px solid var(--accent-2);
    }

    .workflow-box {
        background: var(--accent-1);
        color: var(--brand-hero);
        padding: 1.25rem;
        border-radius: 8px;
        font-weight: bold;
        text-align: center;
        margin: 1.5rem 0;
        font-size: 1.1rem;
    }

    ul {
        list-style-type: square;
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.75rem;
    }

    .img-fluid {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: block;
    }

    .footer-note {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #ccc;
        font-size: 0.9rem;
        text-align: center;
    }

    .btn {
        display: inline-block;
        background-color: var(--brand-hero);
        color: var(--base-bg);
        padding: 12px 24px;
        text-decoration: none;
        font-family: var(--font-heading);
        font-size: 1.2rem;
        border-radius: 4px;
        transition: background-color 0.3s;
        margin-top: 1rem;
    }

    .btn:hover {
        background-color: var(--accent-1);
        color: var(--brand-hero);
    }

    /* Media Query for Tablets and Desktops */
    @media (min-width: 768px) {
        .container {
            padding: 3rem 2rem;
        }

        h1 {
            font-size: 3.5rem;
        }

        h2 {
            font-size: 2.5rem;
            margin-top: 3.5rem;
        }

        .hero {
            padding: 4rem 3rem;
        }

        .hero p {
            font-size: 1.25rem;
        }

        /* Switch to 2 columns on larger screens */
        .grid-2 {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .workflow-box {
            font-size: 1.25rem;
            padding: 2rem;
            margin: 2.5rem 0;
        }
    }
</style>

<div class="container">
    <header class="hero">
        <h1>Cowcatcher AI </h1>
        <p>Open source project </p>
        <p>Combining the Cowcatcher vision model with the AI-detector it becomes an automated alert system that monitors cows to detect "mounting" behavior. </p>
    </header>

    <section class="grid-2">
        <div>
            <h2>The Basics </h2>
            <div class="card">
                <ul>
                    <li><strong>24/7 Monitoring:</strong> The program monitors a live camera feed pointed at the cows around the clock. </li>
                    <li><strong>Artificial Intelligence:</strong> It uses AI to automatically recognize when one cow mounts another. Its trained upon the Ultralytics framework Yolo, for its speed and accuracy. </li>
                    <li><strong>Instant Alerts:</strong> When this behavior is detected, it immediately sends a photo and video notification to your phone via Telegram or Home assistant. </li>
                    <li><strong>Non-Intrusive:</strong> Your cameras remain fully functional for live viewing; we simply "tap into" an additional stream. </li>
                    <li><strong>Local Processing:</strong> Everything runs locally on your own computer in the stable, house, or office. </li>
                </ul>
            </div>
        </div>
        <div>
            <img src={cowcatcher1} alt="Cow monitoring example" class="img-fluid" />
        </div>
    </section>

    <section>
        <h2>The "Smart" Part </h2>
        <div class="card">
            <p><strong>Learned Behavior:</strong> Just as you can recognize "in-heat" behavior, this program has been trained to do the same using a database of thousands of images. </p>
            <p><strong>Confidence Score:</strong> The system assigns a "reliability score" to every detection—indicating how certain it is that it's seeing actual heat behavior. </p>
        </div>
    </section>

    <section class="grid-2">
        <div>
            <img src={cowcatcher2} alt="AI analysis in practice" class="img-fluid" />
        </div>
        <div>
            <h2>How it Works in Practice </h2>
            <ul>
                <li><strong>Continuous Monitoring:</strong> The camera films the cows all day. </li>
                <li><strong>Smart Analysis:</strong> Every few seconds, the program analyzes the activity. </li>
                <li><strong>Detection:</strong> If heat behavior is detected with high certainty, it begins capturing and saving images to the computer. </li>
                <li><strong>The Perfect Shot:</strong> It collects several seconds of footage to capture the best moment. </li>
                <li><strong>Sending Notifications:</strong> You receive a photo and short video on your phone with the alert "Heat Detected," showing the clearest view of the mount. </li>
            </ul>
        </div>
    </section>

    <section>
        <h2>Important Considerations – You Stay in Control </h2>
        <div class="card">
            <p><strong>A Tool, Not a Replacement:</strong> AI can occasionally trigger a "false alarm." What looks like heat behavior might just be playful frolicking or a simple error. You make the final decision. </p>
            <p><strong>Animal Identification:</strong> The system does not show an ear tag/cow number. You receive a photo, but you must identify which cow it is yourself and locate her in the pen. </p>
            <p><strong>Physical Checks Remain Vital:</strong> When in doubt, always go to the stable. Check for heat mucus and other physical signs. </p>
            <p><strong>An Extra Pair of Eyes:</strong> Think of it as a digital assistant that alerts you to interesting moments, especially at night or when you are away. Your professional expertise is indispensable. </p>
        </div>
        
        <div class="workflow-box">
            Practical Workflow: Receive Notification &rarr; View Photo &rarr; Identify Animal &rarr; Check Physically &rarr; Take Decision </div>
    </section>

    <section class="grid-2">
        <div>
            <h2>Why This System is Valuable </h2>
            <ul>
                <li>You don't have to watch the cows constantly. </li>
                <li>You won't miss heat cycles, even at night. </li>
                <li>Immediate alerts allow for fast action. </li>
                <li>Identifing the exact onset of heat, allowing for precision insemination at the 16 or 24-hour mark to optimize fertility. </li>
            </ul>
        </div>
        <div>
            <img src={cowcatcher3} alt="Valuable farm insights" class="img-fluid" />
        </div>
    </section>

    <section>
        <h2>Data & Privacy </h2>
        <div class="card">
            <ul>
                <li><strong>Local Hosting:</strong> The program runs on your own computer. No external servers or cloud connections are involved. </li>
                <li><strong>Requirements:</strong> Your computer must stay on and be connected to the internet to send alerts. The program runs in the background, so the PC remains usable for other tasks. </li>
                <li><strong>Platforms:</strong> We use Telegram for alerts, or Home Assistant if you prefer a fully local smart-home setup. </li>
                <li><strong>Storage:</strong> Images are stored in a folder on your computer. Only the 2 or 3 images with the highest "confidence score" are sent to your phone. </li>
                <li><strong>Continuous Improvement:</strong> You have the option to further train the program yourself. </li>
            </ul>
        </div>
    </section>

    <section>
        <h2>What You Need </h2>
        <div class="card">
            <ul>
                <li><strong>A Computer:</strong> Ideally equipped with an NVIDIA graphics card. While it can run on lower-end computers, we would have to reduce the processing power, which may cause the system to miss mounts. (gtx 1000-series or newer) </li>
                <li><strong>IP Camera:</strong> Most brands work, provided they support RTSP streams (99% of new cameras do). A POE (Power over Ethernet) camera is easiest as it handles power and data through one cable. Example: I use a Reolink Trackmix (€170), but we have seen it work fine with €80 cameras. </li>
                <li><strong>POE Switch:</strong> To power the cameras (approx. €80 for a 4-port switch). </li>
                <li><strong>LAN Cable:</strong> Approximately €1 per meter. </li>
                <li><strong>Internet Connection.</strong> </li>
            </ul>
        </div>
    </section>

    <section class="grid-2">
        <div>
            <img src={cowcatcher4} alt="System setup requirements" class="img-fluid" />
        </div>
        <div>
            <h2>What We Provide </h2>
            <ul>
                <li><strong>The Trained AI Model:</strong> The "brain" of the system. This is a file consisting of trained neural networks (weights and biases). </li>
                <li><strong>Privacy:</strong> This file contains no images. You will never see images from other farms, and they will never see yours. </li>
                <li><strong>Open Source Software:</strong> We use a third-party open-source AI detector. This software can be used for other vision projects inside or outside the agricultural sector. </li>
            </ul>
        </div>
    </section>

    <div class="footer-note">
        <h3>Disclaimer & Licensing </h3>
        <p>Use is entirely at your own risk. The program is "open source"—it belongs to everyone and no one. You are free to modify and improve it as you see fit. </p>
        <p>CowCatcher AI is open-source software licensed under AGPL-3.0 and built on the Ultralytics framework. Provided "as is" without warranty of any kind. </p>
        
        <p>You may alter or parody the logo as you wish, but do not claim that your modified version is from the official open source project. Please be fair and direct users to the official GitHub page: https://github.com/CowCatcherAI/CowCatcherAI </p>
        <a href="https://github.com/CowCatcherAI/CowCatcherAI" class="btn" target="_blank">Visit Official GitHub Page</a>
        
        <div style="margin-top: 2rem;">
            <p>Scan to learn more:</p>
            <img src={demoQrCode} alt="Demo QR Code" style="max-width: 150px;" />
        </div>
    </div>
</div>
