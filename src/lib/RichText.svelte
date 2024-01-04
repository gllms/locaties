<script lang="ts">
  import { slide } from "svelte/transition";
  import Button from "./Button.svelte";

  export let placeholder = "";
  export let value = "";
  export let border = true;

  let active = false;

  let editorElement: HTMLDivElement;
  let blurTimeout: any;
</script>

<div
  bind:this={editorElement}
  contenteditable="plaintext-only"
  bind:innerText={value}
  data-placeholder={placeholder}
  class="py-2 bg-transparent b-none placeholder:c-grey-400"
  class:b-1={border}
  class:b-b-solid={border}
  class:b-b-grey-400={border}
  on:focus={() => (active = true)}
  on:blur={() => (blurTimeout = setTimeout(() => (active = false), 500))}
></div>
{#if active}
  <button
    class="flex gap-2 items-end w-full b-none bg-transparent [&>button]:my-2"
    transition:slide
    on:pointerup={() => {
      clearTimeout(blurTimeout);
      editorElement.focus();
    }}
  >
    <button class="icon-button">format_bold</button>
    <button class="icon-button">format_italic</button>
    <button class="icon-button">format_list_numbered</button>
    <button class="icon-button">format_list_bulleted</button>
    <Button tertiary icon="delete" text="Opmaak verwijderen" class="!m-0 !ml-auto" />
  </button>
{/if}
