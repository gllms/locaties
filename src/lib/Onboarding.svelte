<script lang="ts">
  import { onMount } from "svelte";
  import sample from "../sample";
  import { title, description, canvasItems } from "../stores";
  import Dialog from "./Dialog.svelte";
  import Button from "./Button.svelte";

  let currentStep = 0;

  const titles = [
    "Welkom",
    "Hoe starten we vandaag?",
    "Waar begint jouw event?",
  ];

  const subtitles = [
    "NIEUW",
    "Organiseer je evenement",
    "Organiseer je evenement",
  ];

  let useTemplate: boolean | undefined = undefined;
  let location = "";
  let range = 50;

  let element: HTMLDialogElement;

  function done() {
    if (useTemplate) {
      $title = sample.title;
      $description = sample.description;
      $canvasItems = sample.canvasItems;
    }
    element.close();
  }

  onMount(() => {
    element.showModal();
  });
</script>

<Dialog
  bind:element
  title={titles[currentStep]}
  subtitle={subtitles[currentStep]}
  steps={3}
  {currentStep}
>
  <div class="flex flex-col gap-4" slot="content">
    {#if currentStep === 0}
      <span>
        Jouw gids voor het vinden van de perfecte match tussen de behoeften van
        jouw bedrijf en de wensen van je team.
      </span>
      <img
        src="https://i.imgur.com/tQHyYzm.png"
        alt="screenshot"
        class="b-(1 solid grey-400) rd-2"
      />
      <span>
        Om van start te gaan stellen we je enkele vragen om het deelformulier
        geschikt voor jou te maken.
      </span>
    {/if}

    {#if currentStep === 1}
      <h6>Selecteer je startwijze<sup>*</sup></h6>

      <div class="flex gap-4">
        <label
          class="flex-1 relative flex flex-col p-3 b-(1 solid secondary-800) rd-2 cursor-pointer"
        >
          <span class="font-bold mb-1">Stijlvol</span>
          <span>Gebruik ons sjabloon.</span>
          <div class="mt-4 c-grey-800">
            <div class="flex items-center gap-1">
              <span class="material-icons c-grey-400 font-size-3rem">check</span>
              Datumplanner
            </div>
            <div class="flex items-center gap-1">
              <span class="material-icons c-grey-400 font-size-3rem">check</span>
              Locatietype
            </div>
            <div class="flex items-center gap-1">
              <span class="material-icons c-grey-400 font-size-3rem">check</span>
              Ligging en omgeving
            </div>
          </div>
          <input
            type="radio"
            bind:group={useTemplate}
            value={true}
            class="hidden"
          />
          <span
            class="material-icons absolute right-3"
            class:c-primary-600={useTemplate === true}
            >{`radio_button_${useTemplate === true ? "" : "un"}checked`}</span
          >
        </label>
        <label
          class="flex-1 relative flex flex-col p-3 b-(1 solid grey-300) rd-2 cursor-pointer"
        >
          <span class="font-bold mb-1">Blanco</span>
          <span>Zelfstandig formulier opstellen.</span>
          <input
            type="radio"
            bind:group={useTemplate}
            value={false}
            class="hidden"
          />
          <span
            class="material-icons absolute right-3"
            class:c-primary-600={useTemplate === false}
            >{`radio_button_${useTemplate === false ? "" : "un"}checked`}</span
          >
        </label>
      </div>
      <span class="c-grey-600">* Selecteer om door te gaan</span>
    {/if}

    {#if currentStep === 2}
      <h6>Bepaal je plaats of regio</h6>

      <label class="flex items-center">
        <span class="material-icons absolute ml-3 font-size-2.5rem">search</span>
        <input
          type="search"
          autocomplete="address-level2"
          bind:value={location}
          placeholder="Zoek een plaats of regio"
          class="p-4 pl-11 w-full b-(1 solid grey-400) rd-1 [&::placeholder]:c-grey-400"
        />
      </label>
      <label class="flex items-center gap-2">
        Straal
        <input
          type="range"
          min="0"
          max="100"
          bind:value={range}
          class="flex-1"
        />
        <label class="relative flex items-center">
          <input type="text" min="0" max="100" bind:value={range} class="p-3 pr-9 w-8rem b-(1 solid grey-400) text-right rd-1" />
          <span class="absolute right-2 c-grey-400 select-none">km</span>
        </label>
      </label>
    {/if}
  </div>
  <svelte:fragment slot="footer">
    {#if currentStep > 0}
      <Button secondary on:click={() => (currentStep -= 1)} text="Vorige" />
    {/if}

    {#if currentStep < titles.length - 1}
      <Button
        disabled={currentStep === 1 && useTemplate === undefined}
        on:click={() => (currentStep += 1)}
        class="ml-auto"
        text="Volgende stap"
      />
    {:else}
      <Button on:click={done} class="ml-auto" text="Beginnen" />
    {/if}
  </svelte:fragment>
</Dialog>
