<script lang="ts">
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
    type DndEvent,
  } from "svelte-dnd-action";
  import Button from "./Button.svelte";
  import type { SvelteComponent } from "svelte";

  import Date from "./palette/Date.svelte";
  import Long from "./palette/Long.svelte";
  import Short from "./palette/Short.svelte";

  const flipDurationMs = 300;
  let idx = 0;

  interface CanvasItem {
    id: number;
    paletteType: string;
    data: object;
  }

  const paletteTypes: Record<string, { name: string; icon: string, component: new (...args: any[]) => SvelteComponent }> = {
    date: {
      name: "Datum",
      icon: "date_range",
      component: Date,
    },
    shortText: {
      name: "Korte tekst",
      icon: "short_text",
      component: Short,
    },
    longText: {
      name: "Lange tekst",
      icon: "notes",
      component: Long,
    },
  };

  let paletteItems: CanvasItem[] = Object.keys(paletteTypes).map(key => ({
    id: idx++,
    paletteType: key,
    data: {},
  }));

  let canvasItems: CanvasItem[] = [];

  function handlePaletteConsider(e: DndEventParameter) {
    const { trigger, id } = e.detail.info;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      // the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above
      e.detail.items = e.detail.items.filter(
        // @ts-ignore
        (item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
      );
      const index = paletteItems.findIndex((item) => item.id.toString() === id.toString());

      e.detail.items.splice(index, 0, { ...paletteItems[index], id: idx++ });

      paletteItems = e.detail.items;
    } else {
      paletteItems = [...paletteItems];
    }
  }

  function handlePaletteFinalize(e: DndEventParameter) {
    paletteItems = [...paletteItems];
  }

  function handleCanvasConsider(e: DndEventParameter) {
    canvasItems = e.detail.items;
  }

  function handleCanvasFinalize(e: DndEventParameter) {
    canvasItems = e.detail.items;
  }
</script>

<svelte:head>
  <title>Deelformulier</title>
</svelte:head>

<div class="toolbar">
  <Button secondary icon="visibility" style="border: none" text="Voorbeeld" />
  <Button icon="send" on:click={() => console.log(canvasItems)} text="Verzenden" />
</div>

<div class="formWrapper">
  <div
    class="palette"
    use:dndzone={{ items: paletteItems, flipDurationMs, dropTargetStyle: {} }}
    on:consider={handlePaletteConsider}
    on:finalize={handlePaletteFinalize}>
    {#each paletteItems as item (item.id)}
      {@const paletteType = paletteTypes[item.paletteType]}
      <div class="paletteItem" animate:flip={{ duration: flipDurationMs }}>
        <span class="material-icons">drag_indicator</span>
        <div>
          <span class="material-icons">{paletteType.icon}</span>
          <span class="name">{paletteType.name}</span>
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
          outline: "1px dashed var(--color-primary-900)",
          outlineOffset: "var(--spacing-2x)",
        },
        morphDisabled: true,
      }}
      on:consider={handleCanvasConsider}
      on:finalize={handleCanvasFinalize}>
      {#each canvasItems as item (item.id)}
        {@const paletteType = paletteTypes[item.paletteType]}
        <div class="canvasItem" animate:flip={{ duration: flipDurationMs }}>
          <div class="canvasItemHeader">
            <span class="material-icons">{paletteType.icon}</span>
            <span class="name">{paletteType.name}</span>
            <button
              on:click={() =>
                (canvasItems = canvasItems.filter((e) => e !== item))}>
              <span class="material-icons">highlight_off</span>
            </button>
          </div>
          <svelte:component this={paletteType.component} bind:data={item.data} />
        </div>
      {:else}
        <div class="emptyCanvasItem">
          <span class="name" style:font-weight="bold">Sleep hier een item naartoe</span>
          <span class="material-icons" style:font-size="3rem">mouse</span>
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

  :global(div[class^="styles_pageWrapper"]:has(.formWrapper) + footer) {
    display: none;
  }

  :global(div[class^="styles_pageWrapper"]) {
    justify-content: start;
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
    background-color: var(--color-grey-100);
    color: var(--color-primary-900);
    border: 2px solid var(--color-grey-300);
    border-radius: var(--border-radius-3x);
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
    resize: vertical;
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
    margin-bottom: var(--spacing-6x);
  }

  .emptyCanvasItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3x);
    padding: var(--spacing-6x) var(--spacing-6x);
    color: var(--color-primary-900);
    outline: 1px dashed var(--color-primary-900);
    outline-offset: var(--spacing-2x);
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
