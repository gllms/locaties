<script lang="ts">
  import filters from "../../filters";
  import Button from "../Button.svelte";

  export let data: {
    filter: string;
    options: string[];
    selected: string[];
  } = {
    filter: "location",
    options: [],
    selected: [],
  };

  export let viewMode = false;
  export let filter: keyof typeof filters = "location";

  $: data.filter = filter;

  let dialog: HTMLDialogElement;
  let dialogSelection: string[] = [];
</script>

<ol
  class:pointer-events-none={!viewMode}
  class="flex flex-col gap-2 p-0 list-none">
  {#each data.options as option}
    <li>
      <label class="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          bind:group={data.selected}
          value={option}
          class="w-8 h-8 cursor-pointer"
          style="accent-color: var(--color-primary-900)"
          disabled={!viewMode} />
        <p class="m-0">{option}</p>
      </label>
    </li>
  {:else}
    {#if !viewMode}
      <li>Geen opties geselecteerd</li>
    {/if}
  {/each}
</ol>

{#if !viewMode}
  <Button
    secondary
    icon="edit"
    text="Bepaal selectie"
    on:click={() => {
      dialogSelection = data.options;
      dialog.showModal();
    }} />
{/if}

<dialog bind:this={dialog} class="pb-4 cursor-default">
  <div class="flex items-center justify-between p-4">
    <h5 class="m-0">Zichtbare opties:</h5>
    <button
      class="icon-button absolute top-8 right-8"
      style:margin-left="auto"
      on:click={() => dialog.close()}>
      close
    </button>
  </div>
  <ol class="-my-2 p-0 columns-2">
    {#each filters[filter].options as option}
      {@const selected = dialogSelection.includes(option)}
      <li class="flex items-center gap-2">
        <label class="flex items-center gap-2 py-2 cursor-pointer select-none">
          <input
            type="checkbox"
            bind:group={dialogSelection}
            value={option}
            class="w-8 h-8 hidden"
            style="accent-color: var(--color-primary-900)" />
          <span
            class="font-material-filled font-size-12"
            class:c-grey-400={!selected}
            class:c-primary-900={selected}
            >{selected ? "visibility" : "visibility_off"}</span>
          {option}
        </label>
      </li>
    {/each}
  </ol>
  <div class="flex items-center justify-end gap-4 p-4">
    <Button secondary text="Annuleren" on:click={() => dialog.close()} />
    <Button
      icon="check"
      text="Opslaan"
      on:click={() => {
        data.options = dialogSelection;
        dialog.close();
      }} />
  </div>
</dialog>
