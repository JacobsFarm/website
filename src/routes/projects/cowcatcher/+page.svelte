<script>
    import * as m from '$lib/paraglide/messages.js';

    // Herbruikbare componenten
    import ProjectHero from '$lib/components/ProjectHero.svelte';
    import HighlightBlock from '$lib/components/HighlightBlock.svelte';
    import InfoWithImage from '$lib/components/InfoWithImage.svelte';

    // Assets importeren
    import logo from '$lib/assets/CowCatchter-logo-875x875.jpg';
    import cowcatcher1 from '$lib/assets/cowcatcher_1.jpg';
    import cowcatcher2 from '$lib/assets/cowcatcher_2.jpg';
    import cowcatcher3 from '$lib/assets/cowcatcher_3.jpg';
    import cowcatcher4 from '$lib/assets/cowcatcher_4.png';
</script>

<div class="project-page">
    <ProjectHero
        {logo}
        logoAlt="CowCatcher AI Logo"
        title={m.cowcatcher_title()}
        subtitle={m.cowcatcher_subtitle()}
        description={m.cowcatcher_hero_description()}
    />

    <InfoWithImage
        title={m.cowcatcher_basics_title()}
        images={[{ src: cowcatcher1, alt: "Cow monitoring basics" }]}
    >
        <ul>
            <li>{m.cowcatcher_basics_monitoring()}</li>
            <li>{m.cowcatcher_basics_ai()}</li>
            <li>{m.cowcatcher_basics_alerts()}</li>
            <li>{m.cowcatcher_basics_non_intrusive()}</li>
            <li>{m.cowcatcher_basics_local()}</li>
        </ul>
    </InfoWithImage>

    <HighlightBlock title={m.cowcatcher_smart_title()}>
        <p>{m.cowcatcher_smart_learned()}</p>
        <p>{m.cowcatcher_smart_confidence()}</p>
    </HighlightBlock>

    <InfoWithImage
        title={m.cowcatcher_practice_title()}
        images={[{ src: cowcatcher2, alt: "AI analysis of heat behavior" }]}
        reverse={true}
    >
        <ul>
            <li>{m.cowcatcher_practice_continuous()}</li>
            <li>{m.cowcatcher_practice_analysis()}</li>
            <li>{m.cowcatcher_practice_detection()}</li>
            <li>{m.cowcatcher_practice_perfect_shot()}</li>
            <li>{m.cowcatcher_practice_notification()}</li>
        </ul>
    </InfoWithImage>

    <section>
        <h2>{m.cowcatcher_control_title()}</h2>
        <div class="custom-card">
            <p>{m.cowcatcher_control_tool()}</p>
            <p>{m.cowcatcher_control_id()}</p>
            <p>{m.cowcatcher_control_physical()}</p>
            <p>{m.cowcatcher_control_eyes()}</p>
        </div>

        <div class="workflow-box">
             {m.cowcatcher_workflow_title()}: {m.cowcatcher_workflow_step1()} &rarr;
             {m.cowcatcher_workflow_step2()} &rarr; {m.cowcatcher_workflow_step3()} &rarr; {m.cowcatcher_workflow_step4()} &rarr; {m.cowcatcher_workflow_step5()}
        </div>
    </section>

    <InfoWithImage
        title={m.cowcatcher_value_title()}
        images={[{ src: cowcatcher3, alt: "Insights and value" }]}
    >
        <ul>
            <li>{m.cowcatcher_value_constant()}</li>
            <li>{m.cowcatcher_value_night()}</li>
            <li>{m.cowcatcher_value_fast()}</li>
            <li>{m.cowcatcher_value_precision()}</li>
        </ul>
    </InfoWithImage>

    <section class="stacked-sections">
        <h2>{m.cowcatcher_privacy_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.cowcatcher_privacy_local()}</li>
                <li>{m.cowcatcher_privacy_req()}</li>
                <li>{m.cowcatcher_privacy_platforms()}</li>
                <li>{m.cowcatcher_privacy_storage()}</li>
                <li>{m.cowcatcher_privacy_improvement()}</li>
            </ul>
        </div>

        <h2>{m.cowcatcher_needs_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.cowcatcher_needs_pc()}</li>
                <li>{m.cowcatcher_needs_camera()}</li>
                <li>{m.cowcatcher_needs_switch()}</li>
                <li>{m.cowcatcher_needs_cable()}</li>
                <li>{m.cowcatcher_needs_internet()}</li>
            </ul>
        </div>

        <h2>{m.cowcatcher_provide_title()}</h2>
        <div class="custom-card">
            <ul>
                <li>{m.cowcatcher_provide_model()}</li>
                <li>{m.cowcatcher_provide_privacy()}</li>
                <li>{m.cowcatcher_provide_os()}</li>
            </ul>
            <img src={cowcatcher4} alt="Hardware Setup" class="img-fluid provide-image" />
        </div>
    </section>
</div>

<style>
    .provide-image {
        margin-top: 2rem;
    }
</style>
