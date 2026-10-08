<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const suggestions = [
		{ href: '/installation', label: m.nav_install, icon: 'download' },
		{ href: '/projects/cowcatcher', label: () => 'CowCatcher', icon: 'eye' },
		{ href: '/projects/calvingcatcher', label: () => 'CalvingCatcher', icon: 'eye' },
		{ href: '/about-us', label: m.nav_about, icon: 'users' }
	];
</script>

<Seo title={m.error_title()} />

<section class="error container">
	<p class="code">{page.status}</p>
	<h1 class="h-display">{page.status === 404 ? m.error_title() : page.error?.message}</h1>
	<p class="lead">{m.error_text()}</p>

	<a href="{base}/" class="btn btn--solid btn--lg">
		{m.error_home()}
		<span class="btn__icon"><Icon name="arrow-right" /></span>
	</a>

	<ul class="suggestions">
		{#each suggestions as item (item.href)}
			<li>
				<a href="{base}{item.href}">
					<Icon name={item.icon} size={18} />
					<span>{item.label()}</span>
					<Icon name="arrow-right" size={16} />
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.error {
		display: grid;
		gap: 1.5rem;
		justify-items: start;
		padding-top: calc(var(--nav-offset) + 3rem);
		padding-bottom: var(--section-y);
	}

	.code {
		font-family: var(--font-heading);
		font-size: clamp(6rem, 22vw, 14rem);
		line-height: 0.8;
		color: var(--primary-soft);
		-webkit-text-stroke: 2px var(--primary);
	}

	.suggestions {
		display: grid;
		gap: 0.5rem;
		width: 100%;
		max-width: 32rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
	}

	.suggestions a {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 0.85rem;
		align-items: center;
		padding: 0.95rem 1.1rem;
		border-radius: var(--radius);
		background: var(--card-bg);
		box-shadow: 0 0 0 1px var(--line);
		color: var(--text-main);
		font-weight: 500;
		text-decoration: none;
		transition: box-shadow var(--dur) var(--ease-spring);
	}

	.suggestions a:hover {
		box-shadow: 0 0 0 1px var(--primary);
	}

	.suggestions :global(svg:first-child) {
		color: var(--primary);
	}
</style>
