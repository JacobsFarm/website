<script>
    import * as m from '$lib/paraglide/messages.js';
    export let title;
    export let link;
    export let desc = "";
    </script>
    <div class="card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <a href={link}>{m.read_more()} &rarr;</a>
    </div>
    <style>
      .card { border: 1px solid #ddd; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; background: #f9f9f9; }
      h2 { margin-top: 0; color: #2c3e50; }
    </style>