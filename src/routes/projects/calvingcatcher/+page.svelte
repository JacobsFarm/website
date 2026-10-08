<script>
    import * as m from '$lib/paraglide/messages.js';
    import { links } from '$lib/config/links.js';
    import ProjectDetail from '$lib/components/ProjectDetail.svelte';

    import logo from '$lib/assets/calvingcatcherAI logo.svg';
    import calvingcatcher1 from '$lib/assets/calvingcatcher_1.jpg';
    import calvingcatcher2 from '$lib/assets/calvingcatcher_2.jpg';
    import calvingcatcher3 from '$lib/assets/calvingcatcher_3.jpg';
    import calvingcatcher4 from '$lib/assets/calvingcatcher_4.jpg';
</script>

<ProjectDetail
    prefix="calvingcatcher"
    {logo}
    tag={m.home_anim_tab_calving()}
    demo={links.hfCalvingCatcher}
    demoLabel={m.front_page_test_calvingcatcher_btn()}
    images={{
        hero: calvingcatcher2,
        heroAlt: 'Camera image of a calving cow where CalvingCatcher marks the head of the calf',
        basics: calvingcatcher1,
        basicsAlt: 'Calving pen seen through the barn camera',
        extra: calvingcatcher4,
        extraAlt: 'Top-down camera view of a calving pen with a detected newborn calf',
        practice: calvingcatcher3,
        practiceAlt: 'CalvingCatcher detection during a calving'
    }}
/>
