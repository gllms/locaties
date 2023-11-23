<script lang="ts">
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
  } from "svelte-dnd-action";
  import Button from "./Button.svelte";
  import type { SvelteComponent } from "svelte";

  import Date from "./palette/Date.svelte";
  import Long from "./palette/Long.svelte";
  import Short from "./palette/Short.svelte";

  let viewMode = false;

  const flipDurationMs = 200;
  let idx = 0;

  let title = "";
  let description = "";

  let dialog: HTMLDialogElement;

  interface CanvasItem {
    id: number;
    paletteType: string;
    data: object;
  }

  const paletteTypes: Record<
    string,
    {
      name: string;
      icon: string;
      component: new (...args: any[]) => SvelteComponent;
    }
  > = {
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

  let paletteItems: CanvasItem[] = Object.keys(paletteTypes).map((key) => ({
    id: idx++,
    paletteType: key,
    data: {},
  }));

  let canvasItems: CanvasItem[] = [
    {
      id: idx++,
      paletteType: "date",
      data: {},
    },
  ];

  function handlePaletteConsider(e: DndEventParameter) {
    const { trigger, id } = e.detail.info;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      // the line below was added in order to be compatible with version svelte-dnd-action 0.7.4 and above
      e.detail.items = e.detail.items.filter(
        // @ts-ignore
        (item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
      );
      const index = paletteItems.findIndex(
        (item) => item.id.toString() === id.toString()
      );

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

<div class="wrapper">
  <div class="toolbar">
    {#if viewMode}
      <Button
        secondary
        icon="chevron_left"
        on:click={() => (viewMode = false)}
        style="border: none"
        text="Terug" />
    {:else}
      <Button
        secondary
        icon="edit"
        on:click={() => (viewMode = true)}
        style="border: none; margin-left: auto"
        text="Voorbeeld" />
      <Button icon="share" on:click={() => dialog.showModal()} text="Delen" />
    {/if}
  </div>

  <div class="formWrapper">
    <div
      class="palette"
      style:display={viewMode ? "none" : undefined}
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
        {#if viewMode}
          <h1>{title || "Naamloos"}</h1>
          {#if description}
            <p>{description}</p>
          {/if}
        {:else}
          <input type="text" bind:value={title} placeholder="Naamloos" />
          <textarea
            rows="2"
            bind:value={description}
            placeholder="Formulierbeschrijving" />
        {/if}
      </div>
      <div
        class="canvasItems"
        style:outline={canvasItems.length === 0 && !viewMode
          ? "2px dashed var(--color-grey-300)"
          : undefined}
        use:dndzone={{
          items: canvasItems,
          flipDurationMs,
          dragDisabled: canvasItems.length === 0 || viewMode,
          dropTargetClasses: ["dropTarget"],
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
                  (canvasItems = canvasItems.filter((e) => e !== item))}
                style:display={viewMode ? "none" : undefined}>
                <span class="material-icons">highlight_off</span>
              </button>
            </div>
            <svelte:component
              this={paletteType.component}
              {viewMode}
              bind:data={item.data} />
          </div>
        {:else}
          {#if !viewMode}
            <div class="emptyCanvasItem">
              <span class="name" style:font-weight="bold"
                >Sleep hier een item naartoe</span>
              <span class="material-icons" style:font-size="3rem">mouse</span>
            </div>
          {/if}
        {/each}
      </div>
      {#if viewMode}
        <Button
          icon="send"
          text="Verzenden"
          style="margin-left: auto; margin-right: var(--spacing-6x)" />
      {/if}
    </div>
  </div>
</div>

<dialog bind:this={dialog}>
  <button
    class="material-icons close"
    style:margin-left="auto"
    on:click={() => dialog.close()}>
    close
  </button>
  <br />
  <input type="text" value="https://locaties.nl/form/dQw4w9WgXcQ" />
</dialog>

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

  .wrapper {
    padding-inline: var(--spacing-2x);

    @media (min-width: 1024.02px) {
      padding-inline: var(--spacing-20x);
    }

    @media (min-width: 1400.02px) {
      padding-inline: 16rem;
    }

    @media (min-width: 1600.02px) {
      padding-inline: 32rem;
    }
  }

  .toolbar {
    display: flex;
    gap: var(--spacing-6x);
    width: 100%;
    margin-top: var(--spacing-12x);
    margin-bottom: var(--spacing-6x);
    padding-inline: var(--spacing-6x);
  }

  .formWrapper {
    display: flex;
    gap: var(--spacing-3x);
    width: 100%;
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
    padding: var(--spacing-4x);
    background-color: var(--color-grey-100);
    color: var(--color-primary-900);
    border: 2px solid var(--color-grey-300);
    border-radius: var(--border-radius-3x);

    & > div {
      display: flex;
      align-items: center;
      gap: var(--spacing-2x);
    }
  }

  .paletteItem .name {
    font-weight: bold;
  }

  .header {
    display: flex;
    flex-direction: column;
    margin-inline: var(--spacing-6x);
    padding: var(--spacing-4x) var(--spacing-6x);
    background-color: var(--color-primary-200);
    border: 2px solid var(--color-primary-400);
    border-radius: var(--border-radius-3x);

    & input,
    & h1 {
      font-size: 1.8rem;
      font-weight: bold;
      line-height: unset;
      background-color: transparent;
      border: none;
    }

    & textarea,
    & p {
      margin-block-start: var(--spacing-4x);
      background-color: transparent;
      color: var(--color-grey-500);
      border: none;
      resize: vertical;
    }

    & textarea::placeholder {
      color: var(--color-grey-400);
    }
  }

  .canvas {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .canvasItems {
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius-3x);
    margin: var(--spacing-3x);
    margin-bottom: var(--spacing-6x);
  }

  :global(.dropTarget) {
    outline: 2px dashed var(--color-grey-300) !important;
  }

  .emptyCanvasItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3x);
    margin: var(--spacing-3x);
    padding: var(--spacing-6x) var(--spacing-6x);
    color: var(--color-primary-900);
    border-radius: var(--border-radius-3x);

    & span {
      width: fit-content;
    }
  }

  .canvasItem {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3x);
    margin: var(--spacing-3x);
    padding: var(--spacing-4x) var(--spacing-6x);
    background-color: white;
    border: 2px solid var(--color-grey-300);
    border-radius: var(--border-radius-3x);
  }

  .canvasItemHeader {
    display: flex;
    align-items: center;
    gap: var(--spacing-2x);

    & button {
      background-color: transparent;
      border: none;
      margin-left: auto;
      cursor: pointer;
    }
  }

  dialog {
    width: 60.8rem;
    border: none;
    border-radius: 1.6rem;

    & .close {
      position: absolute;
      top: var(--spacing-8x);
      right: var(--spacing-8x);
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.44);
    }
  }
</style>
