<script lang="ts">
  import { secretOptions } from "../stores";
  import Dialog from "./Dialog.svelte";

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

<Dialog bind:element={dialog} title="Secret options" subtitle="Super secret">
  <div slot="content" class="grid grid-cols-2 items-center gap-4 w-fit">
    {#each Object.keys(secretMenu) as key}
      {@const options = secretMenu[key]}
      <span>{key}</span>
      <select bind:value={$secretOptions[key]} class="px-4 py-2">
        {#each options as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    {/each}
  </div>
</Dialog>
