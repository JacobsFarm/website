<script>
  import * as m from '$lib/paraglide/messages.js';
  export let title;
  export let link;
  export let desc = "";
</script>

<div class="card">
  <h2>{title}</h2>
  <p>{desc}</p>
  <a href={link} class="btn">{m.read_more()} &rarr;</a>
</div>

<style>
  .card { 
    border: 1px solid #e0eee0;
    padding: 2rem; 
    border-radius: 12px; 
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  .card:hover {
    transform: translateY(-5px);
    border-color: #386938;
  }
  h2 { 
    margin-top: 0; 
    color: #386938; 
    font-size: 1.5rem;
  }
  p {
    color: #555;
    line-height: 1.6;
    flex-grow: 1;
  }
  .btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    background: #CCFF00; /* Lime */
    color: #386938;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    transition: background 0.2s;
  }
  .btn:hover {
    background: #b6e600;
  }
</style>