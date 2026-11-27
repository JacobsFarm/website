<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { getLocale } from '$lib/paraglide/runtime';
	import { sections, modelClasses, skeleton, recipes, mistakes } from '$lib/content/config-reference.js';
	import Seo from '$lib/components/Seo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import DocLayout from '$lib/components/DocLayout.svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import PagerNav from '$lib/components/PagerNav.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const locale = getLocale();
	const lang = locale === 'nl' ? 'nl' : 'en';

	/** @param {{ en: string, nl: string }} text */
	const t = (text) => text[lang].replaceAll('{base}', base);

	/** "video_width · video_crf" → "video_width-video_crf" @param {string} key */
	const slug = (key) => key.replace(/[^\w$]+/g, '-').replace(/^-|-$/g, '');

	let query = $state('');
	const needle = $derived(query.trim().toLowerCase());

	/** @param {import('$lib/content/config-reference.js').Field} field @param {import('$lib/content/config-reference.js').Section} section */
	function matches(field, section) {
		if (!needle) return true;
		return [field.key, section.path, field.type, field.desc.en, field.desc[lang]].some((text) => text.toLowerCase().includes(needle));
	}

	const visible = $derived(
		sections.map((section) => ({ ...section, shown: section.fields.filter((field) => matches(field, section)) }))
	);
	const hits = $derived(visible.reduce((sum, section) => sum + section.shown.length, 0));

	const toc = [
		{ id: 'where', label: m.config_where_title() },
		{ id: 'structure', label: m.config_structure_title() },
		...sections.map((section) => ({ id: section.id, label: section.title[lang].split(' — ')[0] })),
		{ id: 'classes', label: m.config_classes_title() },
		{ id: 'presets', label: m.config_presets_title() },
		{ id: 'recipes', label: m.config_recipes_title() },
		{ id: 'mistakes', label: m.config_mistakes_title() }
	];
</script>

<Seo title={m.config_title()} description={m.config_lead()} />

<PageHeader
	eyebrow={m.config_eyebrow()}
	title={m.config_title()}
	lead={m.config_lead()}
	crumbs={[{ href: '/installation/', label: m.nav_install() }]}
/>

<DocLayout {toc}>
	{#if lang === 'en' && locale !== 'en'}
		<p class="note">{m.config_in_english()}</p>
	{/if}

	<h2 id="where">{m.config_where_title()}</h2>
	<ul class="check-list">
		<li>{@html m.config_where_app()}</li>
		<li>{@html m.config_where_file()}</li>
	</ul>

	<div class="table-container">
		<table>
			<tbody>
				<tr>
					<th>{m.inst_storage_win()}</th>
					<td><code>%LOCALAPPDATA%\AI Detector\config.json</code></td>
				</tr>
				<tr>
					<th>{m.inst_storage_mac()}</th>
					<td><code>~/Library/Application Support/AI Detector/config.json</code></td>
				</tr>
				<tr>
					<th>{m.inst_storage_linux()}</th>
					<td><code>~/.local/share/ai-detector/config.json</code></td>
				</tr>
				<tr>
					<th>{m.inst_storage_docker()}</th>
					<td>{m.inst_storage_docker_path()}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="note">{@html m.config_where_preset()}</p>
	<p class="tip-box">{@html m.config_backup()}</p>

	<h2 id="structure">{m.config_structure_title()}</h2>
	<p>{@html m.config_structure_text()}</p>

	<div class="skeleton" role="group" aria-label="config.json">
		<div class="skeleton-bar"><Icon name="code" size={14} /> config.json</div>
		<pre>{#each skeleton as [indent, text, anchor]}<span class="line" style="--indent: {indent}">{#if anchor}<a href="#{anchor}">{text}</a>{:else}{text}{/if}</span>
{/each}</pre>
	</div>

	<div class="search">
		<label for="config-search">{m.config_search_label()}</label>
		<div class="search-field">
			<Icon name="search" size={18} />
			<input id="config-search" type="search" bind:value={query} placeholder={m.config_search_placeholder()} autocomplete="off" />
		</div>
		{#if needle && hits === 0}
			<p class="no-results">{m.config_no_results()}</p>
		{/if}
	</div>

	{#each visible as section (section.id)}
		{#if section.shown.length}
			<section class="ref-section" id={section.id} aria-labelledby="{section.id}-title">
				<header class="ref-head">
					<span class="ref-path">{section.path}</span>
					<h2 id="{section.id}-title">{section.title[lang]}</h2>
					<p>{@html t(section.intro)}</p>
				</header>

				<dl class="fields">
					{#each section.shown as field (field.key)}
						<div class="field" id="{section.id}-{slug(field.key)}">
							<dt>
								<a class="field-key" href="#{section.id}-{slug(field.key)}"><code>{field.key}</code></a>
								{#if field.required}<span class="req">{m.config_required()}</span>{/if}
								<span class="meta">
									<span class="type">{field.type}</span>
									{#if field.default}<span>{m.config_col_default()}: <code>{field.default}</code></span>{/if}
									{#if field.limits}<span>{m.config_limits()}: {field.limits}</span>{/if}
								</span>
							</dt>
							<dd>{@html t(field.desc)}</dd>
						</div>
					{/each}
				</dl>

				{#if section.example && !needle}
					<CodeBlock code={section.example} label="{m.config_example()} · {section.path}" />
				{/if}
			</section>
		{/if}
	{/each}

	<h2 id="classes">{m.config_classes_title()}</h2>
	<p>{@html m.config_classes_text()}</p>
	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>{m.config_classes_preset()}</th>
					<th>{m.config_classes_classes()}</th>
				</tr>
			</thead>
			<tbody>
				{#each modelClasses as row (row.file)}
					<tr>
						<td>
							<strong>{row.preset}</strong><br />
							<code class="file">{row.file}</code>
						</td>
						<td>
							<span class="classes">
								{#each row.classes as name}<code>{name}</code>{/each}
							</span>
							<span class="class-note">{row.note[lang]}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h2 id="presets">{m.config_presets_title()}</h2>
	<p>{@html m.config_presets_text()}</p>
	<CodeBlock
		label="presets/heifer-heat.json"
		code={`{
  "yolo": {
    "model": "https://github.com/CowCatcherAI/CowCatcherAI/releases/download/model-V16/cowcatcherV17.2.pt",
    "confidence": 0.86,
    "frames_min": 4
  },
  "exporters": {
    "disk": { "directory": "heifers" },
    "telegram": { "include_video": true, "alert_every": 2 }
  }
}`}
	/>

	<h2 id="recipes">{m.config_recipes_title()}</h2>
	<p>{m.config_recipes_text()}</p>
	<div class="recipes">
		{#each recipes as recipe (recipe.id)}
			<section class="recipe" id={recipe.id}>
				<h3>{recipe.title[lang]}</h3>
				<p>{@html t(recipe.text)}</p>
				<CodeBlock code={recipe.code} label={m.config_example()} />
			</section>
		{/each}
	</div>

	<h2 id="mistakes">{m.config_mistakes_title()}</h2>
	<p>{m.config_mistakes_text()}</p>
	<ul class="mistakes">
		{#each mistakes as mistake, i (i)}
			<li>
				<div class="pair">
					<span class="bad"><span class="tag">{m.config_mistake_wrong()}</span><code>{mistake.bad}</code></span>
					<span class="good"><span class="tag">{m.config_mistake_right()}</span><code>{mistake.good}</code></span>
				</div>
				<p>{@html mistake.why[lang]}</p>
			</li>
		{/each}
	</ul>

	<aside class="tutorials-cta">
		<span class="cta-icon"><Icon name="play" size={20} /></span>
		<div>
			<h3>{m.config_tutorials_title()}</h3>
			<p>{m.config_tutorials_text()}</p>
		</div>
		<div class="cta-links">
			<a href="{base}/tutorials/calf-detection/" class="btn btn--ghost btn--sm">CalvingCatcher · cooldown</a>
			<a href="{base}/tutorials/heartbeat-healthchecks/" class="btn btn--ghost btn--sm">Healthchecks.io</a>
		</div>
	</aside>

	<PagerNav
		prev={{ href: '/installation/options/', label: m.options_title(), hint: `${m.step_label()} 3` }}
		next={{ href: '/tutorials/', label: m.tutorials_title(), hint: m.nav_tutorials() }}
	/>
</DocLayout>

<style>
	.skeleton {
		margin-top: 1rem !important;
		border-radius: var(--radius);
		background: var(--forest);
		overflow: hidden;
	}

	.skeleton-bar {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.6rem 1rem;
		border-bottom: 1px solid var(--line-dark);
		color: var(--on-dark-muted);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.skeleton pre {
		margin: 0;
		padding: 1rem 1.1rem;
		border-radius: 0;
		background: transparent;
		color: var(--on-dark-muted);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		line-height: 1.7;
		overflow-x: auto;
	}

	.line {
		padding-left: calc(var(--indent) * 1.25rem);
	}

	.skeleton a {
		color: var(--on-dark) !important;
		text-decoration: none !important;
		border-bottom: 1px dashed oklch(100% 0 0 / 0.3);
		transition:
			color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.skeleton a:hover {
		color: oklch(85% 0.12 85) !important;
		border-bottom-color: currentColor;
	}

	.search {
		position: sticky;
		top: calc(var(--nav-offset) - 1rem);
		z-index: var(--z-raised);
		margin-top: 2.5rem !important;
		padding: 0.9rem 1rem;
		border-radius: var(--radius);
		background: oklch(98.5% 0.006 145 / 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
	}

	.search label {
		display: block;
		margin-bottom: 0.4rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.search-field {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0 0.85rem;
		border-radius: var(--radius-sm);
		background: var(--card-bg);
		box-shadow: inset 0 0 0 1px var(--line-strong);
		color: var(--text-muted);
	}

	.search-field:focus-within {
		box-shadow: inset 0 0 0 2px var(--primary);
	}

	.search input {
		flex: 1;
		min-width: 0;
		padding: 0.7rem 0;
		border: 0;
		background: transparent;
		color: var(--text-main);
		font: inherit;
		outline: none;
	}

	.no-results {
		margin: 0.6rem 0 0;
		color: var(--text-muted);
		font-size: 0.92rem;
	}

	.ref-section {
		margin-top: 2.5rem !important;
		scroll-margin-top: calc(var(--nav-offset) + 5rem);
	}

	.ref-head {
		margin-bottom: 1rem;
	}

	.ref-path {
		display: inline-block;
		margin-bottom: 0.4rem;
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-pill);
		background: var(--amber-soft);
		color: var(--amber-ink);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.ref-head h2 {
		margin: 0 0 0.5rem;
	}

	.ref-head p {
		margin: 0;
		color: var(--text-muted);
	}

	.fields {
		margin: 0;
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		overflow: hidden;
	}

	.field {
		display: grid;
		gap: 0.5rem;
		padding: 1rem 1.25rem;
		scroll-margin-top: calc(var(--nav-offset) + 6rem);
		transition: background-color var(--dur) var(--ease-out);
	}

	.field + .field {
		border-top: 1px solid var(--line);
	}

	.field:target {
		background: var(--amber-soft);
	}

	dt {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem 0.6rem;
	}

	.field-key {
		text-decoration: none !important;
	}

	.field-key code {
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius-xs);
		background: var(--primary-soft) !important;
		color: var(--primary-ink);
		font-size: 0.92rem;
		font-weight: 600;
	}

	.req {
		padding: 0.1rem 0.5rem;
		border-radius: var(--radius-pill);
		background: var(--alert-soft);
		color: var(--alert-ink);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.9rem;
		width: 100%;
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.type {
		font-family: var(--font-mono);
		color: var(--amber-ink);
	}

	.meta code {
		font-size: 0.78rem;
	}

	dd {
		margin: 0;
		color: var(--text-main);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	@media (min-width: 760px) {
		.field {
			grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
			gap: 1.5rem;
		}

		dt {
			align-content: start;
		}
	}

	.file {
		font-size: 0.78rem;
	}

	.classes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 0.35rem;
	}

	.class-note {
		display: block;
		color: var(--text-muted);
		font-size: 0.88rem;
	}

	.recipes {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
	}

	.recipe {
		min-width: 0;
		padding: clamp(1.1rem, 2.5vw, 1.5rem);
		border-radius: var(--radius-lg);
		background: var(--card-bg);
		box-shadow:
			0 0 0 1px var(--line),
			var(--shadow-sm);
		scroll-margin-top: var(--nav-offset);
	}

	.recipe h3 {
		margin: 0 0 0.4rem;
		font-size: 1.25rem;
	}

	.recipe p {
		margin: 0;
		color: var(--text-muted);
	}

	.mistakes {
		display: grid;
		gap: 0.75rem;
		padding: 0 !important;
		list-style: none;
	}

	.mistakes li {
		min-width: 0;
		margin: 0 !important;
		padding: 1rem 1.15rem;
		border-radius: var(--radius);
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--line);
	}

	.mistakes li::marker {
		content: '';
	}

	.pair {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 0.6rem;
	}

	@media (min-width: 760px) {
		.pair {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.bad,
	.good {
		display: grid;
		gap: 0.3rem;
		align-content: start;
		padding: 0.6rem 0.75rem;
		border-radius: var(--radius-sm);
	}

	.bad {
		background: var(--alert-soft);
	}

	.good {
		background: var(--primary-soft);
	}

	.tag {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.bad .tag {
		color: var(--alert-ink);
	}

	.good .tag {
		color: var(--primary-ink);
	}

	.pair code {
		background: transparent !important;
		padding: 0 !important;
		white-space: pre-wrap;
		font-size: 0.85rem;
	}

	.mistakes p {
		margin: 0;
		color: var(--text-muted);
		font-size: 0.93rem;
	}

	.tutorials-cta {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1rem 1.25rem;
		align-items: center;
		margin-top: 2.5rem !important;
		padding: clamp(1.25rem, 3vw, 1.75rem);
		border-radius: var(--radius-lg);
		background: var(--surface-tint);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	.cta-icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		padding-left: 0.15rem;
		border-radius: 50%;
		background: var(--primary);
		color: #fff;
	}

	.tutorials-cta h3 {
		margin: 0 0 0.25rem;
	}

	.tutorials-cta p {
		margin: 0;
		color: var(--text-muted);
	}

	.cta-links {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
