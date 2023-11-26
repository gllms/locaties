<script lang="ts">
  import Button from "./Button.svelte";

  export let element: HTMLDialogElement;

  function select(e: { currentTarget: HTMLInputElement }) {
    e.currentTarget.select();
  }
</script>

<dialog bind:this={element}>
  <button
    class="icon-button absolute top-8 right-8 backdrop:bg-[rgba(0,0,0,0.44)]"
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
      class="w-full p-4 pr-16 b-(2 solid grey-300) rd-2 select-all"
      readonly />
    <Button
      icon="content_copy"
      class="absolute right-2 top-2"
      on:click={() =>
        navigator.clipboard.writeText(
          "https://locaties.nl/form/dQw4w9WgXcQ"
        )} />
  </div>
  <p class="c-grey-600 text-center">of deel via</p>
  <div class="text-center [&>a]:(decoration-none c-grey-600 font-size-10 select-none)">
    <!-- mail, facebook and generic share -->
    <a class="icon-button" target="_blank" href="mailto:?subject=Locaties.nl%20formulier&body=https://locaties.nl/form/dQw4w9WgXcQ">
      email
    </a>
    <a class="icon-button" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://locaties.nl/form/dQw4w9WgXcQ">
      facebook
    </a>
    <a class="icon-button" target="_blank" href={"javascript:navigator.share({url: 'https://locaties.nl/form/dQw4w9WgXcQ'}); void"}>
      share
    </a>
  </div>
</dialog>
