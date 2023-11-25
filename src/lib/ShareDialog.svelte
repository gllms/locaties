<script lang="ts">
  import Button from "./Button.svelte";

  export let element: HTMLDialogElement;

  function select(e: { currentTarget: HTMLInputElement }) {
    e.currentTarget.select();
  }
</script>

<dialog class="w-[60.8rem] b-none rd-4 p-8 pt-12" bind:this={element}>
  <button
    class="material-icons absolute top-8 right-8 bg-transparent b-none cursor-pointer backdrop:bg-[rgba(0,0,0,0.44)]"
    style:margin-left="auto"
    on:click={() => element.close()}>
    close
  </button>
  <br />
  <div class="relative">
    <input
      type="text"
      on:click={select}
      on:select={select}
      value="https://locaties.nl/form/dQw4w9WgXcQ"
      class="p-4 pr-16 b-(2 solid grey-300) rd-2 select-all"
      readonly />
    <Button
      icon="content_copy"
      class="absolute right-2 top-2"
      on:click={() =>
        navigator.clipboard.writeText(
          "https://locaties.nl/form/dQw4w9WgXcQ"
        )} />
  </div>
  <p class="font-size-2">of deel via</p>
</dialog>
