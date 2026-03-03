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
      :global(body) { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; color: #333; }
      main { max-width: 1000px; margin: 0 auto; padding: 2rem; min-height: 80vh; }
    </style>