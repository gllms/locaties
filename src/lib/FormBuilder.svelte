<script lang="ts">
  import { flip } from "svelte/animate";
  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";
  import Button from "./Button.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import filters from "../filters";
  import ViewMode from "./ViewMode.svelte";
  import Palette from "./Palette.svelte";

  import Date from "./palette/Date.svelte";
  import Filter from "./palette/Filter.svelte";
  import Long from "./palette/Long.svelte";
  import Short from "./palette/Short.svelte";

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
    date: {
      name: "Datum",
      icon: "date_range",
      category: "filters",
      component: Date,
    },
    ...filterTypes,
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

<div class="w-full mt-8 px-8 xl:px-20 xxl:px-[16rem]">
  {#if viewMode}
    <Button
      secondary
      icon="chevron_left"
      on:click={() => (viewMode = false)}
      class="b-none ml-4 mb-4"
      text="Terug" />
  {/if}

  <div class="flex gap-3 w-full pb-6">
    <div class="w-72rem" style:display={viewMode ? "none" : "block"}>
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
        {paletteTypes}
        open={false} />
    </div>
    <div class="flex flex-col w-full mx-4">
      {#if viewMode}
        <ViewMode {title} {description} {paletteTypes} {canvasItems} />
      {:else}
        <div class="flex gap-4">
          <div
            class="grow-1 flex flex-col px-6 py-4 bg-primary-200 b-(2 solid primary-400) rd-3 placeholder:c-grey-400">
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
          <div class="flex flex-col gap-4 [&>button]:h-5">
            <Button
              secondary
              icon="visibility"
              on:click={() => (viewMode = true)}
              class="!h-20"
              text="Voorbeeld" />
            <Button
              icon="share"
              on:click={() => dialog.showModal()}
              class="!h-20 w-unset"
              text="Delen" />
          </div>
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="relative flex flex-col gap-6 min-h-13rem my-6 rd-3 outline-(0 dashed grey-300) [&.dropTarget]:(outline-2 outline-offset-[1rem])"
          style:outline-width={canvasItems.length === 0 ? "2px" : undefined}
          style:transition={"outline-offset .3s ease-in-out, outline-width .3s ease-in-out"}
          use:dndzone={{
            items: canvasItems,
            flipDurationMs,
            dragDisabled: canvasItems.length === 0 || dragDisabled,
            dropTargetClasses: ["dropTarget"],
            dropTargetStyle: {},
            morphDisabled: true,
          }}
          on:consider={(e) => (canvasItems = e.detail.items)}
          on:finalize={(e) => (canvasItems = e.detail.items)}
          on:pointerdown={handlePointerdown}>
          {#each canvasItems as item (item.id)}
            {@const paletteType = paletteTypes[item.paletteType]}
            <div
              class="flex flex-col gap-3 px-6 py-4 bg-white b-(2 solid grey-300) rd-3"
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
          {/each}
          {#if canvasItems.length === 0 || canvasItems.length === 1 && canvasItems[0][SHADOW_ITEM_MARKER_PROPERTY_NAME]}
          <div
              class="absolute flex flex-col items-center w-full gap-3 m-3 p-6 c-primary-900 rd-3">
              <span class="font-bold">Sleep hier een item naartoe</span>
              <span class="material-icons" style:font-size="3rem">mouse</span>
            </div>
            {/if}
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
