<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { projects } from '$lib/config/projects.js';
	import { links } from '$lib/config/links.js';
	import { splitMotto, stripNumber } from '$lib/utils/text.js';
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';
	import LanguageSelect from './LanguageSelect.svelte';

	const motto = splitMotto(m.footer_tagline());

	const installLinks = [
		{ href: '/installation', label: m.install_title },
		{ href: '/installation/hardware', label: () => stripNumber(m.install_card_hardware_title()) },
		{ href: '/installation/download', label: () => stripNumber(m.install_card_software_title()) },
		{ href: '/installation/options', label: () => stripNumber(m.install_card_options_title()) }
	];

	const community = [
		{ href: links.telegram, label: 'Telegram', icon: 'telegram' },
		{ href: links.facebook, label: 'Facebook', icon: 'facebook' },
		{ href: links.github, label: 'GitHub', icon: 'github' },
		{ href: `mailto:${links.email}`, label: links.email, icon: 'mail' }
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="top">
			<div class="brand-col">
				<Logo tone="light" size={38} />
				<p class="motto">
					{#each motto as part, i}
						<span class:accent={i === motto.length - 1}>{part}{i < motto.length - 1 ? '.' : ''}</span>
					{/each}
				</p>
				<p class="mission">{m.footer_project_sub()}</p>
			</div>

			<nav class="cols" aria-label="Footer">
				<div class="col">
					<h2 class="col-title">{m.nav_projects()}</h2>
					<ul>
						{#each projects as project (project.id)}
							<li><a href="{base}{project.link}">{project.name.replace('-', ' ')}</a></li>
						{/each}
						<li><a href="{base}/about-us">{m.nav_about()}</a></li>
					</ul>
				</div>

				<div class="col">
					<h2 class="col-title">{m.nav_install()}</h2>
					<ul>
						{#each installLinks as link (link.href)}
							<li><a href="{base}{link.href}">{link.label()}</a></li>
						{/each}
					</ul>
				</div>

				<div class="col">
					<h2 class="col-title">{m.footer_col_community()}</h2>
					<ul>
						{#each community as item (item.href)}
							<li>
								<a href={item.href} target={item.icon === 'mail' ? undefined : '_blank'} rel="noopener noreferrer" class="with-icon">
									<Icon name={item.icon} size={16} />
									<span>{item.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</nav>
		</div>

		<div class="bottom">
			<div class="legal">
				<span>&copy; {new Date().getFullYear()} CowCatcherAI</span>
				<a href={links.license} target="_blank" rel="noopener noreferrer">{m.footer_license()}</a>
				<a href={links.github} target="_blank" rel="noopener noreferrer">{m.footer_official()}</a>
			</div>
			<div class="bottom-right">
				<span class="made">{m.footer_made_with()}</span>
				<LanguageSelect tone="dark" />
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		margin-top: 0;
		padding-top: clamp(4rem, 8vw, 6rem);
		background:
			radial-gradient(60rem 30rem at 85% -10%, oklch(40% 0.07 150 / 0.55), transparent 70%),
			var(--forest);
		color: var(--on-dark-muted);
		overflow: hidden;
	}

	.top {
		display: grid;
		gap: 3.5rem;
		padding-bottom: 3.5rem;
	}

	.brand-col {
		display: grid;
		gap: 1.25rem;
		max-width: 30rem;
		align-content: start;
	}

	.motto {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.4em;
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 5vw, 3.4rem);
		line-height: 0.95;
		color: var(--on-dark);
	}

	.motto .accent {
		color: var(--accent-amber);
	}

	.mission {
		font-size: 0.98rem;
		line-height: 1.6;
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 2.5rem 2rem;
	}

	.col-title {
		margin-bottom: 1rem;
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		line-height: 1.4;
		color: var(--on-dark);
		opacity: 0.6;
	}

	.col ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.6rem;
	}

	.col a {
		color: var(--on-dark-muted);
		font-size: 0.95rem;
		text-decoration: none;
		transition: color var(--dur-fast) var(--ease-out);
		overflow-wrap: anywhere;
	}

	.col a:hover {
		color: var(--accent-amber);
	}

	.with-icon {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
		padding-block: 1.75rem 2.25rem;
		border-top: 1px solid var(--line-dark);
		font-size: 0.85rem;
	}

	.legal {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
	}

	.legal a {
		color: inherit;
		text-decoration: none;
	}

	.legal a:hover {
		color: var(--on-dark);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.bottom-right {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	@media (min-width: 960px) {
		.top {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
			gap: 4rem;
		}
	}
</style>
