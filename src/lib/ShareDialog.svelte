<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import Button from "./Button.svelte";

  export let dialog: Dialog;

  function select(e: { currentTarget: HTMLInputElement }) {
    e.currentTarget.select();
  }
</script>

<Dialog bind:this={dialog} title="Delen">
  <svelte:fragment slot="content">
    <div class="relative">
      <input
        type="text"
        on:click={select}
        on:select={select}
        value="https://locaties.nl/?form/dQw4w9WgXcQ"
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
    <div
      class="text-center [&>a]:(decoration-none c-grey-600 font-size-10 select-none)">
      <a
        class="icon-button"
        target="_blank"
        href="mailto:?subject=Locaties.nl%20formulier&body=https://locaties.nl/?form/dQw4w9WgXcQ">
        email
      </a>
      <a
        class="icon-button"
        href={"javascript:navigator.share({url: 'https://locaties.nl/?form/dQw4w9WgXcQ'})"}>
        share
      </a>
    </div>
  </svelte:fragment>
</Dialog>
