<script>
    import * as m from '$lib/paraglide/messages.js';
    import { links } from '$lib/config/links.js';
    import ProjectDetail from '$lib/components/ProjectDetail.svelte';

    import logo from '$lib/assets/CowCatchter-logo-875x875.jpg';
    import cowcatcher1 from '$lib/assets/cowcatcher_1.jpg';
    import cowcatcher3 from '$lib/assets/cowcatcher_3.jpg';
    import cowcatcher4 from '$lib/assets/cowcatcher_4.png';
</script>

<ProjectDetail
    prefix="cowcatcher"
    {logo}
    tag={m.home_anim_tab_heat()}
    demo={links.hfCowCatcher}
    demoLabel={m.front_page_test_cowcatcher_btn()}
    images={{
        hero: cowcatcher3,
        heroAlt: 'Barn camera view where CowCatcher marks a mounting cow with confidence 0.94',
        heroPosition: '78% 50%',
        basics: cowcatcher1,
        basicsAlt: 'Barn camera view with a mounting detection at confidence 0.92',
        practice: cowcatcher4,
        practiceAlt: 'Telegram message with the detection photo, a close-up, a video clip and the confidence score'
    }}
/>
