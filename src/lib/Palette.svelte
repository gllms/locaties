<script lang="ts">
  import {
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
    TRIGGERS,
    dndzone,
  } from "svelte-dnd-action";
  import Drawer from "./Drawer.svelte";
  import { flip } from "svelte/animate";

  export let title = "";
  export let icon = "";
  export let items: CanvasItem[] = [];
  export let paletteTypes: Record<string, PaletteItem> = {};

  const flipDurationMs = 200;

  let idx = 0;

  function handleConsider(e: DndEventParameter) {
    const { trigger, id } = e.detail.info;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      e.detail.items = e.detail.items.filter(
        (item) => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
      );

      const index = items.findIndex(
        (item) => item.id.toString() === id.toString()
      );

      e.detail.items.splice(index, 0, { ...items[index], id: title + idx++ });

      items = e.detail.items;
    } else {
      items = [...items];
    }
  }

  function handleFinalize(e: DndEventParameter) {
    items = [...items];
  }
</script>

<Drawer {title} {icon}>
  <div
    class="flex flex-col gap-6 mb-6"
    use:dndzone={{
      items,
      flipDurationMs,
      dropTargetStyle: {},
      dropFromOthersDisabled: true,
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}>
    {#each items as item (item.id)}
      {@const paletteType = paletteTypes[item.paletteType]}
      <div
        class="flex items-center gap-3 p-4 bg-grey-100 c-primary-900 b-(2 solid grey-300) rd-3"
        animate:flip={{ duration: flipDurationMs }}>
        <span class="material-icons">drag_indicator</span>
        <div class="flex items-center gap-2">
          <span class="material-icons">{paletteType.icon}</span>
          <span class="font-bold">{paletteType.name}</span>
        </div>
      </div>
    {/each}
  </div>
</Drawer>
