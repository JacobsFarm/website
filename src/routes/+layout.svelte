<script>
	import '../app.css';
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LanguageModal from '$lib/components/LanguageModal.svelte';

	let { children } = $props();

	// De pagina wordt statisch in het Engels gegenereerd; in de browser zetten
	// we de taal van het document gelijk aan de gekozen taal.
	$effect(() => {
		document.documentElement.lang = getLocale();
	});

	// Hydratie werkt {@html}-teksten niet bij, die bleven dan Engels. Bij een
	// andere taal bouwen we de inhoud na het laden daarom één keer opnieuw op.
	let hydrated = $state(false);
	$effect(() => {
		hydrated = true;
	});
	const rerender = $derived(hydrated && getLocale() !== 'en');
</script>

<a class="skip-link" href="#main">{m.skip_to_content()}</a>

<LanguageModal />

<Navbar />

<main id="main" tabindex="-1">
	{#key rerender}
		{@render children()}
	{/key}
</main>

<Footer />

<style>
	main {
		display: block;
		min-height: 70vh;
		outline: none;
	}
</style>
