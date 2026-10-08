<script>
	/**
	 * Eén set lijn-iconen met dezelfde lijndikte, zodat alle iconen op de site
	 * bij elkaar passen. Merk-iconen (GitHub, Telegram, Facebook) zijn gevuld.
	 */
	let { name, size = 20, stroke = 1.6, label = '', class: className = '' } = $props();

	const filled = new Set(['github', 'telegram', 'facebook', 'play']);
</script>

<svg
	class="icon {className}"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill={filled.has(name) ? 'currentColor' : 'none'}
	stroke={filled.has(name) ? 'none' : 'currentColor'}
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : undefined}
	aria-label={label || undefined}
	aria-hidden={label ? undefined : 'true'}
>
	{#if name === 'arrow-right'}
		<path d="M5 12h14M13 6l6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M19 12H5M11 6l-6 6 6 6" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17 17 7M8 7h9v9" />
	{:else if name === 'arrow-down'}
		<path d="M12 5v14M6 13l6 6 6-6" />
	{:else if name === 'check'}
		<path d="m5 12.5 4.2 4.2L19 7" />
	{:else if name === 'check-circle'}
		<circle cx="12" cy="12" r="9" /><path d="m8.2 12.3 2.6 2.6 5-5.2" />
	{:else if name === 'play'}
		<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
	{:else if name === 'pause'}
		<path d="M8 5v14M16 5v14" />
	{:else if name === 'globe'}
		<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
	{:else if name === 'chevron-down'}
		<path d="m6 9 6 6 6-6" />
	{:else if name === 'menu'}
		<path d="M4 8h16M4 16h16" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{:else if name === 'camera'}
		<path d="M3.5 8.5 14 5l1.6 4.6L5.1 13.1Z" /><path d="m15.6 9.6 3.9-1.3v4.4l-3.1 1M9 12.2l1.2 3.6H5.5M5.5 13v6" />
	{:else if name === 'computer'}
		<rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><path d="m8.5 10 2 2 4-4" />
	{:else if name === 'phone'}
		<rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" />
	{:else if name === 'bell'}
		<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15Z" /><path d="M10 20.5a2 2 0 0 0 4 0" />
	{:else if name === 'users'}
		<circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.6-3.1 2.7-5 5.5-5s4.9 1.9 5.5 5" /><path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.4c1.6.6 2.7 2.2 3 4.6" />
	{:else if name === 'unlock'}
		<rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" /><path d="M12 14.5v2" />
	{:else if name === 'spark'}
		<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
	{:else if name === 'home'}
		<path d="M4 10.5 12 4l8 6.5V20H4Z" /><path d="M9.5 20v-5.5h5V20" />
	{:else if name === 'shield'}
		<path d="M12 3 19 6v5.5c0 4.2-2.9 7.8-7 9.5-4.1-1.7-7-5.3-7-9.5V6Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" />
	{:else if name === 'download'}
		<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
	{:else if name === 'wrench'}
		<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.6-.4-.4-2.6Z" />
	{:else if name === 'sliders'}
		<path d="M5 6h9M18 6h1M5 12h3M12 12h7M5 18h11M20 18h-1" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" />
	{:else if name === 'cart'}
		<circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17.5" cy="19.5" r="1.4" /><path d="M2.5 3.5h2.8l2.3 11.5h11.2l2-8.2H6.3" />
	{:else if name === 'book'}
		<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
	{:else if name === 'mail'}
		<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" />
	{:else if name === 'code'}
		<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
	{:else if name === 'eye'}
		<path d="M2.5 12C5 7.5 8.2 5.5 12 5.5s7 2 9.5 6.5c-2.5 4.5-5.7 6.5-9.5 6.5S5 16.5 2.5 12Z" /><circle cx="12" cy="12" r="3" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
	{:else if name === 'heart'}
		<path d="M12 20s-7.5-4.5-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.5-7.5 10-7.5 10Z" />
	{:else if name === 'github'}
		<path d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.02C22 6.48 17.52 2 12 2Z" />
	{:else if name === 'telegram'}
		<path d="M11.94 0A12 12 0 1 0 12 24 12 12 0 0 0 11.94 0Zm4.97 7.22c.1 0 .32.02.47.14.12.1.15.23.17.33.02.09.04.3.02.47-.18 1.9-.96 6.5-1.36 8.63-.17.9-.5 1.2-.82 1.23-.7.06-1.23-.46-1.9-.9-1.06-.7-1.65-1.13-2.68-1.8-1.18-.78-.42-1.21.26-1.91.18-.18 3.25-2.98 3.3-3.23 0-.03.02-.15-.05-.21s-.18-.04-.25-.03c-.1.03-1.8 1.14-5.06 3.35-.48.33-.91.49-1.3.48-.43 0-1.25-.24-1.87-.44-.75-.24-1.35-.37-1.3-.79.03-.21.33-.44.9-.66 3.5-1.52 5.83-2.53 7-3.01 3.33-1.39 4.02-1.63 4.47-1.64Z" />
	{:else if name === 'facebook'}
		<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
	{/if}
</svg>

<style>
	.icon {
		display: inline-block;
		flex-shrink: 0;
		vertical-align: middle;
	}
</style>
