<script>
	/** Paginatitel en beschrijving voor zoekmachines en gedeelde links. */
	let { title = '', description = '' } = $props();

	const fullTitle = $derived(title ? `${title} | CowCatcher AI` : 'CowCatcher AI');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:title" content={fullTitle} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CowCatcher AI" />
</svelte:head>
