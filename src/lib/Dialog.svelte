<script lang="ts">
  import { tick } from "svelte";
  import { fly } from "svelte/transition";

  export let title = "";
  export let subtitle = "";

  export let steps = 1;
  export let currentStep = 1;

  export let drawer = false;

  let element: HTMLDialogElement;
  let isOpen = false;

  export async function open() {
    isOpen = true;
    await tick();
    element.showModal();
  }

  export function close() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events-->
  <dialog
    bind:this={element}
    on:click={(e) => {
      if (e.target === element) {
        close();
      }
    }}
    data-drawer={drawer || undefined}
    transition:fly={{ x: drawer ? 400 : 0, y: drawer ? 0 : 400, duration: 500 }}
    class="[&[open]]:flex flex-col p-none
         md:(w-60.8rem h-revert) w-full h-full max-w-full max-h-full
         m-0 my-auto md:mx-revert
         b-none md:rd-4 of-visible cursor-auto
         backdrop:bg-black/0
         [&[data-drawer]]:(h-full w-40rem mr-0 rd-r-0)"
    class:md:max-h-[calc(100%-3.2rem)]={!drawer}
  >
    {#if !drawer}
      <button
        class="icon-button absolute top-8 right-8 ml-auto z-1"
        on:click={() => close()}
      >
        close
      </button>
    {/if}

    {#if title || steps > 1}
      <div
        class="relative pt-8 pr-20 pb-6 pl-10 bg-primary-200 b-b-(1 solid grey-300) rd-t-4"
        class:pb-10={steps > 1}
      >
        <h5
          class="c-grey-700 font-size-1.2rem font-400 line-height-1.8rem min-h-1.8rem mb-2"
          class:!text-new={subtitle === "NIEUW"}
        >
          {subtitle}
        </h5>
        {#if title}
          <h4 class="font-size-16">{title}</h4>
        {/if}

        {#if steps > 1}
          <ol
            class="absolute flex justify-between m-0 p-0 px-10 w-full left-0 -bottom-.4rem list-none"
          >
            {#each Array.from({ length: steps }) as _, i}
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
        {/if}
      </div>
    {:else if !drawer}
      <div class="h-16"></div>
    {/if}

    <div
      class="grow-1 p-10 bg-white of-y-auto"
      class:rd-t-4={drawer}
      class:rd-b-4={!$$slots.footer}
    >
      <slot name="content" />
    </div>
    {#if $$slots.footer}
      <div
        class="flex justify-between gap-2 px-6 py-4 bg-white b-t-(1 solid grey-300) rd-b-4"
        class:rd-r-0={drawer}
      >
        <slot name="footer" />
      </div>
    {/if}
  </dialog>
{/if}

<style>
  dialog::before {
    content: "";
    position: absolute;
    left: -100vw;
    top: -100vh;
    width: 200vw;
    height: 200vh;
    background: rgba(0, 0, 0, 0.44);
    z-index: -1;
  }
</style>
