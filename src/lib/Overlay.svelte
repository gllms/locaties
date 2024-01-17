<script lang="ts">
  import { tick } from "svelte";
  import { fly } from "svelte/transition";

  import Button from "./Button.svelte";

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
  <dialog
    bind:this={element}
    class="[&[open]]:flex flex-col w-full h-full max-w-full max-h-full p-0 b-none of-hidden"
    transition:fly={{ y: 400, duration: 500 }}
  >
    <div
      class="w-full flex items-center justify-between px-12 py-6 bg-white b-b-(1 solid grey-200) z-1"
    >
      <Button
        tertiary
        icon="keyboard_arrow_left"
        text="Terug"
        on:click={() => close()}
      />
      <slot name="header" />
    </div>
    <div class="grow-1 flex of-y-auto bg-white">
      <slot />
    </div>
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
