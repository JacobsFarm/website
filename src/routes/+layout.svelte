<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
  <slot /> 
</main>

<Footer />

<style>
  :global(body) { 
    margin: 0; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
    background-color: #f9fbf9; /* Zachte off-white achtergrond */
    color: #2c3e2c;
  }

  /* De main selector werkt nu omdat er een <main> tag in de HTML staat */
  main { 
    max-width: 1100px; 
    margin: 0 auto; 
    padding: 3rem 2rem; 
    min-height: 80vh; 
  }

  :global(h1) {
    color: #386938; /* RAL 6001 Emerald Green */
  }
</style>