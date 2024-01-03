<script lang="ts">
  import Dialog from "./Dialog.svelte";
  import Button from "./Button.svelte";
  import Select from "./Select.svelte";

  export let element: HTMLDialogElement;
</script>

<Dialog bind:element drawer>
  <div slot="content" class="flex flex-col gap-4">
    <div>
      <p class="text-subtitle-2">Koppen</p>
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
    <div>
      <p class="text-subtitle-2">Tekst</p>
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
    <div>
      <p class="text-subtitle-2">Vragen</p>
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
    <div>
      <p class="text-subtitle-2">Logo</p>
      <Button secondary icon="add" text="Afbeelding toevoegen" />
    </div>
    <hr />
    <div>
      <p class="text-subtitle-2">Banner</p>
      <Button secondary icon="add" text="Afbeelding toevoegen" />
    </div>
    <hr />
    <div>
      <p class="text-subtitle-2">Achtergrond</p>
      <Button secondary icon="add" text="Afbeelding toevoegen" />
    </div>
    <hr />
    <div>
      <p class="text-subtitle-2">Kleuren</p>
      <div class="flex gap-2">
        {#each ["#FF6868", "#FFCB65", "#FFF969", "#86FF72", "#6EFFEE", "#7E9AFF"] as color}
          <button style:background-color={color} class="w-16 h-16 p-0 b-none rd-2 cursor-pointer"></button>
        {/each}
      </div>
    </div>
  </div>
  <svelte:fragment slot="footer">
    <Button class="ml-auto" icon="check" text="Thema opslaan" />
  </svelte:fragment>
</Dialog>
