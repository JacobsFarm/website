<script>
    import * as m from '$lib/paraglide/messages.js';
    
    import calvingcatcher1 from '$lib/assets/calvingcatcher_1.jpg';
    import calvingcatcher2 from '$lib/assets/calvingcatcher_2.jpg';
    import calvingcatcher3 from '$lib/assets/calvingcatcher_3.jpg';
    import calvingcatcher4 from '$lib/assets/calvingcatcher_4.jpg';
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    
    :global(body) {
        --brand-hero: #386938;
        --accent-1: #CCFF00;
        --accent-2: #4DA699;
        --base-bg: #F9FBF9;
        --font-heading: 'Bebas Kai', sans-serif;
        --font-body: 'Roboto', sans-serif;
        background-color: var(--base-bg);
        color: #333;
        font-family: var(--font-body);
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem; }
    h1, h2, h3 { font-family: var(--font-heading); color: var(--brand-hero); text-transform: uppercase; letter-spacing: 1px; }
    h1 { font-size: 2.5rem; border-bottom: 4px solid var(--accent-1); display: inline-block; margin-bottom: 0.5rem; }
    h2 { font-size: 2rem; margin-top: 2.5rem; border-bottom: 2px solid var(--accent-2); padding-bottom: 0.5rem; }
    
    .hero { text-align: center; margin-bottom: 3rem; padding: 2rem 1rem; background-color: var(--brand-hero); color: var(--base-bg); border-radius: 8px; }
    .hero h1 { color: var(--accent-1); border-bottom: none; }
    .hero p { font-size: 1.1rem; max-width: 800px; margin: 0.5rem auto; }
    
    .grid-2 { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
    
    .card { background: white; padding: 1.25rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 1.5rem; border-left: 5px solid var(--accent-2); }
    .workflow-box { background: var(--accent-1); color: var(--brand-hero); padding: 1.25rem; border-radius: 8px; font-weight: bold; text-align: center; margin: 1.5rem 0; font-size: 1.1rem; }
    
    ul { list-style-type: square; padding-left: 1.5rem; }
    li { margin-bottom: 0.75rem; }
    
    .img-fluid { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); display: block; }
    
    .footer-note { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #ccc; font-size: 0.9rem; text-align: center; }
    
    .btn { display: inline-block; background-color: var(--brand-hero); color: var(--base-bg); padding: 12px 24px; text-decoration: none; font-family: var(--font-heading); font-size: 1.2rem; border-radius: 4px; transition: background-color 0.3s; margin-top: 1rem; }
    .btn:hover { background-color: var(--accent-1); color: var(--brand-hero); }

    @media (min-width: 768px) {
        .container { padding: 3rem 2rem; }
        h1 { font-size: 3.5rem; }
        h2 { font-size: 2.5rem; margin-top: 3.5rem; }
        .hero { padding: 4rem 3rem; }
        .hero p { font-size: 1.25rem; }
        .grid-2 { grid-template-columns: 1fr 1fr; gap: 3rem; }
        .workflow-box { font-size: 1.25rem; padding: 2rem; margin: 2.5rem 0; }
    }
</style>

<div class="container">
    <header class="hero">
        <h1>{m.calvingcatcher_title()}</h1>
        <p><strong>{m.calvingcatcher_subtitle()}</strong></p>
        <p>{m.calvingcatcher_hero_description()}</p>
    </header>

    <section class="grid-2">
        <div>
            <h2>{m.calvingcatcher_basics_title()}</h2>
            <div class="card">
                <ul>
                    <li>{m.calvingcatcher_basics_monitoring()}</li>
                    <li>{m.calvingcatcher_basics_ai()}</li>
                    <li>{m.calvingcatcher_basics_alerts()}</li>
                    <li>{m.calvingcatcher_basics_non_intrusive()}</li>
                    <li>{m.calvingcatcher_basics_local()}</li>
                </ul>
            </div>
        </div>
        <div>
            <img src={calvingcatcher1} alt="Calving monitoring basics" class="img-fluid" />
        </div>
    </section>

    <section>
        <h2>{m.calvingcatcher_smart_title()}</h2>
        <div class="card">
            <p>{m.calvingcatcher_smart_learned()}</p>
            <p>{m.calvingcatcher_smart_confidence()}</p>
        </div>
    </section>

    <section class="grid-2">
        <div>
            <img src={calvingcatcher2} alt="AI analysis of calving" class="img-fluid" />
        </div>
        <div>
            <h2>{m.calvingcatcher_practice_title()}</h2>
            <ul>
                <li>{m.calvingcatcher_practice_continuous()}</li>
                <li>{m.calvingcatcher_practice_analysis()}</li>
                <li>{m.calvingcatcher_practice_detection()}</li>
                <li>{m.calvingcatcher_practice_perfect_shot()}</li>
                <li>{m.calvingcatcher_practice_notification()}</li>
            </ul>
        </div>
    </section>

    <section>
        <h2>{m.calvingcatcher_control_title()}</h2>
        <div class="card">
            <p>{m.calvingcatcher_control_tool()}</p>
            <p>{m.calvingcatcher_control_id()}</p>
            <p>{m.calvingcatcher_control_physical()}</p>
            <p>{m.calvingcatcher_control_eyes()}</p>
        </div>
        
        <div class="workflow-box">
            {m.calvingcatcher_workflow_title()}: {m.calvingcatcher_workflow_step1()} &rarr; {m.calvingcatcher_workflow_step2()} &rarr; {m.calvingcatcher_workflow_step3()} &rarr; {m.calvingcatcher_workflow_step4()} &rarr; {m.calvingcatcher_workflow_step5()}
        </div>
    </section>

    <section class="grid-2">
        <div>
            <h2>{m.calvingcatcher_value_title()}</h2>
            <ul>
                <li>{m.calvingcatcher_value_constant()}</li>
                <li>{m.calvingcatcher_value_night()}</li>
                <li>{m.calvingcatcher_value_fast()}</li>
                <li>{m.calvingcatcher_value_precision()}</li>
            </ul>
        </div>
        <div>
            <img src={calvingcatcher3} alt="Insights and value" class="img-fluid" />
        </div>
    </section>

    <section>
        <h2>{m.calvingcatcher_privacy_title()}</h2>
        <div class="card">
            <ul>
                <li>{m.calvingcatcher_privacy_local()}</li>
                <li>{m.calvingcatcher_privacy_req()}</li>
                <li>{m.calvingcatcher_privacy_platforms()}</li>
                <li>{m.calvingcatcher_privacy_storage()}</li>
                <li>{m.calvingcatcher_privacy_improvement()}</li>
            </ul>
        </div>
    </section>

    <section>
        <h2>{m.calvingcatcher_needs_title()}</h2>
        <div class="card">
            <ul>
                <li>{m.calvingcatcher_needs_pc()}</li>
                <li>{m.calvingcatcher_needs_camera()}</li>
                <li>{m.calvingcatcher_needs_switch()}</li>
                <li>{m.calvingcatcher_needs_cable()}</li>
                <li>{m.calvingcatcher_needs_internet()}</li>
            </ul>
        </div>
    </section>

    <section class="grid-2">
        <div>
            <img src={calvingcatcher4} alt="Hardware Setup" class="img-fluid" />
        </div>
        <div>
            <h2>{m.calvingcatcher_provide_title()}</h2>
            <ul>
                <li>{m.calvingcatcher_provide_model()}</li>
                <li>{m.calvingcatcher_provide_privacy()}</li>
                <li>{m.calvingcatcher_provide_os()}</li>
            </ul>
        </div>
    </section>

    <footer class="footer-note">
        <h3>{m.calvingcatcher_disclaimer_title()}</h3>
        <p>{m.calvingcatcher_disclaimer_risk()}</p>
        <p>{m.calvingcatcher_disclaimer_fair()}</p>
        <a href="https://github.com/CowCatcherAI/CowCatcherAI" class="btn" target="_blank">
            {m.calvingcatcher_github_button()}
        </a>
    </footer>
</div>