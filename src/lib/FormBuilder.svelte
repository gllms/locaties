<script lang="ts">
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
  } from "svelte-dnd-action";
  import Button from "./Button.svelte";

  const flipDurationMs = 300;

  interface PaletteItem {
    id: number;
    name: string;
    icon: string;
  }

  let paletteItems: PaletteItem[] = [
    {
      id: 0,
      name: "Datum",
      icon: "date_range",
    },
    {
      id: 1,
      name: "Plaats",
      icon: "place",
    },
  ];

  let canvasItems: PaletteItem[] = [];

  function handlePaletteConsider(e) {
    const { trigger, id } = e.detail.info;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      const idx = paletteItems.findIndex((item) => item.id === id);
      const newId = `${id}_copy_${Math.round(Math.random() * 100000)}`;
      // the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above
      e.detail.items = e.detail.items.filter(
        (item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
      );
      e.detail.items.splice(idx, 0, { ...paletteItems[idx], id: newId });
      paletteItems = e.detail.items;
    } else {
      paletteItems = [...paletteItems];
    }
  }

  function handlePaletteFinalize(e) {
    paletteItems = [...paletteItems];
  }

  function handleCanvasConsider(e) {
    canvasItems = e.detail.items;
  }

  function handleCanvasFinalize(e) {
    canvasItems = e.detail.items;
  }
</script>

<svelte:head>
  <title>Deelformulier</title>
</svelte:head>

<div class="toolbar">
  <Button secondary icon="visibility" style="border: none">Voorbeeld</Button>
  <Button icon="send">Verzenden</Button>
</div>

<div class="formWrapper">
  <div
    class="palette"
    use:dndzone={{ items: paletteItems, flipDurationMs, dropTargetStyle: {} }}
    on:consider={handlePaletteConsider}
    on:finalize={handlePaletteFinalize}>
    {#each paletteItems as item (item.id)}
      <div class="paletteItem" animate:flip={{ duration: flipDurationMs }}>
        <span class="material-icons">drag_indicator</span>
        <div>
          <span class="material-icons">{item.icon}</span>
          <span class="name">{item.name}</span>
        </div>
      </div>
    {/each}
  </div>
  <div class="canvas">
    <div class="header">
      <input type="text" value="Naamloos deelformulier" />
      <textarea rows="2" placeholder="Formulierbeschrijving" />
    </div>
    <div
      class="canvasItems"
      use:dndzone={{
        items: canvasItems,
        flipDurationMs,
        dragDisabled: canvasItems.length === 0,
        dropTargetStyle: {
          outline: "2px dashed var(--color-grey-500)",
        },
        transformDraggedElement: element => {
          if (element) {
            const dragIndicator = element.querySelector(".material-icons");
            if (dragIndicator && dragIndicator.innerText === "drag_indicator")
              dragIndicator.remove();
          }
        },
      }}
      on:consider={handleCanvasConsider}
      on:finalize={handleCanvasFinalize}>
      {#each canvasItems as item (item.id)}
        <div class="canvasItem" animate:flip={{ duration: flipDurationMs }}>
          <div class="canvasItemHeader">
            <span class="material-icons">{item.icon}</span>
            <span class="name">{item.name}</span>
            <button on:click={() => (canvasItems = canvasItems.filter((e) => e !== item))}>
              <span class="material-icons">highlight_off</span>
            </button>
          </div>
          <input type="text" />
        </div>
      {:else}
        <div class="emptyCanvasItem">
          <span class="name">Sleep hier een item naartoe</span>
          <span class="material-icons">mouse</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(div[class^="styles_contentWrapper"]) {
    display: none;
  }

  :global(
      div[class^="styles_bannerInner"] div[class^="styles_contentWrapper"]
    ) {
    display: block;
  }

  .toolbar {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-6x);
    width: 100%;
    padding-inline: 32rem;
    margin-top: var(--spacing-12x);
    margin-bottom: var(--spacing-6x);
  }

  .formWrapper {
    display: flex;
    gap: var(--spacing-6x);
    width: 100%;
    padding-inline: 32rem;
  }

  .palette {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6x);
    width: 42rem;
  }

  .paletteItem {
    display: flex;
    gap: var(--spacing-3x);
    padding: var(--spacing-4x) var(--spacing-4x);
    background-color: var(--color-primary-400);
    border-radius: var(--border-radius-3x);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .paletteItem > div {
    display: flex;
    align-items: center;
    gap: var(--spacing-2x);
  }

  .paletteItem .name {
    font-weight: bold;
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-4x) var(--spacing-6x);
    background-color: var(--color-primary-200);
    border: 1px solid var(--color-primary-400);
    border-radius: var(--border-radius-3x);
  }

  .header input {
    font-size: 1.8rem;
    font-weight: bold;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .header textarea {
    padding: var(--spacing-4x) 0;
    background-color: transparent;
    color: var(--color-grey-500);
    border: none;
    outline: none;
  }

  .header textarea::placeholder {
    color: var(--color-grey-400);
  }

  .canvas {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6x);
    width: 100%;
  }

  .canvasItems {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6x);
    border-radius: var(--border-radius-3x);
  }

  .emptyCanvasItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-4x) var(--spacing-6x);
    outline: 2px dashed var(--color-grey-500);
    border-radius: var(--border-radius-3x);
  }

  .emptyCanvasItem span {
    width: fit-content;
  }

  .canvasItem {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3x);
    padding: var(--spacing-4x) var(--spacing-6x);
    background-color: white;
    border: 1px solid var(--color-grey-900);
    border-radius: var(--border-radius-3x);
  }

  .canvasItemHeader {
    display: flex;
    align-items: center;
    gap: var(--spacing-2x);
  }

  .canvasItemHeader button {
    background-color: transparent;
    border: none;
    margin-left: auto;
    cursor: pointer;
  }
</style>
