<script lang="ts">
  import Button from "./Button.svelte";

  export let title = "Naamloos";
  export let description = "";

  export let paletteTypes: Record<string, PaletteItem>;
  export let canvasItems: CanvasItem[] = [];
</script>

<div class="rd-2 of-hidden">
  <div class="flex flex-col mb-6 px-8 py-6 bg-primary-200 placeholder:c-grey-400">
    <p class="mt-0 mb-2 c-grey-900">Georganiseerd door Mark</p>
    <h4>{title || "Naamloos"}</h4>
  </div>

  <div class="flex flex-col m-6 mt-0">
    {#if description}
      <p class="mt-0">{description}</p>
    {/if}

    <div class="flex flex-col gap-6 mb-6">
      {#each canvasItems as item (item.id)}
        {@const paletteType = paletteTypes[item.paletteType]}
        <div
          class="flex flex-col gap-3 px-6 py-4 bg-white b-(2 solid grey-300) rd-3">
          <div class="flex items-center gap-2">
            <span class="material-icons">{paletteType.icon}</span>
            <span class="name">{paletteType.name}</span>
          </div>
          <svelte:component
            this={paletteType.component}
            viewMode={true}
            {...paletteType.args}
            bind:data={item.data} />
        </div>
      {/each}
    </div>

    <Button icon="send" text="Verzenden" class="ml-auto" />
  </div>
</div>
