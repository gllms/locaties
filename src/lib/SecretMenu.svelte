<script lang="ts">
  import { secretOptions, title, description, canvasItems } from "../stores";
  import Button from "./Button.svelte";
  import Dialog from "./Dialog.svelte";
  import sample from "../sample";

  const secretMenu: Record<string, string[]> = {
    drag_handle: ["inside", "border"],
  };

  let dialog: HTMLDialogElement;

  function fillIn() {
    $title = sample.title;
    $description = sample.description;
    $canvasItems = sample.canvasItems;
  }
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
    <span class="[grid-column:1/-1] flex gap-4">
      <a href="/form/edit">Editor</a>
      <a href="/form/dQw4w9WgXcQ">Invullen</a>
      <a href="/form/results">Resultaten</a>
    </span>
    <span class="[grid-column:1/-1]">
      <Button icon="view_agenda" text="vul in" on:click={fillIn} />
    </span>
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
