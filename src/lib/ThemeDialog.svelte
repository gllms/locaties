<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import Button from "./Button.svelte";
  import Select from "./Select.svelte";

  export let dialog: Dialog;

  let colors = [
    "#FF6868",
    "#FFCB65",
    "#FFF969",
    "#86FF72",
    "#6EFFEE",
    "#7E9AFF",
    "#D273FF",
    "#FC77FF",
    "#4A3A11",
    "#FFFFFF",
    "#313131",
    "#19197C",
    "#FA6400",
  ];
</script>

<Dialog bind:this={dialog} drawer>
  <div slot="content" class="flex flex-col gap-4">
    {#each ["Koppen", "Tekst", "Vragen"] as title}
      <div>
        <p class="text-subtitle-2">{title}</p>
        <div class="flex gap-4">
          <Select value="Graphik" class="flex-1">
            <option value="Graphik">Graphik</option>
          </Select>
          <span class="b-l-(1 solid grey-400)"></span>
          <Select value="klein">
            <option value="klein">Klein</option>
            <option value="middel">Middel</option>
            <option value="groot">Groot</option>
          </Select>
        </div>
      </div>
      <hr />
    {/each}
    <div>
      <p class="text-subtitle-2">Logo</p>
      <Button secondary icon="add" text="Afbeelding toevoegen" />
    </div>
    <hr />
    <div>
      <p class="text-subtitle-2">Achtergrond</p>
      <Button secondary icon="add" text="Afbeelding toevoegen" />
    </div>
    {#each ["Primaire kleur", "Secundaire kleur"] as titel}
      <hr />
      <div>
        <p class="text-subtitle-2">{titel}</p>
        <div class="flex flex-wrap gap-2">
          {#each colors as color}
            <button
              style:background-color={color}
              class="w-16 h-16 p-0 b-none rd-2 cursor-pointer b-(1 solid transparent)"
              class:!b-black={color === "#FFFFFF"}
            ></button>
          {/each}
          <button class="icon-button w-16 h-16 b-none rd-2">add</button>
        </div>
      </div>
    {/each}
  </div>
  <svelte:fragment slot="footer">
    <Button class="ml-auto" icon="check" text="Thema opslaan" />
  </svelte:fragment>
</Dialog>
