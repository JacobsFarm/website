<script>
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import LanguageModal from '$lib/components/LanguageModal.svelte';

    let { children } = $props();
</script>

<LanguageModal />

<Navbar />

<main>
  {@render children()}
</main>

<Footer />

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 2rem;
    min-height: 80vh;
  }

  :global(h1) {
    color: var(--primary);
  }
</style>
