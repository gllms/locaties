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
  import ShareDialog from "./ShareDialog.svelte";

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

<div class="w-full px-2 lg:px-20 xl:px-[16rem] xxl:px-[32rem]">
  <div class="flex gap-6 w-full mt-12 mb-6 px-6">
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

  <div class="flex gap-3 w-full">
    <div
      class="flex flex-col gap-6 w-42rem"
      style:display={viewMode ? "none" : undefined}
      use:dndzone={{ items: paletteItems, flipDurationMs, dropTargetStyle: {} }}
      on:consider={handlePaletteConsider}
      on:finalize={handlePaletteFinalize}>
      {#each paletteItems as item (item.id)}
        {@const paletteType = paletteTypes[item.paletteType]}
        <div
          class="flex gap-3 p-4 bg-grey-100 c-primary-900 b-(2 solid grey-300) rd-3"
          animate:flip={{ duration: flipDurationMs }}>
          <span class="material-icons">drag_indicator</span>
          <div class="flex items-center gap-2">
            <span class="material-icons">{paletteType.icon}</span>
            <span class="font-bold">{paletteType.name}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex flex-col w-full">
      <div
        class="flex flex-col mx-6 px-6 py-4 bg-primary-200 b-(2 solid primary-400) rd-3 placeholder:c-grey-400
               [&>input,&>h1]:(font-size-[1.8rem] font-bold line-height-unset bg-transparent b-none)
               [&>textarea,&>p]:(mt-4 bg-transparent c-grey-500 b-none resize-y)">
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
        class="flex flex-col rd-3 m-3 mb-6 outline-(0 dashed grey-300) [&.dropTarget]:outline-2"
        style:outline-width={canvasItems.length === 0 && !viewMode
          ? "2px"
          : undefined}
        use:dndzone={{
          items: canvasItems,
          flipDurationMs,
          dragDisabled: canvasItems.length === 0 || viewMode,
          dropTargetClasses: ["dropTarget"],
          dropTargetStyle: {},
          morphDisabled: true,
        }}
        on:consider={handleCanvasConsider}
        on:finalize={handleCanvasFinalize}>
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
                  (canvasItems = canvasItems.filter((e) => e !== item))}
                style:display={viewMode ? "none" : undefined}>
                highlight_off
              </button>
            </div>
            <svelte:component
              this={paletteType.component}
              {viewMode}
              bind:data={item.data} />
          </div>
        {:else}
          {#if !viewMode}
            <div
              class="flex flex-col items-center gap-3 m-3 p-6 c-primary-900 rd-3">
              <span class="font-bold">Sleep hier een item naartoe</span>
              <span class="material-icons" style:font-size="3rem">mouse</span>
            </div>
          {/if}
        {/each}
      </div>
      {#if viewMode}
        <Button icon="send" text="Verzenden" class="ml-auto mr-6" />
      {/if}
    </div>
  </div>
</div>

<ShareDialog bind:element={dialog} />

<style>
  :global(div[class^="styles_contentWrapper"]) {
    display: none;
  }

  :global(
      div[class^="styles_bannerInner"] div[class^="styles_contentWrapper"]
    ) {
    display: block;
  }

  :global(head:has(meta[property="og:url"][content="/form"]) + body div[class^="styles_pageWrapper"] + footer) {
    display: none;
  }

  :global(div[class^="styles_pageWrapper"]) {
    justify-content: start;
  }
</style>
