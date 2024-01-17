<script lang="ts">
  import Overlay from "./Overlay.svelte";
  import Result from "./Result.svelte";

  export let overlay: Overlay;

  const locationData: [string, number][] = [
    ["Stedelijk gelegen", 11],
    ["Aan het water", 5],
    ["Bosrijke omgeving", 1],
    ["Midden in de natuur", 3],
    ["Landelijk gelegen", 1],
    ["Industrieel gebied", 1],
  ];

  const styleData: [string, number][] = [
    ["Modern design", 11],
    ["Huiselijk", 10],
    ["Trendy", 5],
    ["Landelijk", 1],
    ["Kleurrijk", 1],
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

<Overlay bind:this={overlay}>
  <div class="flex flex-col gap-4 w-full px-12 py-12">
    <h3 class="c-primary-900">Resultaten</h3>
    <div
      class="grid [grid-template-columns:minmax(0,400px)_1fr] gap-4
               [&>hr]:[grid-column:1/-1]"
    >
      <Result title="Ligging en omgeving" answers={23}>
        <div class="flex flex-col gap-2 w-full">
          {#each locationData as [location, votes]}
            <div class="flex items-center p-2 b-(1 solid grey-400) rd-2">
              <p class="w-72 m-0">{location}</p>
              <div class="flex-1 flex items-center gap-2">
                <div
                  class="h-12px bg-primary-900 rd-full"
                  style="width: {(votes / 23) * 100}%"
                ></div>
                <p class="m-0">
                  {votes} ({((votes / 22) * 100).toFixed(0)}%)
                </p>
              </div>
            </div>
          {/each}
        </div>
      </Result>
      <hr />
      <Result title="Stijl" answers={23} multiple={true}>
        <div class="flex flex-col gap-2 w-full">
          {#each styleData as [style, votes]}
            <div class="flex items-center p-2 b-(1 solid grey-400) rd-2">
              <p class="w-72 m-0">{style}</p>
              <div class="flex-1 flex items-center gap-2">
                <div
                  class="h-12px bg-primary-900 rd-full"
                  style="width: {(votes / 23) * 100}%"
                ></div>
                <p class="m-0">
                  {votes} ({((votes / 22) * 100).toFixed(0)}%)
                </p>
              </div>
            </div>
          {/each}
        </div>
      </Result>
      <hr />
      <Result
        title="Kort antwoord"
        answers={6}
        description="Beschrijf in enkele zinnen de sfeer die je zou willen ervaren op de evenementlocatie."
      >
        <div class="flex flex-wrap gap-2 w-full h-fit">
          {#each shortData as text}
            <span class="flex w-fit p-2 b-(1 solid grey-400) rd-2">
              {text}
            </span>
          {/each}
        </div>
      </Result>
      <hr />
      <Result
        title="Lang antwoord"
        answers={10}
        description="Beschrijf uitgebreid de sfeer en het gevoel dat je zou willen ervaren op de evenementlocatie, inclusief specifieke elementen, kleuren en eventuele bijzondere details die hieraan bijdragen."
      >
        <div class="flex flex-col gap-2 w-full">
          {#each longData as text}
            <span class="flex w-fit p-2 b-(1 solid grey-400) rd-2">
              {text}
            </span>
          {/each}
        </div>
      </Result>
    </div>
  </div>
</Overlay>
