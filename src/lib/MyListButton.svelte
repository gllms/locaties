<script>
  import Button from "./Button.svelte";
</script>

<div>
  <div>
    <span>NIEUW</span>
    <p>Deel je favorieten met anderen en beslis samen!</p>
  </div>
  <Button
    on:click={() => (location.href = "/form")}
    icon="speaker_notes"
    text="Start deelformulier" />
</div>

<style>
  :global(div[data-testid="pageDrawer"] div[class^="styles_scrollArea"]) {
    padding-bottom: var(--spacing-18x);
  }

  div:has(> div) {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-inline: var(--spacing-8x);
    padding-block: var(--spacing-4x);
    background-color: var(--color-primary-400);
    gap: var(--spacing-2x);
    z-index: 4;

    & > div {
      display: flex;
      gap: var(--spacing-2x);
      flex-shrink: 1;
    }
  }

  span {
    color: var(--color-secondary-900);
    font-weight: bold;
  }

  p {
    margin: 0;
  }
</style>
