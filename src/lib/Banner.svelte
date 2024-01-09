<script lang="ts">
  import Button from "./Button.svelte";

  export let inDetailPage = false;

  for (let i = 4; i <= 16; i++) {
    if (i === 8) continue;

    const el = document.querySelector<HTMLElement>(
      `.locaties [class^=styles_pageContent] > div:nth-child(${i})`,
    )!;

    if (el) el.style.display = "none";
  }
</script>

<div
  class:inDetailPage
  class="relative banner mb-12 py-16 bg-primary-200 of-y-hidden"
>
  <span class="text-new">Nieuw</span>
  <h4 class="mt-4">Ontdek de kracht van samenwerken</h4>
  <p class="max-w-68rem mb-8">
    Jouw sleutel tot evenementenperfectie. Creëer moeiteloos unieke ervaringen
    door samen met je team de ideale locatie te ontdekken en te delen.
  </p>
  <Button
    secondary
    icon="speaker_notes"
    text="Verzamel meningen"
    on:click={() => (location.href = "/form/edit")}
  />
</div>

<style>
  .banner {
    padding-left: var(--grid-spacing);
    background-image: url('data:image/svg+xml,<svg width="2000" height="1150" viewBox="0 0 2000.0001 1150" xmlns="http://www.w3.org/2000/svg"><path style="fill:none;fill-opacity:1;stroke:%23016d8c;stroke-width:300;stroke-dasharray:none;stroke-opacity:1" d="M1000 0a1000 1000 0 0 1-292.89322 707.10678A1000 1000 0 0 1 0 1000"/><path style="fill:none;fill-opacity:1;stroke:%23b0e5f4;stroke-width:300;stroke-dasharray:none;stroke-opacity:1" d="M2000 1000a1000 1000 0 0 1-707.1068-292.89323A1000 1000 0 0 1 1000 0"/></svg>');
    background-repeat: no-repeat;
    background-size: auto calc(100% / 0.7);
    background-position: top right -150px;
  }

  .inDetailPage {
    margin-inline: calc(-1 * var(--grid-spacing));
  }
</style>
