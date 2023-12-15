<script lang="ts">
  import Button from "./Button.svelte";

  export let element: HTMLDialogElement = undefined!;
</script>

<dialog bind:this={element} class="w-full h-full max-w-full max-h-full p-0 b-none">
  <div class="fixed w-full flex items-center justify-between px-12 py-6 bg-white b-b-(1 solid grey-200) z-1">
    <Button tertiary icon="keyboard_arrow_left" text="Terug" on:click={() => element.close()} />
    <slot name="header" />
  </div>
  <div class="mt-9rem mx-12">
    <slot />
  </div>
</dialog>
