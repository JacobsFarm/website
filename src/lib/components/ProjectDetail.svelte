<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions/reveal.js';
	import { links } from '$lib/config/links.js';
	import { splitLabel } from '$lib/utils/text.js';
	import Seo from './Seo.svelte';
	import PageHeader from './PageHeader.svelte';
	import ZoomableImage from './ZoomableImage.svelte';
	import Icon from './Icon.svelte';

	/**
	 * Gedeelde opbouw van de projectpagina's CowCatcher en CalvingCatcher.
	 * Beide gebruiken dezelfde vertaalsleutels met een eigen voorvoegsel
	 * (`cowcatcher_…` / `calvingcatcher_…`).
	 *
	 * @property {'cowcatcher'|'calvingcatcher'} prefix
	 * @property {string} demo      - Link naar de Hugging Face-demo.
	 * @property {string} demoLabel - Tekst op de demoknop.
	 * @property {{hero: string, heroAlt: string, basics: string, basicsAlt: string, practice: string, practiceAlt: string, extra?: string, extraAlt?: string}} images
	 * @property {string} logo
	 */
	/** @type {{ prefix: 'cowcatcher'|'calvingcatcher', demo: string, demoLabel: string, images: { hero: string, heroAlt: string, heroPosition?: string, basics: string, basicsAlt: string, practice: string, practiceAlt: string, extra?: string, extraAlt?: string }, logo: string, tag: string }} */
	let { prefix, demo, demoLabel, images, logo, tag } = $props();

	const messages = /** @type {Record<string, () => string>} */ (/** @type {unknown} */ (m));
	const t = (/** @type {string} */ key) => messages[`${prefix}_${key}`]?.() ?? '';
	const items = (/** @type {string[]} */ ...keys) => keys.map((key) => splitLabel(t(key)));

	const basics = items('basics_monitoring', 'basics_ai', 'basics_alerts', 'basics_non_intrusive', 'basics_local');
	const smart = items('smart_learned', 'smart_confidence');
	const practice = items(
		'practice_continuous',
		'practice_analysis',
		'practice_detection',
		'practice_perfect_shot',
		'practice_notification'
	);
	const control = items('control_tool', 'control_id', 'control_physical', 'control_eyes');
	const workflow = [1, 2, 3, 4, 5].map((n) => t(`workflow_step${n}`));
	const value = [t('value_constant'), t('value_night'), t('value_fast'), t('value_precision')];

	const columns = [
		{ icon: 'shield', title: t('privacy_title'), list: items('privacy_local', 'privacy_req', 'privacy_platforms', 'privacy_storage', 'privacy_improvement') },
		{ icon: 'wrench', title: t('needs_title'), list: items('needs_pc', 'needs_camera', 'needs_switch', 'needs_cable', 'needs_internet') },
		{ icon: 'heart', title: t('provide_title'), list: items('provide_model', 'provide_privacy', 'provide_os') }
	];

	const subtitleParts = t('subtitle').split(/\s+[-–—]\s+/);
</script>

<Seo title={t('title')} description={t('hero_description')} />

<PageHeader eyebrow={subtitleParts[0]} title={t('title')} lead={t('hero_description')}>
	{#if subtitleParts[1]}
		<p class="sub">{subtitleParts[1]}</p>
	{/if}

	{#snippet actions()}
		<a href="{base}/installation" class="btn btn--solid btn--lg">
			{m.front_page_intro_btn_install()}
			<span class="btn__icon"><Icon name="arrow-right" /></span>
		</a>
		<a href={demo} target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--lg">
			{demoLabel}
			<Icon name="arrow-up-right" size={16} />
		</a>
	{/snippet}

	{#snippet aside()}
		<figure class="hero-media bezel">
			<div class="bezel__inner hero-media-inner">
				<img src={images.hero} alt={images.heroAlt} style:object-position={images.heroPosition} />
				<span class="hero-tag">
					<img src={logo} alt="" class="hero-logo" />
					<span>{tag}</span>
				</span>
			</div>
		</figure>
	{/snippet}
</PageHeader>

<!-- ── De basis ── -->
<section class="section split-section">
	<div class="container split">
		<div class="split-copy" use:reveal>
			<span class="eyebrow">01</span>
			<h2 class="h-section">{t('basics_title')}</h2>
			<ul class="feature-list">
				{#each basics as item}
					<li>
						<span class="fl-icon"><Icon name="check" size={16} stroke={2.2} /></span>
						<span>
							{#if item.label}<strong>{item.label}</strong>{/if}
							{item.text}
						</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="split-media" use:reveal>
			<ZoomableImage src={images.basics} alt={images.basicsAlt} />
			{#if images.extra}
				<ZoomableImage src={images.extra} alt={images.extraAlt} />
			{/if}
		</div>
	</div>
</section>

<!-- ── Het slimme deel ── -->
<section class="smart">
	<div class="container">
		<div class="smart-card" use:reveal>
			<div class="smart-head">
				<span class="eyebrow eyebrow--dark">02</span>
				<h2 class="smart-title">{t('smart_title')}</h2>
			</div>
			<div class="smart-items">
				{#each smart as item, i}
					<div class="smart-item">
						<span class="smart-icon"><Icon name={i === 0 ? 'eye' : 'sliders'} size={22} /></span>
						<h3>{item.label}</h3>
						<p>{item.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ── In de praktijk ── -->
<section class="section">
	<div class="container split split--reverse">
		<div class="split-copy" use:reveal>
			<span class="eyebrow">03</span>
			<h2 class="h-section">{t('practice_title')}</h2>
			<ol class="timeline">
				{#each practice as item, i}
					<li>
						<span class="tl-num">{i + 1}</span>
						<div>
							{#if item.label}<h3>{item.label}</h3>{/if}
							<p>{item.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
		<div class="split-media sticky-media" use:reveal>
			<ZoomableImage src={images.practice} alt={images.practiceAlt} />
		</div>
	</div>
</section>

<!-- ── Jij houdt de regie ── -->
<section class="section control-section">
	<div class="container">
		<header class="section-head" use:reveal>
			<span class="eyebrow">04</span>
			<h2 class="h-section">{t('control_title')}</h2>
		</header>

		<div class="control-grid" use:reveal={{ stagger: 90 }}>
			{#each control as item}
				<div class="control-item">
					<h3>{item.label}</h3>
					<p>{item.text}</p>
				</div>
			{/each}
		</div>

		<div class="workflow" use:reveal>
			<p class="workflow-title">{t('workflow_title')}</p>
			<ol>
				{#each workflow as step, i}
					<li>
						<span class="wf-num">{i + 1}</span>
						<span>{step}</span>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- ── Waarom het waardevol is ── -->
<section class="section value-section">
	<div class="container value" use:reveal>
		<h2 class="h-section">{t('value_title')}</h2>
		<ul class="value-list">
			{#each value as item}
				<li><Icon name="check-circle" size={22} /> <span>{item}</span></li>
			{/each}
		</ul>
	</div>
</section>

<!-- ── Privacy · Benodigdheden · Wat wij leveren ── -->
<section class="section columns-section">
	<div class="container">
		<div class="columns" use:reveal={{ stagger: 100 }}>
			{#each columns as column}
				<div class="column">
					<span class="col-icon"><Icon name={column.icon} size={22} /></span>
					<h2>{column.title}</h2>
					<ul>
						{#each column.list as item}
							<li>
								{#if item.label}<strong>{item.label}</strong>{/if}
								<span>{item.text}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="license" use:reveal>
			<div>
				<h3>{t('disclaimer_title')}</h3>
				<p>{t('disclaimer_risk')} {t('disclaimer_fair')}</p>
			</div>
			<a href={links.github} target="_blank" rel="noopener noreferrer" class="btn btn--ink">
				<Icon name="github" size={18} />
				{t('github_button')}
			</a>
		</div>
	</div>
</section>

<!-- ── Afsluitende oproep ── -->
<section class="cta-section">
	<div class="container">
		<div class="cta" use:reveal>
			<div>
				<h2>{m.project_cta_title()}</h2>
				<p>{m.project_cta_text()}</p>
			</div>
			<div class="btn-row">
				<a href="{base}/installation" class="btn btn--amber btn--lg">
					{m.front_page_intro_btn_install()}
					<span class="btn__icon"><Icon name="arrow-right" /></span>
				</a>
				<a href={links.telegram} target="_blank" rel="noopener noreferrer" class="btn btn--ghost-dark btn--lg">
					<Icon name="telegram" size={18} /> Telegram
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.sub {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		line-height: 1.1;
		color: var(--accent-teal);
	}

	/* ── Hero-beeld ── */
	.hero-media {
		margin: 0;
	}

	.hero-media-inner {
		position: relative;
		background: var(--forest);
	}

	.hero-media-inner > img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.hero-tag {
		position: absolute;
		left: 0.85rem;
		bottom: 0.85rem;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.35rem 0.9rem 0.35rem 0.35rem;
		border-radius: var(--radius-pill);
		background: oklch(99% 0.004 145 / 0.92);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: var(--shadow-md);
		font-size: 0.85rem;
		font-weight: 600;
	}

	.hero-logo {
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		padding: 0.3rem;
		background: #fff;
		object-fit: contain;
	}

	/* ── Gesplitste secties ── */
	.split {
		display: grid;
		gap: 2.5rem;
		align-items: start;
	}

	.split-copy {
		display: grid;
		gap: 1.25rem;
		align-content: start;
		justify-items: start;
	}

	.split-media {
		display: grid;
		gap: 1rem;
	}

	.feature-list {
		display: grid;
		gap: 0.9rem;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}

	.feature-list li {
		display: flex;
		gap: 0.85rem;
		align-items: flex-start;
		color: var(--text-muted);
	}

	.feature-list strong {
		display: block;
		color: var(--text-main);
		font-weight: 600;
	}

	.fl-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		margin-top: 0.1rem;
		border-radius: 50%;
		background: var(--primary-soft);
		color: var(--primary);
	}

	@media (min-width: 960px) {
		.split {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 5rem;
		}

		.split--reverse .split-copy {
			order: 2;
		}

		.sticky-media {
			position: sticky;
			top: 7rem;
		}
	}

	/* ── Slim ── */
	.smart-card {
		display: grid;
		gap: 2rem;
		padding: clamp(1.75rem, 4vw, 3.5rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(36rem 20rem at 0% 0%, oklch(40% 0.08 150 / 0.7), transparent 70%),
			var(--forest);
		color: var(--on-dark-muted);
	}

	.smart-head {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}

	.smart-title {
		font-size: clamp(2.4rem, 5vw, 3.6rem);
		color: var(--on-dark);
	}

	.smart-items {
		display: grid;
		gap: 1rem;
	}

	.smart-item {
		display: grid;
		gap: 0.5rem;
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background: oklch(100% 0 0 / 0.05);
		box-shadow: inset 0 0 0 1px var(--line-dark);
	}

	.smart-icon {
		color: var(--accent-amber);
		margin-bottom: 0.25rem;
	}

	.smart-item h3 {
		color: var(--on-dark);
		font-size: 1.1rem;
	}

	@media (min-width: 900px) {
		.smart-card {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
			align-items: center;
			gap: 3rem;
		}

		.smart-items {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ── Tijdlijn ── */
	.timeline {
		position: relative;
		display: grid;
		gap: 1.4rem;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 1.05rem;
		top: 1rem;
		bottom: 1rem;
		width: 2px;
		background: linear-gradient(var(--primary-soft), var(--accent-amber));
	}

	.timeline li {
		position: relative;
		display: flex;
		gap: 1.1rem;
		align-items: flex-start;
	}

	.tl-num {
		position: relative;
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		background: var(--card-bg);
		box-shadow:
			0 0 0 2px var(--primary),
			var(--shadow-sm);
		color: var(--primary);
		font-family: var(--font-heading);
		font-size: 1.15rem;
		padding-top: 0.1rem;
	}

	.timeline li:last-child .tl-num {
		background: var(--accent-amber);
		box-shadow: 0 0 0 2px var(--accent-amber);
		color: var(--text-main);
	}

	.timeline h3 {
		font-size: 1.05rem;
		margin-bottom: 0.2rem;
		padding-top: 0.3rem;
	}

	.timeline p {
		color: var(--text-muted);
	}

	/* ── Regie ── */
	.control-section {
		background: linear-gradient(180deg, transparent, var(--bg-sunken) 25%, var(--bg-sunken) 75%, transparent);
	}

	.control-grid {
		display: grid;
		gap: 1rem;
	}

	.control-item {
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
	}

	.control-item h3 {
		font-size: 1.05rem;
		margin-bottom: 0.4rem;
	}

	.control-item p {
		color: var(--text-muted);
		font-size: 0.97rem;
	}

	@media (min-width: 720px) {
		.control-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1080px) {
		.control-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.workflow {
		margin-top: 2rem;
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		background: var(--amber-soft);
		box-shadow: inset 0 0 0 1px oklch(65% 0.16 75 / 0.25);
	}

	.workflow-title {
		margin-bottom: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--amber-ink);
	}

	.workflow ol {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.workflow li {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.55rem 1rem 0.55rem 0.55rem;
		border-radius: var(--radius-pill);
		background: var(--card-bg);
		box-shadow: var(--shadow-sm);
		font-weight: 500;
		font-size: 0.95rem;
	}

	.workflow li:not(:last-child)::after {
		content: '→';
		margin-left: 0.4rem;
		color: var(--amber-ink);
	}

	.wf-num {
		display: grid;
		place-items: center;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		background: var(--accent-amber);
		font-size: 0.8rem;
		font-weight: 700;
	}

	/* ── Waarde ── */
	.value {
		display: grid;
		gap: 2rem;
	}

	.value-list {
		display: grid;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.value-list li {
		display: flex;
		gap: 0.85rem;
		align-items: center;
		padding: 1.15rem 1.25rem;
		border-radius: var(--radius);
		background: var(--surface-tint);
		font-size: 1.05rem;
		font-weight: 500;
	}

	.value-list :global(svg) {
		color: var(--primary);
	}

	@media (min-width: 900px) {
		.value {
			grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
			gap: 4rem;
			align-items: center;
		}

		.value-list {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ── Drie kolommen ── */
	.columns-section {
		padding-top: 0;
	}

	.columns {
		display: grid;
		gap: 1rem;
	}

	.column {
		display: grid;
		gap: 1rem;
		align-content: start;
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: var(--radius-xl);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
	}

	.col-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius);
		background: var(--primary-soft);
		color: var(--primary);
	}

	.column h2 {
		font-size: 2rem;
	}

	.column ul {
		display: grid;
		gap: 0.8rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.column li {
		padding-top: 0.8rem;
		border-top: 1px solid var(--line);
		font-size: 0.95rem;
		color: var(--text-muted);
	}

	.column strong {
		display: block;
		color: var(--text-main);
		font-weight: 600;
	}

	@media (min-width: 960px) {
		.columns {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.license {
		display: grid;
		gap: 1.25rem;
		margin-top: 1rem;
		padding: 1.5rem;
		border-radius: var(--radius-lg);
		box-shadow: inset 0 0 0 1px var(--line-strong);
	}

	.license h3 {
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	.license p {
		color: var(--text-muted);
		font-size: 0.93rem;
	}

	@media (min-width: 800px) {
		.license {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
		}
	}

	/* ── Oproep ── */
	.cta-section {
		padding-bottom: var(--section-y);
	}

	.cta {
		display: grid;
		gap: 1.75rem;
		padding: clamp(1.75rem, 4vw, 3.5rem);
		border-radius: var(--radius-xl);
		background:
			radial-gradient(34rem 20rem at 100% 100%, oklch(45% 0.1 80 / 0.35), transparent 70%),
			var(--forest);
		color: var(--on-dark-muted);
	}

	.cta h2 {
		margin-bottom: 0.6rem;
		font-size: clamp(2.4rem, 5vw, 3.6rem);
		color: var(--on-dark);
	}

	@media (min-width: 960px) {
		.cta {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: 3rem;
		}
	}
</style>
