<script>
    import * as m from '$lib/paraglide/messages.js';

    // Herbruikbare componenten
    import ProjectHero from '$lib/components/ProjectHero.svelte';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';

    // Assets importeren
    import logo from '$lib/assets/calvingcatcher-logo-875x-875.jpg';
    import calvingcatcher1 from '$lib/assets/calvingcatcher_1.jpg';
    import calvingcatcher2 from '$lib/assets/calvingcatcher_2.jpg';
    import calvingcatcher3 from '$lib/assets/calvingcatcher_3.jpg';
    import calvingcatcher4 from '$lib/assets/calvingcatcher_4.jpg';
</script>

<div class="project-page">
    <ProjectHero
        {logo}
        logoAlt="CalvingCatcher AI Logo"
        title={m.calvingcatcher_title()}
        subtitle={m.calvingcatcher_subtitle()}
        description={m.calvingcatcher_hero_description()}
    />

    <InfoWithImage
        title={m.calvingcatcher_basics_title()}
        images={[
            { src: calvingcatcher1, alt: "Calving monitoring basics" },
            { src: calvingcatcher4, alt: "Hardware Setup / The Basics" }
        ]}
    >
        <ul>
            <li>{m.calvingcatcher_basics_monitoring()}</li>
            <li>{m.calvingcatcher_basics_ai()}</li>
            <li>{m.calvingcatcher_basics_alerts()}</li>
            <li>{m.calvingcatcher_basics_non_intrusive()}</li>
            <li>{m.calvingcatcher_basics_local()}</li>
        </ul>
    </InfoWithImage>

    <HighlightBlock title={m.calvingcatcher_smart_title()}>
        <p>{m.calvingcatcher_smart_learned()}</p>
        <p>{m.calvingcatcher_smart_confidence()}</p>
    </HighlightBlock>

    <InfoWithImage
        title={m.calvingcatcher_practice_title()}
        images={[{ src: calvingcatcher2, alt: "AI analysis of calving" }]}
        reverse={true}
    >
        <ul>
            <li>{m.calvingcatcher_practice_continuous()}</li>
            <li>{m.calvingcatcher_practice_analysis()}</li>
            <li>{m.calvingcatcher_practice_detection()}</li>
            <li>{m.calvingcatcher_practice_perfect_shot()}</li>
            <li>{m.calvingcatcher_practice_notification()}</li>
        </ul>
    </InfoWithImage>

    <section>
        <h2>{m.calvingcatcher_control_title()}</h2>
        <div class="custom-card">
            <p>{m.calvingcatcher_control_tool()}</p>
            <p>{m.calvingcatcher_control_id()}</p>
            <p>{m.calvingcatcher_control_physical()}</p>
            <p>{m.calvingcatcher_control_eyes()}</p>
        </div>

        <div class="workflow-box">
             {m.calvingcatcher_workflow_title()}: {m.calvingcatcher_workflow_step1()} &rarr;
             {m.calvingcatcher_workflow_step2()} &rarr; {m.calvingcatcher_workflow_step3()} &rarr; {m.calvingcatcher_workflow_step4()} &rarr; {m.calvingcatcher_workflow_step5()}
        </div>
    </section>

    <InfoWithImage
        title={m.calvingcatcher_value_title()}
        images={[{ src: calvingcatcher3, alt: "Insights and value" }]}
    >
        <ul>
            <li>{m.calvingcatcher_value_constant()}</li>
            <li>{m.calvingcatcher_value_night()}</li>
            <li>{m.calvingcatcher_value_fast()}</li>
            <li>{m.calvingcatcher_value_precision()}</li>
        </ul>
    </InfoWithImage>

    <section class="stacked-sections">
        <h2>{m.calvingcatcher_privacy_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_privacy_local()}</li>
                <li>{m.calvingcatcher_privacy_req()}</li>
                <li>{m.calvingcatcher_privacy_platforms()}</li>
                <li>{m.calvingcatcher_privacy_storage()}</li>
                <li>{m.calvingcatcher_privacy_improvement()}</li>
            </ul>
        </div>

        <h2>{m.calvingcatcher_needs_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_needs_pc()}</li>
                <li>{m.calvingcatcher_needs_camera()}</li>
                <li>{m.calvingcatcher_needs_switch()}</li>
                <li>{m.calvingcatcher_needs_cable()}</li>
                <li>{m.calvingcatcher_needs_internet()}</li>
            </ul>
        </div>

        <h2>{m.calvingcatcher_provide_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.calvingcatcher_provide_model()}</li>
                <li>{m.calvingcatcher_provide_privacy()}</li>
                <li>{m.calvingcatcher_provide_os()}</li>
            </ul>
        </div>
    </section>
</div>
