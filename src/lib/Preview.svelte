<script lang="ts">
  import Button from "./Button.svelte";
  import Overlay from "./Overlay.svelte";
  import ViewMode from "./ViewMode.svelte";

  import type Dialog from "./Dialog.svelte";

  const widths: Record<string, string> = {
    smartphone: "380px",
    tablet: "1023px",
    laptop: "100%",
  };

  let previewWidth = widths.laptop;

  export let title = "Naamloos";
  export let description = "";
  export let canvasItems: CanvasItem[] = [];
  export let shareDialog: Dialog;
  export let overlay: Overlay;
</script>

<Overlay bind:this={overlay}>
  <svelte:fragment slot="header">
    <div class="flex gap-4 [&>button]:b-b-(1 solid transparent)">
      {#each Object.entries(widths) as [device, width]}
        <button
          class="icon-button h-16 font-material-filled"
          class:!b-primary-600={previewWidth === width}
          on:click={() => (previewWidth = width)}>{device}</button
        >
      {/each}
    </div>
    <Button icon="mail" on:click={() => shareDialog.open()} text="Delen" />
  </svelte:fragment>
  <div
    class="_backdrop flex mx-auto w-full left-0 of-hidden transition-width,border-radius"
    class:py-4={previewWidth === widths.smartphone}
    style:width={previewWidth === widths.tablet ? widths.tablet : undefined}
    class:rd-4={previewWidth === widths.tablet}
  >
    <div
      class="@container mx-auto h-full of-hidden of-y-auto rd-4 transition-width"
      style:width={previewWidth}
    >
      <ViewMode {title} {description} {canvasItems} />
    </div>
  </div>
</Overlay>
