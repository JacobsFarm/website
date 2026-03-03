<script>
    import * as m from '$lib/paraglide/messages.js';
    </script>
    <nav>
      <a href="/">{m.nav_home()}</a>
      <a href="/projects/cowcatcher">CowCatcher</a>
      <a href="/installation">{m.nav_install()}</a>
      <a href="/about-us">{m.nav_about()}</a>
    </nav>
    <style>
      nav { display: flex; gap: 1rem; padding: 1rem; background: #2c3e50; }
      a { text-decoration: none; color: white; font-weight: bold; }
      a:hover { color: #3498db; }
    </style>