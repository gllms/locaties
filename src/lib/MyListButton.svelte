<script>
  import Button from "./Button.svelte";
</script>

<div class="fixed bottom-0 flex items-center justify-between w-full px-8 py-4 bg-primary-400 gap-2 z-4">
  <div class="flex gap-2 shrink-1">
    <span class="c-secondary-900 font-bold">NIEUW</span>
    <p class="m-0">Deel je favorieten met anderen en beslis samen!</p>
  </div>
  <Button
    on:click={() => (location.href = "/form/edit")}
    icon="speaker_notes"
    text="Start deelformulier" />
</div>

<style>
  :global(div[data-testid="pageDrawer"] div[class^="styles_scrollArea"]) {
    padding-bottom: var(--spacing-18x);
  }
</style>
