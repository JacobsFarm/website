<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { reveal } from '$lib/actions/reveal.js';
	import { links } from '$lib/config/links.js';
	import { projects } from '$lib/config/projects.js';
	import { splitMotto, stripEmoji, stripNumber } from '$lib/utils/text.js';

	import Seo from '$lib/components/Seo.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import HeroAnimation from '$lib/components/hero/HeroAnimation.svelte';
	import FeaturedIn from '$lib/components/FeaturedIn.svelte';
	import VideoEmbed from '$lib/components/VideoEmbed.svelte';

	import imgHeat from '$lib/assets/cowcatcher_2.jpg';
	import imgCalving from '$lib/assets/calvingcatcher_2.jpg';
	import imgDetector from '$lib/assets/installation_software_step_7.jpg';
	import imgHardware from '$lib/assets/installation_hardware_1.jpg';
	import imgSoftware from '$lib/assets/installation_software_1.jpg';
	import imgOptions from '$lib/assets/installation_software_options_1.jpg';
	import hfLogo from '$lib/assets/hf-logo-pirate.svg';

	const motto = splitMotto(m.front_page_subtitle());
	const [cowcatcher, calvingcatcher, aiDetector] = projects;

	const trust = [
		m.home_trust_free,
		m.home_trust_local,
		m.home_trust_camera,
		m.home_trust_nocollar
	];

	const how = [
		{ icon: 'camera', title: m.home_how_1_title, desc: m.home_how_1_desc },
		{ icon: 'computer', title: m.home_how_2_title, desc: m.home_how_2_desc },
		{ icon: 'phone', title: m.home_how_3_title, desc: m.home_how_3_desc }
	];

	const values = [
		{ icon: 'users', title: m.front_page_feature_community_title, desc: m.front_page_feature_community_desc },
		{ icon: 'unlock', title: m.front_page_feature_free_title, desc: m.front_page_feature_free_desc },
		{ icon: 'spark', title: m.front_page_feature_smart_title, desc: m.front_page_feature_smart_desc }
	];

	const installSteps = [
		{ href: '/installation/hardware', title: m.install_card_hardware_title, desc: m.install_card_hardware_desc, img: imgHardware },
		{ href: '/installation/download', title: m.install_card_software_title, desc: m.install_card_software_desc, img: imgSoftware },
		{ href: '/installation/options', title: m.install_card_options_title, desc: m.install_card_options_desc, img: imgOptions }
	];

	// Tellers die oplopen zodra het statistiekblok in beeld komt.
	const stats = [
		{ target: 55, suffix: '', label: m.front_page_stats_farms },
		{ target: 200, suffix: 'K+', label: m.front_page_stats_detections },
		{ target: 6, suffix: '', label: m.front_page_stats_countries }
	].map((stat) => ({
		...stat,
		tween: new Tween(0, { duration: 2200, easing: cubicOut })
	}));

	let statsRef = $state();

	$effect(() => {
		if (!statsRef) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			for (const stat of stats) stat.tween.set(stat.target, { duration: 0 });
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					for (const stat of stats) stat.tween.target = stat.target;
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);

		observer.observe(statsRef);
		return () => observer.disconnect();
	});
</script>

<Seo title={m.home_hero_title_a() + ' ' + m.home_hero_title_b()} description={m.home_hero_lead()} />

<!-- ═════════════════════ Hero ═════════════════════ -->
<section class="hero">
	<div class="hero-bg" aria-hidden="true"></div>
	<div class="container hero-grid">
		<div class="hero-copy">
			<span class="eyebrow rise" style="--d: 0ms">{m.home_eyebrow()}</span>

			<h1 class="h-display hero-title">
				<span class="rise" style="--d: 80ms">{m.home_hero_title_a()}</span>
				<em class="rise" style="--d: 160ms">{m.home_hero_title_b()}</em>
			</h1>

			<p class="motto rise" style="--d: 240ms">
				{#each motto as part, i}
					<span>{part}</span>{#if i < motto.length - 1}<i aria-hidden="true"></i>{/if}
				{/each}
			</p>

			<p class="lead rise" style="--d: 300ms">{m.home_hero_lead()}</p>

			<div class="btn-row rise" style="--d: 380ms">
				<a href="{base}/installation" class="btn btn--solid btn--lg">
					{m.front_page_intro_btn_install()}
					<span class="btn__icon"><Icon name="arrow-right" /></span>
				</a>
				<a href="#video" class="btn btn--ghost btn--lg">
					<Icon name="play" size={14} />
					{m.home_cta_watch()}
				</a>
			</div>

			<ul class="trust rise" style="--d: 460ms">
				{#each trust as item}
					<li><Icon name="check" size={16} stroke={2.2} />{item()}</li>
				{/each}
			</ul>
		</div>

		<div class="hero-visual rise" style="--d: 200ms">
			<HeroAnimation />
		</div>
	</div>
</section>

<FeaturedIn />

<!-- ═════════════════════ Hoe het werkt ═════════════════════ -->
<section class="section how" id="how">
	<div class="container">
		<header class="section-head section-head--split" use:reveal>
			<span class="eyebrow">{m.home_how_eyebrow()}</span>
			<h2 class="h-section">{m.home_how_title()}</h2>
			<p class="lead">{m.home_how_lead()}</p>
		</header>

		<ol class="pipeline" use:reveal={{ stagger: 120 }}>
			{#each how as step, i}
				<li class="pipe-step">
					<div class="pipe-icon">
						<Icon name={step.icon} size={30} stroke={1.4} />
						<span class="pipe-num">0{i + 1}</span>
					</div>
					<h3>{step.title()}</h3>
					<p>{step.desc()}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ═════════════════════ Video ═════════════════════ -->
<section class="section video-section" id="video">
	<div class="container">
		<header class="section-head section-head--split" use:reveal>
			<span class="eyebrow">{m.home_video_eyebrow()}</span>
			<h2 class="h-section">{m.home_video_title()}</h2>
			<p class="lead">{m.home_video_lead()}</p>
		</header>
		<div use:reveal>
			<VideoEmbed title={m.home_video_title()} />
		</div>
	</div>
</section>

<!-- ═════════════════════ De tools ═════════════════════ -->
<section class="section tools">
	<div class="container">
		<header class="section-head" use:reveal>
			<span class="eyebrow">{m.home_tools_eyebrow()}</span>
			<h2 class="h-section">{m.home_tools_title()}</h2>
			<p class="lead">{m.home_tools_lead()}</p>
		</header>

		<div class="bento" use:reveal={{ stagger: 110 }}>
			<a href="{base}{cowcatcher.link}" class="tool tool--heat bezel">
				<div class="bezel__inner tool-inner">
					<div class="tool-media">
						<img src={imgHeat} alt="Barn camera view where CowCatcher marks a mounting cow with confidence 0.92" loading="lazy" />
					</div>
					<div class="tool-body">
						<span class="chip chip--amber">{m.home_anim_tab_heat()}</span>
						<h3>{cowcatcher.title()}</h3>
						<p>{cowcatcher.desc()}</p>
						<span class="tool-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
					</div>
				</div>
			</a>

			<a href="{base}{calvingcatcher.link}" class="tool tool--calving bezel">
				<div class="bezel__inner tool-inner">
					<div class="tool-media">
						<img src={imgCalving} alt="Calving pen camera view where CalvingCatcher marks the calf's head" loading="lazy" />
					</div>
					<div class="tool-body">
						<span class="chip chip--amber">{m.home_anim_tab_calving()}</span>
						<h3>{calvingcatcher.title()}</h3>
						<p>{calvingcatcher.desc()}</p>
						<span class="tool-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
					</div>
				</div>
			</a>

			<a href="{base}{aiDetector.link}" class="tool tool--detector bezel">
				<div class="bezel__inner tool-inner">
					<div class="tool-body">
						<span class="chip">{m.home_tools_detector_tag()}</span>
						<h3>{aiDetector.title()}</h3>
						<p>{aiDetector.desc()}</p>
						<span class="tool-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
					</div>
					<div class="tool-media tool-media--screen">
						<img src={imgDetector} alt="The AI Detector web interface: adding a detector with the Cow Catcher preset" loading="lazy" />
					</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- ═════════════════════ Voor boeren, door boeren ═════════════════════ -->
<section class="section story">
	<div class="story-glow" aria-hidden="true"></div>
	<div class="container">
		<div class="story-grid">
			<header class="story-head" use:reveal>
				<span class="eyebrow eyebrow--dark">{m.home_story_eyebrow()}</span>
				<h2 class="story-title">{m.front_page_intro_title()}</h2>
				<p class="story-motto">
					{#each motto as part, i}
						<span class:accent={i === motto.length - 1}>{part}</span>
					{/each}
				</p>
			</header>

			<div class="story-text" use:reveal={{ stagger: 90 }}>
				<p class="story-lead">{m.front_page_intro_p1()}</p>
				<p>{m.front_page_intro_p2()}</p>
				<p>{m.front_page_intro_p3()}</p>
				<blockquote>{m.front_page_intro_p4()}</blockquote>
			</div>
		</div>

		<ul class="values" use:reveal={{ stagger: 100 }}>
			{#each values as value}
				<li>
					<span class="value-icon"><Icon name={value.icon} size={22} /></span>
					<h3>{stripEmoji(value.title())}</h3>
					<p>{value.desc()}</p>
				</li>
			{/each}
		</ul>

		<div class="stats" bind:this={statsRef}>
			<div class="stats-head">
				<h3>{m.front_page_stats_title()}</h3>
				<p>{m.front_page_stats_subtitle()}</p>
			</div>
			<dl class="stats-grid">
				{#each stats as stat}
					<div class="stat">
						<dt>{stat.label()}</dt>
						<dd>{Math.floor(stat.tween.current)}{stat.suffix}</dd>
					</div>
				{/each}
			</dl>
			<p class="stats-note">{m.front_page_stats_disclaimer()}</p>
		</div>

		<div class="story-cta" use:reveal>
			<p>{m.front_page_intro_p5()}</p>
			<div class="btn-row">
				<a href="{base}/installation" class="btn btn--amber btn--lg">
					{m.front_page_intro_btn_install()}
					<span class="btn__icon"><Icon name="arrow-right" /></span>
				</a>
				<a href="#community" class="btn btn--ghost-dark btn--lg">{m.front_page_intro_btn_help()}</a>
			</div>
		</div>
	</div>
</section>

<!-- ═════════════════════ Zelf testen ═════════════════════ -->
<section class="section section--tight demo">
	<div class="container">
		<div class="demo-card surface" use:reveal>
			<img src={hfLogo} alt="" class="hf" width="72" height="72" />
			<div class="demo-copy">
				<span class="eyebrow">{m.home_demo_eyebrow()}</span>
				<h2 class="h-section demo-title">{m.front_page_test_models_title()}</h2>
				<p class="muted">{m.front_page_test_models_subtitle()}</p>
			</div>
			<div class="demo-actions">
				<a href={links.hfCowCatcher} target="_blank" rel="noopener noreferrer" class="btn btn--solid btn--block">
					{m.front_page_test_cowcatcher_btn()}
					<span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
				</a>
				<a href={links.hfCalvingCatcher} target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--block">
					{m.front_page_test_calvingcatcher_btn()}
					<span class="btn__icon btn__icon--up"><Icon name="arrow-up-right" /></span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- ═════════════════════ Installatie ═════════════════════ -->
<section class="section install">
	<div class="container">
		<header class="section-head section-head--split" use:reveal>
			<span class="eyebrow">{m.nav_install()}</span>
			<h2 class="h-section">{m.home_install_title()}</h2>
			<p class="lead">{m.home_install_lead()}</p>
		</header>

		<ol class="install-steps" use:reveal={{ stagger: 110 }}>
			{#each installSteps as step, i}
				<li>
					<a href="{base}{step.href}" class="install-step">
						<div class="install-img">
							<img src={step.img} alt="" loading="lazy" />
							<span class="install-num">0{i + 1}</span>
						</div>
						<div class="install-body">
							<h3>{stripNumber(step.title())}</h3>
							<p>{step.desc()}</p>
							<span class="tool-link">{m.read_more()} <Icon name="arrow-right" size={16} /></span>
						</div>
					</a>
				</li>
			{/each}
		</ol>

		<div class="install-cta" use:reveal>
			<a href="{base}/installation" class="btn btn--solid btn--lg">
				{m.front_page_intro_btn_install()}
				<span class="btn__icon"><Icon name="arrow-right" /></span>
			</a>
		</div>
	</div>
</section>

<!-- ═════════════════════ Community ═════════════════════ -->
<section class="section community" id="community">
	<div class="container">
		<div class="community-card" use:reveal>
			<div class="community-copy">
				<span class="eyebrow">{m.home_community_eyebrow()}</span>
				<h2 class="h-section">{m.home_community_title()}</h2>
				<p class="lead">{m.home_community_text()}</p>
			</div>
			<ul class="community-links">
				<li>
					<a href={links.telegram} target="_blank" rel="noopener noreferrer" class="c-link">
						<Icon name="telegram" size={22} /><span>Telegram</span><Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li>
					<a href={links.facebook} target="_blank" rel="noopener noreferrer" class="c-link">
						<Icon name="facebook" size={22} /><span>Facebook</span><Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li>
					<a href={links.github} target="_blank" rel="noopener noreferrer" class="c-link">
						<Icon name="github" size={22} /><span>GitHub</span><Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li>
					<a href="mailto:{links.email}" class="c-link">
						<Icon name="mail" size={22} /><span>{links.email}</span><Icon name="arrow-right" size={16} />
					</a>
				</li>
			</ul>
		</div>
	</div>
</section>

<style>
	/* ── Hero ── */
	.hero {
		position: relative;
		padding-top: calc(var(--nav-offset) + clamp(1rem, 4vw, 3rem));
		padding-bottom: clamp(3rem, 6vw, 5rem);
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(48rem 32rem at 12% 8%, oklch(92% 0.05 145 / 0.9), transparent 70%),
			radial-gradient(40rem 30rem at 88% 70%, oklch(93% 0.06 80 / 0.7), transparent 70%),
			linear-gradient(oklch(22% 0.02 145 / 0.045) 1px, transparent 1px) 0 0 / 100% 64px,
			linear-gradient(90deg, oklch(22% 0.02 145 / 0.045) 1px, transparent 1px) 0 0 / 64px 100%;
		-webkit-mask-image: linear-gradient(180deg, #000 55%, transparent);
		mask-image: linear-gradient(180deg, #000 55%, transparent);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
	}

	.hero-copy {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
		justify-items: start;
	}

	.hero-title {
		display: grid;
		font-size: clamp(3.25rem, 6vw, 5.6rem);
	}

	.hero-title em {
		color: var(--primary);
	}

	.motto {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.75rem;
		font-family: var(--font-heading);
		font-size: clamp(1.35rem, 2.2vw, 1.7rem);
		letter-spacing: 0.04em;
		line-height: 1.1;
		color: var(--accent-teal);
	}

	.motto i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent-amber);
	}

	.trust {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, max-content));
		gap: 0.6rem 1.5rem;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
		font-size: 0.92rem;
		color: var(--text-muted);
	}

	.trust li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.trust :global(svg) {
		color: var(--primary);
	}

	.rise {
		animation: rise 1s var(--ease-out) both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(24px);
			filter: blur(6px);
		}
	}

	@media (min-width: 1080px) {
		.hero {
			min-height: 100dvh;
			display: flex;
			align-items: center;
		}

		.hero-grid {
			grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
		}
	}

	@media (max-width: 520px) {
		.trust {
			grid-template-columns: 1fr;
		}

		.hero .btn-row .btn {
			width: 100%;
		}
	}

	/* ── Hoe het werkt ── */
	.pipeline {
		position: relative;
		display: grid;
		gap: 2.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pipe-step {
		position: relative;
		display: grid;
		gap: 0.75rem;
		align-content: start;
	}

	.pipe-icon {
		position: relative;
		display: grid;
		place-items: center;
		width: 4.5rem;
		height: 4.5rem;
		margin-bottom: 0.75rem;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		color: var(--primary);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-md);
	}

	.pipe-num {
		position: absolute;
		top: -0.55rem;
		right: -0.75rem;
		padding: 0.15rem 0.45rem;
		border-radius: var(--radius-xs);
		background: var(--accent-amber);
		color: var(--text-main);
		font-family: var(--font-heading);
		font-size: 1rem;
		line-height: 1.1;
	}

	.pipe-step h3 {
		font-size: 1.3rem;
	}

	.pipe-step p {
		color: var(--text-muted);
		max-width: 34ch;
	}

	@media (min-width: 860px) {
		.pipeline {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 3rem;
		}

		/* Stippellijn tussen de iconen, met een "signaal" dat erover loopt. */
		.pipeline::before {
			content: '';
			position: absolute;
			top: 2.25rem;
			left: 5.5rem;
			right: calc(33.33% - 1rem);
			height: 2px;
			background: repeating-linear-gradient(90deg, var(--line-strong) 0 8px, transparent 8px 16px);
		}

		.pipeline::after {
			content: '';
			position: absolute;
			top: calc(2.25rem - 4px);
			left: 5.5rem;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--accent-amber);
			box-shadow: 0 0 0 6px oklch(65% 0.16 75 / 0.18);
			animation: signal 4s var(--ease-spring) infinite;
		}
	}

	@keyframes signal {
		0% {
			transform: translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		85% {
			opacity: 1;
		}
		100% {
			transform: translateX(min(54vw, 640px));
			opacity: 0;
		}
	}

	/* ── Video ── */
	.video-section {
		padding-top: 0;
	}

	/* ── Tools (bento) ── */
	.tools {
		background: linear-gradient(180deg, transparent, var(--bg-sunken) 30%, var(--bg-sunken) 70%, transparent);
	}

	.bento {
		display: grid;
		gap: 1rem;
	}

	.tool {
		display: block;
		color: inherit;
		text-decoration: none;
		transition: transform var(--dur) var(--ease-spring);
	}

	.tool:hover {
		transform: translateY(-4px);
	}

	.tool-inner {
		display: flex;
		flex-direction: column;
		height: 100%;
		transition: box-shadow var(--dur) var(--ease-spring);
	}

	.tool:hover .tool-inner {
		box-shadow: var(--shadow-hover);
	}

	.tool-media {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--forest);
	}

	.tool-media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 1.2s var(--ease-out);
	}

	.tool:hover .tool-media img {
		transform: scale(1.04);
	}

	.tool--heat .tool-media img {
		object-position: 70% 40%;
	}

	.tool-media--screen {
		background: var(--bg-sunken);
	}

	.tool-media--screen img {
		object-fit: cover;
		object-position: 0 0;
		transform-origin: 0 0;
	}

	.tool-body {
		display: grid;
		gap: 0.75rem;
		align-content: start;
		justify-items: start;
		padding: clamp(1.25rem, 2.5vw, 2rem);
		flex: 1;
	}

	.tool-body h3 {
		font-family: var(--font-heading);
		font-weight: 400;
		font-size: clamp(2rem, 3.4vw, 2.6rem);
		letter-spacing: 0.01em;
		line-height: 1;
	}

	.tool-body p {
		color: var(--text-muted);
		max-width: 52ch;
	}

	.tool-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.5rem;
		color: var(--primary);
		font-weight: 600;
		font-size: 0.95rem;
	}

	.tool-link :global(svg) {
		transition: transform var(--dur) var(--ease-spring);
	}

	.tool:hover .tool-link :global(svg),
	.install-step:hover .tool-link :global(svg) {
		transform: translateX(4px);
	}

	@media (min-width: 900px) {
		.bento {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.tool--heat {
			grid-column: span 7;
		}

		.tool--calving {
			grid-column: span 5;
		}

		/* Zelfde beeldhoogte als de bredere CowCatcher-kaart ernaast. */
		.tool--calving .tool-media {
			aspect-ratio: 8 / 7;
		}

		.tool--detector {
			grid-column: span 12;
		}

		.tool--detector .tool-inner {
			display: grid;
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		}

		.tool--detector .tool-body {
			align-content: center;
			padding: clamp(2rem, 4vw, 3.5rem);
		}

		.tool--detector .tool-media {
			aspect-ratio: auto;
			min-height: 20rem;
			margin: 1rem 1rem 1rem 0;
			border-radius: var(--radius);
			box-shadow: 0 0 0 1px var(--line);
		}
	}

	/* ── Ons verhaal (donker) ── */
	.story {
		position: relative;
		overflow: hidden;
		background: var(--forest);
		color: var(--on-dark-muted);
	}

	.story-glow {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(50rem 30rem at 0% 0%, oklch(40% 0.08 150 / 0.6), transparent 70%),
			radial-gradient(40rem 28rem at 100% 100%, oklch(45% 0.1 80 / 0.25), transparent 70%);
		pointer-events: none;
	}

	.story .container {
		position: relative;
	}

	.story-grid {
		display: grid;
		gap: 2.5rem;
	}

	.story-head {
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}

	.story-title {
		font-size: clamp(3rem, 8vw, 6.2rem);
		line-height: 0.88;
		color: var(--on-dark);
	}

	.story-motto {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem 0.9rem;
		font-family: var(--font-heading);
		font-size: clamp(1.4rem, 2.4vw, 1.9rem);
		line-height: 1.1;
		color: var(--on-dark-muted);
	}

	.story-motto .accent {
		color: var(--accent-amber);
	}

	.story-text {
		display: grid;
		gap: 1.1rem;
		max-width: 62ch;
	}

	.story-lead {
		font-size: clamp(1.15rem, 1.8vw, 1.35rem);
		line-height: 1.55;
		color: var(--on-dark);
	}

	blockquote {
		margin: 0.75rem 0 0;
		padding-left: 1.25rem;
		border-left: 2px solid var(--accent-amber);
		font-size: 1.1rem;
		font-style: italic;
		color: var(--on-dark);
	}

	.values {
		display: grid;
		gap: 1px;
		margin: clamp(3.5rem, 7vw, 5.5rem) 0 0;
		padding: 0;
		list-style: none;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--line-dark);
		box-shadow: inset 0 0 0 1px var(--line-dark);
	}

	.values li {
		display: grid;
		gap: 0.6rem;
		align-content: start;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		background: var(--forest);
	}

	.value-icon {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		margin-bottom: 0.5rem;
		border-radius: var(--radius-sm);
		background: oklch(100% 0 0 / 0.07);
		color: var(--accent-amber);
		box-shadow: inset 0 0 0 1px var(--line-dark);
	}

	.values h3 {
		font-size: 1.15rem;
		color: var(--on-dark);
	}

	.stats {
		display: grid;
		gap: 2rem;
		margin-top: clamp(3.5rem, 7vw, 5.5rem);
		padding-top: clamp(2.5rem, 5vw, 3.5rem);
		border-top: 1px solid var(--line-dark);
	}

	.stats-head h3 {
		font-size: 1.15rem;
		color: var(--on-dark);
		margin-bottom: 0.35rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
	}

	.stat {
		display: flex;
		flex-direction: column-reverse;
		gap: 0.35rem;
		padding-inline: clamp(0.75rem, 2vw, 1.5rem);
		border-left: 1px solid var(--line-dark);
	}

	.stat dd {
		margin: 0;
		font-family: var(--font-heading);
		font-size: clamp(2.6rem, 6.5vw, 5.25rem);
		line-height: 0.85;
		color: var(--accent-amber);
		font-variant-numeric: tabular-nums;
	}

	.stat dt {
		font-size: 0.92rem;
		color: var(--on-dark);
	}

	.stats-note {
		font-size: 0.82rem;
		font-style: italic;
		max-width: 70ch;
		opacity: 0.8;
	}

	.story-cta {
		display: grid;
		gap: 1.5rem;
		margin-top: clamp(3.5rem, 7vw, 5rem);
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--radius-lg);
		background: oklch(100% 0 0 / 0.05);
		box-shadow: inset 0 0 0 1px var(--line-dark);
	}

	.story-cta p {
		color: var(--on-dark);
		max-width: 60ch;
	}

	@media (min-width: 960px) {
		.story-grid {
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
			gap: 5rem;
			align-items: start;
		}

		.story-head {
			position: sticky;
			top: 7rem;
		}

		.values {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.stats {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
			align-items: end;
		}

		.stats-note {
			grid-column: 1 / -1;
		}

		.story-cta {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
		}
	}

	/* ── Demo ── */
	.demo-card {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1.5rem, 4vw, 3rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(30rem 16rem at 0% 0%, oklch(96% 0.06 95 / 0.8), transparent 70%),
			var(--card-bg);
	}

	.hf {
		width: 4.5rem;
		height: 4.5rem;
	}

	.demo-copy {
		display: grid;
		gap: 0.9rem;
		justify-items: start;
	}

	.demo-title {
		font-size: clamp(2.2rem, 4.5vw, 3.4rem);
	}

	.demo-actions {
		display: grid;
		gap: 0.6rem;
		align-content: center;
	}

	@media (min-width: 960px) {
		.demo-card {
			grid-template-columns: auto minmax(0, 1fr) minmax(16rem, 20rem);
			align-items: center;
			gap: 2.5rem;
		}
	}

	/* ── Installatie ── */
	.install-steps {
		display: grid;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.install-step {
		display: flex;
		flex-direction: column;
		height: 100%;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		color: inherit;
		text-decoration: none;
		overflow: hidden;
		transition:
			transform var(--dur) var(--ease-spring),
			box-shadow var(--dur) var(--ease-spring);
	}

	.install-step:hover {
		transform: translateY(-4px);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-hover);
	}

	.install-img {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		margin: 0.5rem 0.5rem 0;
		border-radius: calc(var(--radius-lg) - 0.5rem);
		background: var(--surface-tint);
	}

	.install-img img {
		width: 100%;
		height: 100%;
		padding: 1.25rem;
		object-fit: contain;
		mix-blend-mode: multiply;
		transition: transform 0.9s var(--ease-out);
	}

	.install-step:hover .install-img img {
		transform: scale(1.05);
	}

	.install-num {
		position: absolute;
		left: 0.75rem;
		top: 0.75rem;
		padding: 0.2rem 0.5rem 0.1rem;
		border-radius: var(--radius-xs);
		background: var(--accent-amber);
		font-family: var(--font-heading);
		font-size: 1.35rem;
		line-height: 1;
		color: var(--text-main);
	}

	.install-body {
		display: grid;
		gap: 0.6rem;
		padding: 1.5rem;
		flex: 1;
		align-content: start;
	}

	.install-body h3 {
		font-size: 1.2rem;
	}

	.install-body p {
		color: var(--text-muted);
		font-size: 0.98rem;
	}

	.install-cta {
		display: flex;
		justify-content: center;
		margin-top: 2.5rem;
	}

	@media (min-width: 860px) {
		.install-steps {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	/* ── Community ── */
	.community {
		padding-top: 0;
	}

	.community-card {
		display: grid;
		gap: 2rem;
		padding: clamp(1.75rem, 4vw, 3.5rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(36rem 20rem at 100% 0%, oklch(92% 0.05 145 / 0.9), transparent 70%),
			var(--surface-tint);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.community-copy {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}

	.community-links {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		align-content: center;
	}

	.c-link {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.9rem;
		padding: 1rem 1.15rem;
		border-radius: var(--radius);
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--line);
		color: var(--text-main);
		font-weight: 500;
		text-decoration: none;
		transition:
			transform var(--dur) var(--ease-spring),
			box-shadow var(--dur) var(--ease-spring),
			color var(--dur-fast) var(--ease-out);
	}

	.c-link span {
		overflow-wrap: anywhere;
	}

	.c-link :global(svg:first-child) {
		color: var(--primary);
	}

	.c-link :global(svg:last-child) {
		color: var(--text-muted);
		transition: transform var(--dur) var(--ease-spring);
	}

	.c-link:hover {
		transform: translateX(4px);
		box-shadow:
			0 0 0 1px var(--primary),
			var(--shadow-sm);
	}

	.c-link:hover :global(svg:last-child) {
		transform: translate(2px, -2px);
		color: var(--primary);
	}

	@media (min-width: 900px) {
		.community-card {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
			gap: 4rem;
		}
	}
</style>
