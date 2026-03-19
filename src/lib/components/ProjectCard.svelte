<script>
  import * as m from '$lib/paraglide/messages.js';
  import { base } from '$app/paths';
  
  export let title;
  export let link;
  export let desc = "";
  export let logo; 
</script>

<div class="card">
  {#if logo}
    <div class="logo-container">
      <img src={logo} alt="{title} logo" class="project-logo" />
    </div>
  {/if}
  <h2>{title}</h2>
  <p>{desc}</p>
  <a href="{base}{link}" class="btn">{m.read_more()} &rarr;</a>
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
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem; /* Verhoogde marge */
  }
  .project-logo {
    width: 100%; /* Maak responsief */
    max-width: 200px; /* Vergroot naar 200px (was 120px) */
    height: 100%; /* Maak responsief */
    max-height: 150px; /* Stel een maximale hoogte in om de kaart compact te houden */
    object-fit: contain; /* Zorgt ervoor dat het hele logo zichtbaar is zonder vervorming */
    border-radius: 0; /* Verwijder cirkelvorm */
    border: none; /* Verwijder de rand */
    padding: 0; /* Verwijder padding */
    background-color: transparent; /* Verwijder de achtergrond */
  }

  h2 { 
    margin-top: 0;
    color: #386938;
    font-size: 1.5rem;
    text-align: center;
  }
  p {
    color: #555;
    line-height: 1.6;
    flex-grow: 1;
    text-align: center;
  }
  .btn {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    background: #CCFF00;
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