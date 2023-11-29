<script lang="ts">
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
  } from "svelte-dnd-action";
  import Button from "./Button.svelte";

  import Date from "./palette/Date.svelte";
  import Filter from "./palette/Filter.svelte";
  import Long from "./palette/Long.svelte";
  import Short from "./palette/Short.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import filters from "../filters";
  import ViewMode from "./ViewMode.svelte";
  import Drawer from "./Drawer.svelte";
  import Palette from "./Palette.svelte";

  let viewMode = false;

  const flipDurationMs = 200;
  let idx = 0;

  let title = "";
  let description = "";

  let dialog: HTMLDialogElement;
  let dragDisabled = false;

  let filterTypes: Record<string, PaletteItem> = {};

  for (const [key, filter] of Object.entries(filters)) {
    filterTypes[key] = {
      name: filter.name,
      icon: filter.icon,
      category: "filters",
      component: Filter,
      args: { filter: key },
    };
  }

  const paletteTypes: Record<string, PaletteItem> = {
    ...filterTypes,
    date: {
      name: "Datum",
      icon: "date_range",
      category: "filters",
      component: Date,
    },
    shortText: {
      name: "Korte tekst",
      icon: "short_text",
      category: "open",
      component: Short,
    },
    longText: {
      name: "Lange tekst",
      icon: "notes",
      category: "open",
      component: Long,
    },
  };

  let paletteItems: CanvasItem[] = Object.keys(paletteTypes).map((key) => ({
    id: idx++,
    paletteType: key,
    data: undefined!,
  }));

  let canvasItems: CanvasItem[] = [];

  function handleCanvasConsider(e: DndEventParameter) {
    canvasItems = e.detail.items;
  }

  function handleCanvasFinalize(e: DndEventParameter) {
    canvasItems = e.detail.items;
  }

  function handlePointerdown(e: MouseEvent) {
    if ((e.target as HTMLElement)?.closest("dialog")) {
      dragDisabled = true;
      setTimeout(() => (dragDisabled = false), 100);
    }
  }
</script>

<svelte:head>
  <title>Deelformulier</title>
</svelte:head>

<div class="w-full px-2 lg:px-20 xl:px-[16rem] xxl:px-[32rem]">
  <div class="flex gap-6 w-full pt-12 mb-6 px-6">
    {#if viewMode}
      <Button
        secondary
        icon="chevron_left"
        on:click={() => (viewMode = false)}
        class="b-none"
        text="Terug" />
    {:else}
      <Button
        secondary
        icon="visibility"
        on:click={() => (viewMode = true)}
        class="b-none ml-auto"
        text="Voorbeeld" />
      <Button icon="share" on:click={() => dialog.showModal()} text="Delen" />
    {/if}
  </div>

  <div class="flex gap-3 w-full pb-6">
    <div class="w-42rem">
      <Palette
        title="Filters"
        icon="filter_alt"
        items={paletteItems.filter(
          (e) => paletteTypes[e.paletteType].category === "filters"
        )}
        {paletteTypes} />
      <Palette
        title="Open"
        icon="short_text"
        items={paletteItems.filter(
          (e) => paletteTypes[e.paletteType].category === "open"
        )}
        {paletteTypes} />
    </div>
    <div class="flex flex-col w-full">
      {#if viewMode}
        <ViewMode {title} {description} {paletteTypes} {canvasItems} />
      {:else}
        <div
          class="flex flex-col mx-6 px-6 py-4 bg-primary-200 b-(2 solid primary-400) rd-3 placeholder:c-grey-400">
          <input
            type="text"
            bind:value={title}
            placeholder="Naamloos"
            class="font-size-[1.8rem] font-bold line-height-unset bg-transparent b-none" />
          <textarea
            rows="2"
            bind:value={description}
            placeholder="Formulierbeschrijving"
            class="mt-4 bg-transparent c-grey-500 b-none resize-y" />
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="flex flex-col rd-3 m-3 outline-(0 dashed grey-300) [&.dropTarget]:outline-2"
          style:outline-width={canvasItems.length === 0 ? "2px" : undefined}
          use:dndzone={{
            items: canvasItems,
            flipDurationMs,
            dragDisabled: canvasItems.length === 0 || dragDisabled,
            dropTargetClasses: ["dropTarget"],
            dropTargetStyle: {},
            morphDisabled: true,
          }}
          on:consider={handleCanvasConsider}
          on:finalize={handleCanvasFinalize}
          on:pointerdown={handlePointerdown}>
          {#each canvasItems as item (item.id)}
            {@const paletteType = paletteTypes[item.paletteType]}
            <div
              class="flex flex-col gap-3 m-3 px-6 py-4 bg-white b-(2 solid grey-300) rd-3"
              animate:flip={{ duration: flipDurationMs }}>
              <div class="flex items-center gap-2">
                <span class="material-icons">{paletteType.icon}</span>
                <span class="name">{paletteType.name}</span>
                <button
                  class="icon-button ml-auto"
                  on:click={() =>
                    (canvasItems = canvasItems.filter((e) => e !== item))}>
                  highlight_off
                </button>
              </div>
              <svelte:component
                this={paletteType.component}
                viewMode={false}
                {...paletteType.args}
                bind:data={item.data} />
            </div>
          {:else}
            <div
              class="flex flex-col items-center gap-3 m-3 p-6 c-primary-900 rd-3">
              <span class="font-bold">Sleep hier een item naartoe</span>
              <span class="material-icons" style:font-size="3rem">mouse</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<ShareDialog bind:element={dialog} />

<style>
  :global(head:has(meta[property="og:url"][content^="/form"]) + body) {
    & div[class^="styles_searchButtonWrapper"],
    & div[class^="styles_contentWrapper"],
    & footer {
      display: none;
    }
  }

  :global(div[class^="styles_pageWrapper"]) {
    justify-content: start;
  }
</style>
