<script>
  let { title = '', desc = '' } = $props();
</script>

<div class="feature-card">
  <h2>{title}</h2>
  <p>{desc}</p>
</div>

<style>
  .feature-card {
    background: var(--card-bg);
    padding: 25px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    border-top: 4px solid var(--primary);
    height: 100%;
    box-sizing: border-box;
  }

  h2 {
    color: var(--primary);
    margin-top: 0;
    font-size: 1.8rem;
    font-family: var(--font-heading);
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    color: var(--text-main);
    line-height: 1.6;
    font-family: var(--font-body);
    margin-bottom: 0;
  }
</style>
