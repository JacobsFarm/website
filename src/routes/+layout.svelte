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
</script>

<a class="skip-link" href="#main">{m.skip_to_content()}</a>

<LanguageModal />

<Navbar />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<Footer />

<style>
	main {
		display: block;
		min-height: 70vh;
		outline: none;
	}
</style>
