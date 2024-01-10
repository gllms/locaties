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

<div
  class="mobile-scrollbar relative flex flex-col h-full mx-auto @sm:mt-30 bg-white @sm:rd-2 rd-b-0 of-hidden of-y-auto z-1
         @sm:(mx-4 mb-6 h-auto rd-b-2) @lg:(!mx-auto w-92rem)"
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

  <div class="flex-1 flex flex-col m-4 @sm:m-10 !mt-0 mb-18 @sm:mb-6">
    {#if currentStep === 0}
      <p class="mt-0 mb-6 ws-pre text-wrap">
        {#if description}
          {description}
        {:else}
          Geen beschrijving
        {/if}
      </p>
    {:else if currentStep === canvasItems.length + 1}
      <div class="flex flex-col items-center mb-20">
        <div
          class="flex w-fit mx-auto mt-20 @md:mt-4 mb-10 p-4 aspect-1/1 b-(3 solid black) rd-full"
        >
          <span class="material-icons font-size-6rem">check</span>
        </div>
        <h2 class="text-center">Bedankt</h2>
        <p class="m-2 text-center">Voor het invullen van het deelformulier!</p>
        <p class="mb-12 c-grey-700 font-500 font-size-1.4rem text-center">
          Je kan nu het venster sluiten
        </p>
        <p class="text-caption c-black">Mede mogelijk gemaakt door</p>
        <svg
          width="230"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M9.47723 0H6.87169c0 4.02804-2.92863 7.30389-6.87169 7.30389v2.81191c3.8562 0 7.34763-2.53423 8.09455-5.43048h.15981c.74692 2.89625 4.23834 5.43048 8.09454 5.43048V7.30389c-3.943 0-6.87167-3.27585-6.87167-7.30389Z"
            fill="#3FB9A3"
          /><path
            d="M26.8296 23.8941V7.30042h1.8448v7.09298c.601-1.6344 2.0531-2.4498 3.8284-2.4498 2.6298 0 4.3356 1.891 4.3356 4.7591v7.1879h-1.8447v-6.8821c0-2.007-1.1534-3.3602-2.9078-3.3602-1.9837 0-3.415 1.6098-3.415 3.898v6.3478h-1.8447.0034Zm13.1704 0V12.1334h1.8447v11.7607H40Zm13.8822-11.7608h1.8447v12.2739c0 2.4956-1.7753 4.246-4.2905 4.246h-5.489v-1.6098h5.3744c1.5008 0 2.5604-1.1424 2.5604-2.7065v-2.0773c-.5524 1.0967-2.0984 1.8207-3.8528 1.8207-3.6199 0-5.6036-2.6361-5.6036-6.0666 0-3.4305 1.9837-6.0667 5.6036-6.0667 1.5668 0 3.1371.7944 3.8528 1.9121v-1.7258Zm.1598 5.8804c0-2.6608-1.5217-4.3866-3.8528-4.3866-2.331 0-3.8735 1.7258-3.8735 4.3866 0 2.6607 1.5216 4.3865 3.8735 4.3865 2.352 0 3.8528-1.7258 3.8528-4.3865Zm5.0298 5.8804V7.30042h1.8448v7.09298c.601-1.6344 2.0531-2.4498 3.8284-2.4498 2.6298 0 4.3356 1.891 4.3356 4.7591v7.1879h-1.8447v-6.8821c0-2.007-1.1534-3.3602-2.9078-3.3602-1.9837 0-3.415 1.6098-3.415 3.898v6.3478h-1.8447.0034Zm18.8647 4.7591V12.1333h1.8447V14.07c.7157-1.2829 2.213-2.123 3.8736-2.123 3.5991 0 5.5828 2.6362 5.5828 6.0667s-2.0288 6.0666-5.6279 6.0666c-1.6363 0-3.1371-.8154-3.8285-2.0772v6.6501h-1.8447Zm9.3869-10.6395c0-2.6608-1.5216-4.3866-3.8527-4.3866s-3.8527 1.7258-3.8527 4.3866c0 2.6607 1.5216 4.3865 3.8527 4.3865s3.8527-1.7258 3.8527-4.3865Zm10.8838-4.2248h-1.6154c-2.352 0-3.0225 2.1475-3.0225 4.9243v5.1809h-1.8447V12.1334h1.8447v2.3795c.4829-1.6098 1.4522-2.3795 3.1614-2.3795h1.4765v1.6555Zm.8758 4.2248c0-3.5465 2.467-6.0667 5.906-6.0667 3.439 0 5.927 2.5202 5.927 6.0667s-2.467 6.0666-5.927 6.0666c-3.46 0-5.906-2.5447-5.906-6.0666Zm9.943 0c0-2.5659-1.637-4.3866-4.037-4.3866-2.401 0-4.013 1.8207-4.013 4.3866 0 2.5658 1.637 4.3865 4.013 4.3865s4.037-1.8207 4.037-4.3865Zm13.838 5.8804h-1.845V13.7889h-4.822v10.1052h-1.845V13.7889h-2.421v-1.6555h2.421v-1.1916c0-2.23895 1.407-3.64138 3.62-3.64138h1.845v1.6555h-1.751c-1.129 0-1.869.74515-1.869 2.00698v1.1669h6.667v11.7643Zm18.609-3.782c-.392 2.4041-2.446 3.9682-5.329 3.9682-3.436 0-5.743-2.7767-5.743-6.1369s2.123-5.9964 5.535-5.9964c3.411 0 5.419 2.3796 5.419 5.5078 0 .2566-.024.6538-.045.8155h-9.088c.139 2.4252 1.73 4.1545 3.922 4.1545 1.89 0 3.092-.84 3.46-2.3092h1.869v-.0035Zm-9.157-3.3357h7.149c-.139-1.9823-1.452-3.2442-3.529-3.2442-1.96 0-3.276 1.167-3.62 3.2442Zm-2.63 5.413c-1.129 0-1.869-.7698-1.869-2.0773V7.30042h-1.844V20.207c0 2.2882 1.431 3.6871 3.644 3.6871h.399v-1.7047h-.33ZM40.9201 9.75376c.6754 0 1.2229-.55392 1.2229-1.23723 0-.6833-.5475-1.23723-1.2229-1.23723-.6753 0-1.2228.55393-1.2228 1.23723 0 .68331.5475 1.23723 1.2228 1.23723ZM161.714 12.0947c-3.505 0-6.01 2.5342-6.01 5.9894 0 3.4551 2.505 5.9893 6.01 5.9893 3.506 0 5.986-2.5342 5.986-5.9893 0-3.4552-2.505-5.9894-5.986-5.9894Zm0 9.5359c-1.911 0-3.185-1.4517-3.185-3.5465 0-2.0949 1.274-3.5465 3.185-3.5465s3.165 1.4516 3.165 3.5465c0 2.0948-1.275 3.5465-3.165 3.5465Zm13.32.0035c-1.96 0-3.03-1.522-3.03-3.5465 0-2.0246 1.046-3.5465 2.981-3.5465 1.32 0 2.435.8295 2.64 1.9823h2.776c-.25-2.6713-2.595-4.4217-5.486-4.4217-3.574 0-5.829 2.6713-5.829 5.9894 0 3.318 2.255 5.9893 5.829 5.9893 2.96 0 5.191-1.8207 5.555-4.3514h-2.824c-.274 1.1529-1.299 1.9121-2.619 1.9121l.007-.007Zm11.954-9.5324c-2.98 0-4.915 1.7961-5.054 4.0984h2.504c.046-1.0369.935-1.9824 2.415-1.9824s2.345.8049 2.345 1.9331c0 .4605-.275.7839-.841.7839h-2.116c-2.57 0-4.3 1.4059-4.3 3.6625 0 2.0034 1.549 3.4797 3.824 3.4797 1.64 0 2.96-.7592 3.436-1.9121v1.7258h2.755v-7.4621c0-2.6256-2.049-4.3303-4.964-4.3303l-.004.0035Zm2.21 6.8856c0 1.7504-1.025 2.9947-2.776 2.9947-1.046 0-1.775-.5975-1.775-1.4973 0-1.0123.795-1.6801 1.98-1.6801h2.571v.1827Zm17.078-6.7063h-2.8v11.6096h2.8V12.281Zm7.855 9.448c-1.775 0-2.96-1.1986-3.165-3.065h8.47c.024-.232.045-.5764.045-.9666 0-2.7627-1.73-5.5957-5.579-5.5957-3.849 0-5.625 2.8787-5.625 5.9437 0 3.0649 2.095 6.035 5.851 6.035 2.824 0 4.964-1.5887 5.395-4.0526h-2.731c-.295 1.1072-1.23 1.7047-2.664 1.7047l.003-.0035Zm-.229-7.5078c1.66 0 2.664 1.1072 2.776 2.5799h-5.646c.296-1.7504 1.3-2.5799 2.87-2.5799Zm9.723 1.2407c0-.7838.66-1.2442 1.661-1.2442.889 0 1.865.5518 2.025 1.6344h2.55c-.115-2.2566-1.959-3.7539-4.645-3.7539-2.369 0-4.12 1.427-4.12 3.4551 0 4.9068 6.285 2.4429 6.285 5.0228 0 .6924-.73 1.2442-1.821 1.2442-1.25 0-2.095-.6924-2.209-1.7961h-2.55c.135 2.4886 1.98 4.0527 4.759 4.0527 2.779 0 4.44-1.4271 4.44-3.6168 0-5.2512-6.375-2.4886-6.375-4.9982Zm-18.746-8.28099c-.997 0-1.709.72055-1.709 1.70119 0 .98065.712 1.7012 1.709 1.7012.997 0 1.702-.72055 1.702-1.7012 0-.98064-.712-1.70119-1.702-1.70119ZM152.522 19.5568V7.30396h-2.8V19.8345c0 2.5799 1.639 4.0526 4.144 4.0526h.619v-2.5553h-.299c-1.046 0-1.661-.5975-1.661-1.775h-.003Zm45.882-.0035v-4.9314h2.248V12.281h-2.589c.65-.7909 1.161-2.0914 1.387-3.59923l.048-.32337h-2.379l-.032.24604c-.295 2.30226-1.639 3.67656-3.599 3.67656h-.142v2.3409h2.254v5.209c0 2.587 1.644 4.0632 4.155 4.0632h1.525v-2.5623h-1.205c-1.049 0-1.664-.6011-1.664-1.7785h-.007Z"
            fill="#000"
          /></svg
        >
      </div>
    {:else}
      <div
        class="flex-1 flex flex-col gap-6 mb-6 @sm:mb-0"
        class:!mb-22={lastQuestion}
        class:@sm:!mb-12={lastQuestion}
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
      class="fixed @sm:static flex gap-2 w-full bottom-0 p-6 bg-white b-t-(1 solid grey-300) justify-between"
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

<style>
  .mobile-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .mobile-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .mobile-scrollbar::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
  }

  .mobile-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-500);
  }
</style>
