<script>
	import * as m from '$lib/paraglide/messages.js';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { projects } from '$lib/config/projects.js';
	import Logo from './Logo.svelte';
	import Icon from './Icon.svelte';
	import LanguageSelect from './LanguageSelect.svelte';

	let isOpen = $state(false);
	let scrollY = $state(0);

	const links = [
		...projects.map((project) => ({ href: project.link, label: () => project.name.replace('-', ' ') })),
		{ href: '/about-us', label: m.nav_about }
	];

	/** @param {string} href */
	function isActive(href) {
		return page.url.pathname.startsWith(`${base}${href}`);
	}

	const installActive = $derived(isActive('/installation'));

	function close() {
		isOpen = false;
	}

	afterNavigate(close);

	$effect(() => {
		document.documentElement.style.overflow = isOpen ? 'hidden' : '';
		return () => (document.documentElement.style.overflow = '');
	});
</script>

<svelte:window bind:scrollY onkeydown={(e) => e.key === 'Escape' && close()} />

<header class="nav-wrap" class:scrolled={scrollY > 12} class:open={isOpen}>
	<nav class="nav" aria-label="Main">
		<a href="{base}/" class="brand" aria-label="CowCatcher AI — home">
			<Logo size={34} />
		</a>

		<ul class="links">
			{#each links as link (link.href)}
				<li>
					<a
						href="{base}{link.href}"
						class:active={isActive(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
					>
						{link.label()}
					</a>
				</li>
			{/each}
		</ul>

		<div class="actions">
			<span class="desktop-only"><LanguageSelect /></span>
			<a href="{base}/installation" class="btn btn--sm install-btn" class:btn--ink={!installActive} class:btn--solid={installActive}>
				{m.nav_install()}
			</a>
			<button
				type="button"
				class="burger"
				onclick={() => (isOpen = !isOpen)}
				aria-expanded={isOpen}
				aria-controls="mobile-menu"
				aria-label={isOpen ? m.nav_close() : m.nav_menu()}
			>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</nav>
</header>

<div id="mobile-menu" class="menu" class:open={isOpen} aria-hidden={!isOpen} inert={!isOpen}>
	<div class="menu-inner container">
		<ul class="menu-links">
			<li style="--i: 0">
				<a href="{base}/" onclick={close}>{m.nav_home()}</a>
			</li>
			{#each links as link, i (link.href)}
				<li style="--i: {i + 1}">
					<a href="{base}{link.href}" onclick={close} class:active={isActive(link.href)}>{link.label()}</a>
				</li>
			{/each}
			<li style="--i: {links.length + 1}">
				<a href="{base}/installation" onclick={close} class:active={installActive}>{m.nav_install()}</a>
			</li>
		</ul>

		<div class="menu-foot" style="--i: {links.length + 2}">
			<LanguageSelect variant="full" />
			<a href="{base}/installation" class="btn btn--solid btn--lg" onclick={close}>
				{m.front_page_intro_btn_install()}
				<span class="btn__icon"><Icon name="arrow-right" /></span>
			</a>
		</div>
	</div>
</div>

<style>
	.nav-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-nav);
		padding: 0.9rem var(--gutter) 0;
		pointer-events: none;
	}

	.nav {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: var(--container);
		margin: 0 auto;
		padding: 0.45rem 0.45rem 0.45rem 0.9rem;
		border-radius: var(--radius-pill);
		background: oklch(98% 0.006 145 / 0.72);
		backdrop-filter: blur(18px) saturate(1.4);
		-webkit-backdrop-filter: blur(18px) saturate(1.4);
		box-shadow:
			inset 0 0 0 1px oklch(100% 0 0 / 0.6),
			0 0 0 1px var(--line);
		transition:
			box-shadow var(--dur) var(--ease-spring),
			background-color var(--dur) var(--ease-spring);
	}

	.scrolled .nav,
	.open .nav {
		background: oklch(98.5% 0.006 145 / 0.88);
		box-shadow:
			inset 0 0 0 1px oklch(100% 0 0 / 0.7),
			0 0 0 1px var(--line),
			var(--shadow-md);
	}

	.brand {
		display: inline-flex;
		text-decoration: none;
		border-radius: var(--radius-sm);
	}

	.links {
		display: none;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 0.15rem;
	}

	.links a {
		position: relative;
		display: block;
		padding: 0.55rem 0.85rem;
		border-radius: var(--radius-pill);
		color: var(--text-muted);
		font-size: 0.93rem;
		font-weight: 500;
		text-decoration: none;
		transition:
			color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.links a:hover {
		color: var(--text-main);
		background: oklch(22% 0.02 145 / 0.05);
	}

	.links a.active {
		color: var(--primary);
		background: var(--primary-soft);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.desktop-only {
		display: none;
	}

	.install-btn {
		display: none;
	}

	/* ── Hamburger: twee lijnen die tot een kruis draaien ── */
	.burger {
		position: relative;
		width: 2.75rem;
		height: 2.75rem;
		border: 0;
		border-radius: 50%;
		background: var(--text-main);
		cursor: pointer;
		transition: background-color var(--dur) var(--ease-spring);
	}

	.burger-line {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 1.05rem;
		height: 1.6px;
		margin-left: -0.525rem;
		border-radius: 2px;
		background: var(--bg-color);
		transition: transform var(--dur) var(--ease-spring);
	}

	.burger-line:first-child {
		transform: translateY(-3.5px);
	}

	.burger-line:last-child {
		transform: translateY(3.5px);
	}

	.open .burger {
		background: var(--primary);
	}

	.open .burger-line:first-child {
		transform: rotate(45deg);
	}

	.open .burger-line:last-child {
		transform: rotate(-45deg);
	}

	/* ── Mobiel menu: schermvullend glas met getrapte links ── */
	.menu {
		position: fixed;
		inset: 0;
		z-index: calc(var(--z-nav) - 1);
		background: oklch(97% 0.008 145 / 0.9);
		backdrop-filter: blur(28px);
		-webkit-backdrop-filter: blur(28px);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity var(--dur) var(--ease-spring),
			visibility 0s linear var(--dur);
	}

	.menu.open {
		opacity: 1;
		visibility: visible;
		transition:
			opacity var(--dur) var(--ease-spring),
			visibility 0s;
	}

	.menu-inner {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100dvh;
		padding-top: 7rem;
		padding-bottom: 2rem;
	}

	.menu-links {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.menu-links li,
	.menu-foot {
		opacity: 0;
		transform: translateY(2rem);
		transition:
			opacity 0.5s var(--ease-out),
			transform 0.6s var(--ease-spring);
	}

	.menu.open .menu-links li,
	.menu.open .menu-foot {
		opacity: 1;
		transform: none;
		transition-delay: calc(80ms + var(--i) * 45ms);
	}

	.menu-links a {
		display: block;
		padding: 0.35rem 0;
		font-family: var(--font-heading);
		font-size: clamp(2.6rem, 11vw, 3.6rem);
		line-height: 1;
		color: var(--text-main);
		text-decoration: none;
	}

	.menu-links a.active {
		color: var(--primary);
	}

	.menu-foot {
		display: grid;
		gap: 0.75rem;
		padding-top: 2rem;
	}

	@media (min-width: 1080px) {
		.links,
		.desktop-only {
			display: flex;
		}

		.install-btn {
			display: inline-flex;
		}

		.burger,
		.menu {
			display: none;
		}
	}
</style>
