<script>
    import * as m from '$lib/paraglide/messages.js';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    </script>

    <header style="text-align: center; margin-bottom: 3rem;">
      <h1>{m.title()}</h1>
      <p>{m.subtitle()}</p>
    </header>

    <div class="projects-grid">
      <ProjectCard title="CowCatcher" link="/projects/cowcatcher" desc={m.cowcatcher_desc()} />
      <ProjectCard title="CalfCatcher" link="/projects/calfcatcher" desc={m.calfcatcher_desc()} />
      <ProjectCard title="AI Detector WebApp" link="/projects/ai-detector" desc={m.ai_detector_desc()} />
    </div>

    <style>
      .projects-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    </style>