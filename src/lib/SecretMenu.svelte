<script lang="ts">
  import { secretOptions } from "../stores";

  const secretMenu: Record<string, string[]> = {
    date_buttons: ["fill", "fixed"],
    no_preference_pos: ["under", "inline"],
  };

  let dialog: HTMLDialogElement;
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.ctrlKey && e.key === ",") {
      e.preventDefault();
      dialog.showModal();
    }
  }} />

<dialog bind:this={dialog}>
  <button
    class="icon-button absolute top-8 right-8"
    style:margin-left="auto"
    on:click={() => dialog.close()}>
    close
  </button>
  <div class="grid grid-cols-2 gap-2 w-fit">
    {#each Object.keys(secretMenu) as key}
      {@const options = secretMenu[key]}
      <span>{key}</span>
      <select bind:value={$secretOptions[key]}>
        {#each options as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    {/each}
  </div>
</dialog>
