<script lang="ts">
  import {
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
    TRIGGERS,
    dndzone,
  } from "svelte-dnd-action";
  import Drawer from "./Drawer.svelte";
  import { flip } from "svelte/animate";
  import paletteTypes from "../paletteTypes";

  export let title = "";
  export let icon = "";
  export let open = true;

  export let items: CanvasItem[] = [];

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
</script>

<Drawer {title} {icon} {open}>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
    use:dndzone={{
      items,
      flipDurationMs,
      dropTargetStyle: {},
      dropFromOthersDisabled: true,
    }}
    on:consider={handleConsider}
    on:finalize={() => (items = [...items])}>
    {#each items as item (item.id)}
      {@const paletteType = paletteTypes[item.paletteType]}
      <div
        class="flex items-center gap-3 p-4 bg-grey-100 b-(1 solid grey-300) rd-3"
        animate:flip={{ duration: flipDurationMs }}>
        <span class="material-icons c-primary-900">drag_indicator</span>
        <div class="flex items-center gap-2">
          <span class="material-icons">{paletteType.icon}</span>
          <span class="font-500">{paletteType.name}</span>
        </div>
      </div>
    {/each}
  </div>
</Drawer>
