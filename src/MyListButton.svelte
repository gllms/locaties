<div>
  <div>
    <span>NIEUW</span>
    <p>Deel je favorieten met anderen en beslis samen!</p>
  </div>
  <button on:click={() => location.href = "/form"}>Start deelformulier</button>
</div>

<style>
  div:has(div) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--spacing-8x);
    padding-block: var(--spacing-4x);
    background-color: var(--color-primary-400);
  }

  div > div {
    display: flex;
    gap: var(--spacing-2x);
  }

  span {
    color: var(--color-secondary-900);
  }
</style>