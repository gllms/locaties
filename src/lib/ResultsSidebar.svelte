<script lang="ts">
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import Overlay from "./Overlay.svelte";

  export let inOverlay = false;
  let overlay: HTMLDialogElement;

  const locationData: [string, number][] = [
    ["Stedelijk gelegen", 11],
    ["Aan het water", 5],
    ["Bosrijke omgeving", 1],
    ["Midden in de natuur", 3],
    ["Landelijk gelegen", 1],
    ["Industrieel gebied", 1],
  ];

  const shortData = [
    "Vrij kunnen bewegen.",
    "Een elegante en verfijnde ambiance met een vleugje luxe.",
    "Een moderne en dynamische omgeving met innovatieve elementen.",
    "Een formele en gepolijste atmosfeer.",
    "Een natuurlijke en rustieke setting, omgeven door groen en open lucht.",
    "Een levendige en creatieve sfeer vol energie en inspiratie.",
  ];

  const longData = [
    "Een verfijnde omgeving met warme aardetinten, zachte stoffering en sfeervolle verlichting. Denk aan comfortabele zitplaatsen, subtiele kunstwerken en natuurlijke accenten, waardoor een uitnodigende en luxe atmosfeer ontstaat waar gasten zich direct thuis voelen.",
    "Een eigentijdse ambiance waar strakke lijnen, minimalistisch meubilair en gedurfde kunstwerken samenkomen. Het kleurenpalet is modern en gedempt, terwijl innovatieve designelementen zorgen voor een stijlvolle en trendy sfeer.",
    "Een groene oase met weelderige planten, houten meubilair en aardse kleuren. De buitenlucht wordt naar binnen gebracht, waardoor een rustieke en ontspannen setting ontstaat. Een perfecte keuze voor evenementen met een natuurlijk en organisch gevoel.",
    "Een formele setting met klassieke elegantie. Kristallen kroonluchters, gepolijst marmer en verfijnde details stralen een tijdloze grandeur uit. Dit is de perfecte keuze voor evenementen die een vleugje glamour en luxe vereisen.",
    "Een industriële ruimte met ruwe bakstenen muren, open plafondbalken en metalen accenten. De sfeer is stoer, modern en stedelijk. Dit is een uitstekende keuze voor evenementen met een edgy en urban karakter.",
    "Een speelse en creatieve omgeving waar levendige kleuren, kunstzinnige installaties en innovatieve meubelstukken samenkomen. Hier heerst een energieke en dynamische sfeer, perfect voor evenementen die willen uitblinken in originaliteit en creativiteit.",
    "Een serene Zen-oase met minimalistisch design, natuurlijke verlichting en een neutraal kleurenpalet. De ruimte ademt rust en kalmte, ideaal voor evenementen die streven naar een ontspannen en harmonieuze sfeer.",
    "Een klassieke en tijdloze setting met antiek meubilair, elegante stoffering en verfijnde details. Denk aan sierlijke kroonluchters en rijke texturen die een gevoel van elegantie en traditie oproepen. Perfect voor evenementen met een verfijnde en tijdloze uitstraling.",
    "Een eclectische mix van stijlen, waarbij diverse patronen, texturen en kleuren worden gecombineerd om een boeiende en unieke omgeving te creëren. Hier ontstaat een speelse, onconventionele sfeer die de creativiteit stimuleert.",
    "Een futuristische sfeer waar moderne technologieën, strakke lijnen en een eigentijds kleurenpalet samenkomen. Deze ruimte straalt innovatie en vooruitstrevendheid uit, waardoor het een ideale keuze is voor evenementen die streven naar een cutting-edge en moderne ervaring.",
  ];
</script>

{#if !inOverlay}
  <Button
    tertiary
    icon="fullscreen"
    text="Alle resultaten"
    class="float-right"
    on:click={() => overlay.showModal()}
  />
{/if}

<h5>Datumplanner</h5>
<p class="mb-1 c-tertiary-600 font-bold case-upper font-size-1.4rem">
  Hoogste score
</p>
<div
  class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 b-(1 solid grey-400) rd-2)
         [&_time]:(font-size-8 c-primary-800)
         [&_span]:(font-size-6 font-bold c-grey-900)"
>
  <div class="h-54">
    <time>15 januari</time>
    <span>18 stemmen</span>
  </div>
  <div class="h-50">
    <time>26 januari</time>
    <span>18 stemmen</span>
  </div>
  <div class="h-46">
    <time>8 april</time>
    <span>18 stemmen</span>
  </div>
</div>

<div class="flex justify-between mb-6 py-4 b-b-(1 solid grey-400)">
  <span class="c-grey-400 font-size-1.4rem font-bold case-upper"
    >overige data</span
  >
  <span class="material-icons">keyboard_arrow_down</span>
</div>

<h5>Ligging en omgeving</h5>
<p class="mb-1 c-tertiary-600 font-bold case-upper font-size-1.4rem">
  Hoogste score
</p>
<div
  class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 rd-2)
         [&_data]:(font-size-8 font-bold c-primary-400)
         [&_span]:(font-size-6 c-white)"
>
  <div
    class="h-54 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/o0nE130.jpg')]"
  >
    <data>73%</data>
    <span>In het park</span>
  </div>
  <div
    class="h-50 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/VGNSckf.jpg')]"
  >
    <data>44%</data>
    <span>Bosrijke omgeving</span>
  </div>
  <div
    class="h-46 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/ulLCV12.jpg')]"
  >
    <data>12%</data>
    <span>Industrieel gebied</span>
  </div>
</div>

<div class="flex justify-between mb-6 py-4 b-b-(1 solid grey-400)">
  <span class="c-grey-400 font-size-1.4rem font-bold case-upper"
    >overige data</span
  >
  <span class="material-icons">keyboard_arrow_down</span>
</div>

<h5>Stijl</h5>
<p class="mb-1 c-tertiary-600 font-bold case-upper font-size-1.4rem">
  Hoogste score
</p>
<div
  class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 rd-2)
         [&_data]:(font-size-8 font-bold c-primary-400)
         [&_span]:(font-size-6 c-white)"
>
  <div
    class="h-54 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/vNFt2rV.png')]"
  >
    <data>73%</data>
    <span>Landelijk</span>
  </div>
  <div
    class="h-50 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/e7DgYr6.jpg')]"
  >
    <data>44%</data>
    <span>Industrieel</span>
  </div>
  <div
    class="h-46 bg-cover [background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/6fyXlX5.jpg')]"
  >
    <data>12%</data>
    <span>Klassiek</span>
  </div>
</div>

<div class="flex justify-between py-4 b-b-(1 solid grey-400)">
  <span class="c-grey-400 font-size-1.4rem font-bold case-upper"
    >overige data</span
  >
  <span class="material-icons">keyboard_arrow_down</span>
</div>

{#if !inOverlay}
  <Overlay bind:element={overlay}>
    <div class="flex gap-12 mx-72 pb-12">
      <div class="w-48rem">
        <svelte:self inOverlay />
      </div>
      <div class="flex-1 flex flex-col gap-8">
        <h3 class="c-primary-900">Deelformulier resultaten</h3>
        <div>
          <h4 class="flex items-center justify-between">
            Ligging en omgeving <span class="material-icons"
              >keyboard_arrow_up</span
            >
          </h4>
          <p class="m-0 mb-2 c-grey-700 font-size-12px">22 antwoorden</p>
          <div class="flex flex-col gap-2">
            {#each locationData as [location, votes]}
              <div class="flex items-center p-2 b-(1 solid grey-400) rd-2">
                <p class="w-72 m-0">{location}</p>
                <div class="flex-1 flex items-center gap-2">
                  <div
                    class="h-12px bg-primary-900 rd-full"
                    style:width={`${(votes / 23) * 100}%`}
                  ></div>
                  <p class="m-0">
                    {votes} ({((votes / 22) * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <hr class="w-full b-(1 solid grey-300)" />
        <div>
          <h4 class="flex items-center justify-between">
            Kort antwoord <span class="material-icons"
              >keyboard_arrow_up</span
            >
          </h4>
          <p class="m-0 mb-2 c-grey-700 font-size-12px">6 antwoorden</p>
          <div class="flex flex-wrap gap-2">
            {#each shortData as text}
              <span class="flex w-fit p-2 b-(1 solid grey-400) rd-2">
                {text}
              </span>
            {/each}
          </div>
        </div>
        <hr class="w-full b-(1 solid grey-300)" />
        <div>
          <h4 class="flex items-center justify-between">
            Lang antwoord <span class="material-icons"
              >keyboard_arrow_up</span
            >
          </h4>
          <p class="m-0 mb-2 c-grey-700 font-size-12px">10 antwoorden</p>
          <div class="flex flex-wrap gap-2">
            {#each longData as text}
              <span class="flex w-fit p-2 b-(1 solid grey-400) rd-2">
                {text}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </Overlay>
{/if}
