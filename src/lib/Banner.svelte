<script lang="ts">
  import Button from "./Button.svelte";
</script>

<div class="banner flex gap-24rem mb-6rem px-36 py-16 bg-primary-200">
  <div class="flex flex-col gap-4">
    <span class="text-new">Nieuw</span>
    <h3>Involve</h3>
  </div>
  <div>
    <h4>Ontdek de kracht van samenwerken</h4>
    <p class="max-w-65rem mb-4">
      "Involve, jouw sleutel tot evenementenperfectie. Creëer moeiteloos unieke
      ervaringen door samen met je team de ideale locatie te ontdekken en te
      delen."
    </p>
    <Button
      secondary
      icon="speaker_notes"
      text="Begin enquête"
      on:click={() => (location.href = "/form/edit")}
    />
  </div>
</div>

<style>
  .banner {
    box-shadow:
      1000px 0px 0px 0px var(--color-primary-200),
      -1000px 0px 0px 0px var(--color-primary-200);
  }
</style>
