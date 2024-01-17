<script lang="ts">
  import { title, description, canvasItems, secretOptions } from "../stores";

  import { flip } from "svelte/animate";
  import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from "svelte-dnd-action";

  import Button from "./Button.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import Palette from "./Palette.svelte";
  import paletteTypes from "../paletteTypes";
  import Onboarding from "../lib/Onboarding.svelte";
  import ThemeDialog from "./ThemeDialog.svelte";
  import RichText from "./RichText.svelte";
  import Preview from "./Preview.svelte";

  const flipDurationMs = 200;
  let idx = 0;

  let starred = false;

  let shareDialog: HTMLDialogElement;
  let previewOverlay: HTMLDialogElement;
  let themeDialog: HTMLDialogElement;

  let dragDisabled = true;

  let paletteItems: CanvasItem[] = Object.keys(paletteTypes).map((key) => ({
    id: idx++,
    paletteType: key,
    data: {
      description: "",
    },
  }));

  $: {
    localStorage.setItem("formEditorState", JSON.stringify({
      title: $title,
      description: $description,
      canvasItems: $canvasItems,
    }));
  }

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

<div class="flex flex-col gap-2 w-full pt-8 px-8 xl:px-20 xxl:px-16rem">
  <div
    class="flex justify-between px-6 py-2 bg-primary-200 b-(1 solid primary-400) rd-1 [&>div]:(flex items-center gap-4)"
  >
    <div>
      <h6
        contenteditable="plaintext-only"
        on:input={(e) => {
          const val = e.currentTarget.innerText;
          if (val.includes("\n")) {
            e.currentTarget.innerText = val.replace("\n", "");
          }
        }}
      >
        Bestandsnaam
      </h6>
      <button class="icon-button">save</button>
      <button
        class="icon-button font-material-filled"
        on:click={() => (starred = !starred)}
      >
        {starred ? "star" : "star_outline"}
      </button>
    </div>

    <div>
      <button class="icon-button">undo</button>
      <button class="icon-button">redo</button>
      <button on:click={() => themeDialog.showModal()} class="icon-button"
        >color_lens</button
      >
      <Button
        tertiary
        icon="visibility"
        on:click={() => previewOverlay.showModal()}
        text="Voorbeeld"
      />
      <Button
        icon="mail"
        on:click={() => shareDialog.showModal()}
        text="Delen"
      />
    </div>
  </div>
  <hr class="mx-12 w-initial" />
  <div class="flex gap-16 w-full pb-6">
    <div class="top-0 w-72rem">
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
    <div class="flex flex-col gap-6 w-full">
      <div class="flex gap-4">
        <div
          class="grow-1 flex flex-col px-6 py-4 bg-primary-200 b-(1 solid primary-400) rd-2 placeholder:c-grey-400"
        >
          <input
            type="text"
            bind:value={$title}
            placeholder="Naamloos"
            class="font-size-1.8rem font-bold line-height-unset bg-transparent b-none"
          />
          <RichText
            bind:value={$description}
            placeholder="Formulierbeschrijving"
            border={false}
          />
        </div>
      </div>
      <div
        class="relative flex flex-col gap-6 min-h-13rem rd-3 outline-(1 dashed transparent) [&.dropTarget]:(outline-(1 primary-900 offset-1rem))"
        class:!outline-primary-900={$canvasItems.length === 0}
        style:transition="outline-offset .3s ease-in-out, outline-color .3s ease-in-out"
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
            <div class="flex-1 w-0 pt-4 pb-8 z-1">
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
              <p class="text-caption m-0 mb-4">{paletteType.caption ?? ""}</p>
              <RichText
                bind:value={item.data.description}
                placeholder="Typ hier een eventuele beschrijving"
              />
              <div class="relative mt-4">
                <svelte:component
                  this={paletteType.component}
                  viewMode={false}
                  {...paletteType.args}
                  bind:data={item.data}
                />
              </div>
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
            <span class="material-icons font-size-3rem">mouse</span>
          </div>
        {/if}
      </div>
      <div
        class="flex items-center justify-center p-2 c-primary-900 b-(1 dashed primary-900) rd-2 opacity-0 [.dropTarget~&]:(opacity-0)"
        class:opacity-100={$canvasItems.length > 0 ||
          ($canvasItems.length === 1 &&
            $canvasItems[0][SHADOW_ITEM_MARKER_PROPERTY_NAME])}
      >
        <span class="material-icons">add</span>
      </div>
    </div>
  </div>
</div>

<Onboarding />

<ThemeDialog bind:element={themeDialog} />

<Preview
  bind:element={previewOverlay}
  {shareDialog}
  title={$title}
  description={$description}
  canvasItems={$canvasItems}
/>

<ShareDialog bind:element={shareDialog} />
