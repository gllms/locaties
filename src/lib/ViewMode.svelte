<script lang="ts">
  import paletteTypes from "../paletteTypes";
  import Button from "./Button.svelte";
    import Toast from "./Toast.svelte";

  export let title = "Naamloos";
  export let description = "";

  export let canvasItems: CanvasItem[] = [];

  let currentStep = 0;
  $: lastQuestion = currentStep === canvasItems.length;

  $: item = canvasItems[Math.max(currentStep - 1, 0)];
  $: paletteType = paletteTypes[item?.paletteType];
</script>

<svelte:head>
  <title>Deelformulier</title>
</svelte:head>

<div class="backdrop absolute flex w-full left-0">
  <div
    class="relative flex flex-col sm:mt-30 w-full bg-white sm:rd-2 rd-b-0 of-hidden z-1
              sm:(mx-4 mb-6 rd-b-2) lg:(mx-auto w-92rem)"
  >
    <div
      class="relative flex flex-col mb-10 px-8 py-6 bg-primary-200 placeholder:c-grey-400"
    >
      <p class="mt-0 mb-2 c-grey-900">Georganiseerd door Mark</p>
      <h4>{title || "Naamloos"}</h4>

      <ol
        class="absolute flex justify-between m-0 p-0 px-10 w-full left-0 -bottom-.4rem list-none"
      >
        {#each Array.from({ length: canvasItems.length + 2 }) as _, i}
          <li
            class="w-.8rem h-.8rem c-primary-900 bg-grey-500 rd-2"
            class:bg-quinary-500={i < currentStep}
            class:bg-primary-900={i === currentStep}
          >
            {#if i === currentStep}
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="transform: translate(-0.3rem, -250%)"
                ><path
                  d="M5.887 9h2.226c0-3.577 2.505-6.502 5.887-6.502V0c-3.297 0-6.294 2.25-6.936 4.838h-.128C6.294 2.25 3.296 0 0 0v2.498c3.382 0 5.887 2.925 5.887 6.502z"
                  fill="currentColor"
                ></path></svg
              >
            {/if}
          </li>
        {/each}
      </ol>
    </div>

    <div class="flex-1 flex flex-col m-4 sm:m-10 !mt-0 mb-18 sm:mb-6">
      {#if currentStep === 0}
        <p class="mt-0 mb-6 ws-pre text-wrap">
          {#if description}
            {description}
          {:else}
            Geen beschrijving
          {/if}
        </p>
      {:else if currentStep === canvasItems.length + 1}
        <div
          class="flex w-fit mx-auto mt-20 md:mt-4 mb-10 p-4 aspect-1/1 b-(3 solid black) rd-full"
        >
          <span class="material-icons font-size-6rem">check</span>
        </div>
        <h2 class="text-center">Bedankt</h2>
        <p class="m-2 text-center">Voor het invullen van het deelformulier!</p>
        <p class="c-grey-700 font-500 text-center">Je kan nu het venster sluiten</p>
      {:else}
        <div
          class="flex-1 flex flex-col gap-6 mb-6 sm:mb-0"
          class:!mb-22={lastQuestion}
          class:sm:!mb-12={lastQuestion}
        >
          <div class="flex-1 flex flex-col">
            <div class="flex items-center gap-2">
              <span class="material-icons">{paletteType.icon}</span>
              <span class="name">{paletteType.name}</span>
            </div>
            {#if item.data.description}
              <p class="m-0 mt-2">{item.data.description}</p>
            {/if}
            <hr class="mb-4" />
            <svelte:component
              this={paletteType.component}
              viewMode={true}
              {...paletteType.args}
              bind:data={item.data}
            />
          </div>
        </div>
      {/if}
    </div>
    {#if currentStep < canvasItems.length + 1}
      <div
        class="fixed sm:static flex gap-2 w-full bottom-0 p-6 bg-white b-t-(1 solid grey-300) justify-between"
      >
        {#if lastQuestion}
          <Toast text="Je bent bij de laatste vraag" />
        {/if}

        {#if currentStep > 0 && currentStep < canvasItems.length + 1}
          <Button secondary text="Vorige" on:click={() => (currentStep -= 1)} />
        {/if}

        {#if currentStep < canvasItems.length + 1}
          <Button
            text={lastQuestion ? "Verzenden" : "Volgende"}
            class="ml-auto"
            on:click={() => (currentStep += 1)}
          />
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .backdrop {
    min-height: calc(100% - var(--header-height));
    background-image: url("https://www.locaties.nl/cdn-cgi/image/width=1280,format=auto/images/hero/locaties/hero.jpg");
    background-size: cover;
    background-attachment: fixed;
  }
</style>
