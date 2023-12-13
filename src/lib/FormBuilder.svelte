<script lang="ts">
  import { title, description, canvasItems, secretOptions } from "../stores";

  import { flip } from "svelte/animate";
  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";

  import Button from "./Button.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import ViewMode from "./ViewMode.svelte";
  import Palette from "./Palette.svelte";
  import paletteTypes from "../paletteTypes";
  import Onboarding from "../Onboarding.svelte";

  let viewMode = false;

  const flipDurationMs = 200;
  let idx = 0;

  let dialog: HTMLDialogElement;
  let dragDisabled = true;

  let paletteItems: CanvasItem[] = Object.keys(paletteTypes).map((key) => ({
    id: idx++,
    paletteType: key,
    data: undefined!,
  }));

  function handlePointerdown(e: MouseEvent) {
    if ((e.target as HTMLElement)?.closest(".handle")) {
      dragDisabled = false;
    }
  }

  function swap(i: number, j: number) {
    if ($canvasItems.length <= 1 || j < 0 || j >= $canvasItems.length) {
      return;
    }
    const temp = $canvasItems[i];
    $canvasItems[i] = $canvasItems[j];
    $canvasItems[j] = temp;
  }
</script>

<svelte:head>
  <title>Deelformulier</title>
</svelte:head>

<svelte:document on:pointerup={() => (dragDisabled = true)} />

<div class="w-full pt-8 px-8 xl:px-20 xxl:px-16rem">
  {#if viewMode}
    <Button
      secondary
      icon="chevron_left"
      on:click={() => (viewMode = false)}
      class="b-none ml-4 mb-4"
      text="Terug"
    />
  {/if}

  <div class="flex gap-3 w-full pb-6">
    <div class="w-72rem" style:display={viewMode ? "none" : "block"}>
      <Palette
        title="Filters"
        icon="filter_alt"
        items={paletteItems.filter(
          (e) => paletteTypes[e.paletteType].category === "filters",
        )}
      />
      <Palette
        title="Open"
        icon="quiz"
        items={paletteItems.filter(
          (e) => paletteTypes[e.paletteType].category === "open",
        )}
      />
    </div>
    <div class="flex flex-col gap-4 w-full mx-4">
      {#if viewMode}
        <ViewMode
          title={$title}
          description={$description}
          canvasItems={$canvasItems}
        />
      {:else}
        <div class="flex gap-4">
          <div
            class="grow-1 flex flex-col px-6 py-4 bg-primary-200 b-(1 solid primary-400) rd-3 placeholder:c-grey-400"
          >
            <input
              type="text"
              bind:value={$title}
              placeholder="Naamloos"
              class="font-size-1.8rem font-bold line-height-unset bg-transparent b-none"
            />
            <textarea
              rows="2"
              bind:value={$description}
              placeholder="Formulierbeschrijving"
              class="mt-4 bg-transparent c-grey-600 b-none resize-y placeholder:c-grey-400"
            />
          </div>
          <div class="flex flex-col gap-4 [&>button]:h-5">
            <Button
              secondary
              icon="visibility"
              on:click={() => (viewMode = true)}
              class="!h-20"
              text="Voorbeeld"
            />
            <Button
              icon="share"
              on:click={() => dialog.showModal()}
              class="!h-20 w-unset"
              text="Delen"
            />
          </div>
        </div>
        <hr class="w-full stroke-(1 solid grey-600)" />
        <div
          class="relative flex flex-col gap-6 min-h-13rem rd-3 outline-(1 dashed transparent) [&.dropTarget]:(outline-(1 primary-900 offset-1rem))"
          class:!outline-primary-900={$canvasItems.length === 0}
          style:transition={"outline-offset .3s ease-in-out, outline-color .3s ease-in-out"}
          use:dndzone={{
            items: $canvasItems,
            flipDurationMs,
            dragDisabled: $canvasItems.length === 0 || dragDisabled,
            dropTargetClasses: ["dropTarget"],
            dropTargetStyle: {},
            morphDisabled: true,
          }}
          on:consider={(e) => ($canvasItems = e.detail.items)}
          on:finalize={(e) => ($canvasItems = e.detail.items)}
          on:pointerdown={handlePointerdown}
        >
          {#each $canvasItems as item, i (item.id)}
            {@const paletteType = paletteTypes[item.paletteType]}
            <div
              class="flex flex-row items-center pl-6 bg-white b-(1 solid grey-900) rd-3 [&:hover_.border-handle]:opacity-100"
              class:pr-6={$secretOptions.drag_handle === "border"}
              animate:flip={{ duration: flipDurationMs }}
            >
              <div class="flex-1 py-4 z-1">
                <div
                  class="flex items-center gap-2"
                  class:-mr-9={$secretOptions.drag_handle !== "border"}
                >
                  <span class="material-icons">{paletteType.icon}</span>
                  <span class="select-none">{paletteType.name}</span>
                  <button
                    class="icon-button ml-auto"
                    on:click={() =>
                      ($canvasItems = $canvasItems.filter((e) => e !== item))}
                  >
                    highlight_off
                  </button>
                </div>
                <input
                  type="text"
                  value={item.data?.description ?? ""}
                  on:change={e => item.data.description = e.currentTarget.value}
                  placeholder="Typ hier een eventuele beschrijving"
                  class="w-full my-4 py-4 b-none b-b-(1 solid grey-400)"
                />
                <svelte:component
                  this={paletteType.component}
                  viewMode={false}
                  {...paletteType.args}
                  bind:data={item.data}
                />
              </div>
              {#if $secretOptions.drag_handle === "border"}
                <div
                  class="border-handle absolute -right-4 flex flex-col items-center gap-2 py-2 bg-white b-(1 solid black) rd-1 opacity-0"
                >
                  <button class="icon-button" on:click={() => swap(i, i - 1)}
                    >arrow_upward</button
                  >
                  <span
                    class="handle material-icons flex items-center h-full px-2"
                    >drag_indicator</span
                  >
                  <button class="icon-button" on:click={() => swap(i, i + 1)}
                    >arrow_downward</button
                  >
                </div>
              {:else}
                <span
                  class="handle material-icons flex items-center h-full px-4 c-grey-600"
                  >drag_indicator</span
                >
              {/if}
            </div>
          {/each}
          {#if $canvasItems.length === 0 || ($canvasItems.length === 1 && $canvasItems[0][SHADOW_ITEM_MARKER_PROPERTY_NAME])}
            <div
              class="absolute flex flex-col items-center w-full gap-3 m-3 p-6 c-primary-900 rd-3"
            >
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

<Onboarding />

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
