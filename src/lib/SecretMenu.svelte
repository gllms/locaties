<script lang="ts">
  import { secretOptions, title, description, canvasItems } from "../stores";
  import Button from "./Button.svelte";
  import Dialog from "./Dialog.svelte";
  import sample from "../sample";

  const secretMenu: Record<string, string[]> = {
    drag_handle: ["inside", "border"],
  };

  let dialog: Dialog;

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
      dialog.open();
    }

    if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      window.open("/?form/edit");
    }

    if (e.ctrlKey && e.key === "p") {
      e.preventDefault();
      window.open("/?form/dQw4w9WgXcQ");
    }

    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      window.open("/?form/results");
    }
  }} />

<Dialog bind:this={dialog} title="Secret options" subtitle="Super secret">
  <div slot="content" class="grid grid-cols-2 items-center gap-4 w-fit">
    <span class="[grid-column:1/-1] flex gap-4">
      <a href="/?form/edit">Editor</a>
      <a href="/?form/dQw4w9WgXcQ">Invullen</a>
      <a href="/?form/results">Resultaten</a>
    </span>
    <span class="[grid-column:1/-1]">
      <Button icon="view_agenda" text="zet voorbeeldblokken neer" on:click={fillIn} />
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
