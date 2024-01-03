<script lang="ts">
  import Button from "./Button.svelte";
  import cards from "../cards";
  import ResultsOverlay from "./ResultsOverlay.svelte";
  import Dialog from "./Dialog.svelte";

  let locationDialog: HTMLDialogElement;
  let overlay: HTMLDialogElement;

  let range = 50;
</script>

<svelte:head>
  <title>Resultaten</title>
</svelte:head>

<div class="flex gap-12 mx-[var(--grid-spacing)] mt-8 pb-12">
  <div class="w-54rem">
    <h4 class="c-primary-900 mb-4">Hoogste score</h4>
    <h5>Datumplanner</h5>
    <p class="text-caption mb-1">Totaal 23 antwoorden</p>
    <div
      class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 b-(1 solid grey-400) rd-2)
         [&_date]:(c-primary-800 font-500)"
    >
      <div>
        <date>15 januari</date>
        <span class="text-caption">18 stemmen</span>
      </div>
      <div>
        <date>26 januari</date>
        <span class="text-caption">18 stemmen</span>
      </div>
      <div>
        <date>8 april</date>
        <span class="text-caption">18 stemmen</span>
      </div>
    </div>

    <hr class="my-8" />

    <h5>Ligging en omgeving</h5>
    <p class="text-caption mb-1">Totaal 23 antwoorden</p>
    <div
      class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-3 bg-grey-200 bg-cover aspect-1/1 rd-2)
         [&_span]:(c-white font-500)
         [&_.text-caption]:(m-0 c-grey-600)"
    >
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/o0nE130.jpg')]"
      >
        <span>In het park</span>
        <p class="text-caption">11 stemmen</p>
      </div>
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/VGNSckf.jpg')]"
      >
        <span>Bosrijke omgeving</span>
        <p class="text-caption">5 stemmen</p>
      </div>
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/ulLCV12.jpg')]"
      >
        <span>Industrieel gebied</span>
        <p class="text-caption">3 stem</p>
      </div>
    </div>

    <hr class="my-8" />

    <h5>Stijl</h5>
    <p class="text-caption mb-1">Totaal 23 antwoorden*</p>
    <div
      class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-3 bg-grey-200 bg-cover aspect-1/1 rd-2)
         [&_span]:(c-white font-500)
         [&_.text-caption]:(m-0 c-grey-600)"
    >
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/vNFt2rV.png')]"
      >
        <span>Landelijk</span>
        <p class="text-caption">11 stemmen</p>
      </div>
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/e7DgYr6.jpg')]"
      >
        <span>Industrieel</span>
        <p class="text-caption">10 stemmen</p>
      </div>
      <div
        class="[background-image:linear-gradient(transparent,rgba(0,0,0,.8)),url('https://i.imgur.com/6fyXlX5.jpg')]"
      >
        <span>Klassiek</span>
        <p class="text-caption">5 stemmen</p>
      </div>
    </div>

    <p class="text-caption my-8 c-grey-600">
      *Meerdere selecties waren mogelijk.
    </p>

    <Button
      icon="fullscreen"
      text="Alle resultaten"
      on:click={() => overlay.showModal()}
    />
  </div>
  <div class="flex flex-col gap-3">
    <h4 class="c-primary-900">De perfecte matches</h4>
    <div class="flex items-center gap-6">
      <Button
        tertiary
        icon="location_on"
        text="Plaats of regio"
        on:click={() => locationDialog.showModal()}
      />
      <Button secondary icon="map" text="Toon kaart" class="ml-auto" />
    </div>
    <p class="m-0 text-subtitle-3">112 locaties</p>
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-6">
      {#each cards.slice(0, 12) as card}
        <div class="flex gap-6 overflow-hidden cursor-pointer">
          <div class="max-w-full flex-grow-1 font-size-6">
            <img
              class="w-full aspect-4/3 object-cover rd-2"
              src={"https://www.locaties.nl/cdn-cgi/image/width=256,format=auto/media/" +
                card.image}
              alt="location pic"
              loading="lazy"
            />
            <p
              class="my-1 font-600 overflow-hidden ws-nowrap overflow-hidden text-ellipsis"
            >
              {card.name}
            </p>
            <div class="flex items-center gap-1">
              <span class="material-icons">food_bank</span><span
                class="ws-nowrap overflow-hidden text-ellipsis"
                >{card.location}</span
              >
              <span class="flex items-center ml-auto">
                <span class="material-icons font-material-filled c-grey-300"
                  >star</span
                >
                <span class="material-icons font-material-filled c-grey-300"
                  >star</span
                >
                <span class="material-icons font-material-filled c-grey-300"
                  >star</span
                >
                <span class="material-icons font-material-filled c-grey-300"
                  >star</span
                >
                <span class="material-icons font-material-filled c-grey-300"
                  >star</span
                >
                <span class="ml-1">0</span>
              </span>
            </div>
            <div class="flex items-center gap-1">
              <span class="material-icons">meeting_room</span>
              {card.rooms}

              <div class="flex items-center gap-1 ml-auto">
                <span class="material-icons">person_pin</span>
                {card.capacity}
              </div>
            </div>
            <div class="flex items-center gap-1 c-quinary-800">
              <span class="material-icons">auto_awesome</span>
              {card.match}%
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<Dialog
  bind:element={locationDialog}
  title="Bepaal je plaats of regio"
  subtitle="Geef je voorkeur van locatie"
>
  <div class="flex flex-col gap-4" slot="content">
    <h6>Bepaal je plaats of regio</h6>

    <label class="flex items-center">
      <span class="material-icons absolute ml-3 font-size-2.5rem">search</span>
      <input
        type="search"
        autocomplete="address-level2"
        placeholder="Zoek een plaats of regio"
        class="p-4 pl-11 w-full b-(1 solid grey-400) rd-1 [&::placeholder]:c-grey-400"
      />
    </label>
    <label class="flex items-center gap-2">
      Straal
      <input type="range" min="0" max="100" bind:value={range} class="flex-1" />
      <label class="relative flex items-center">
        <input
          type="text"
          min="0"
          max="100"
          bind:value={range}
          class="p-3 pr-9 w-8rem b-(1 solid grey-400) text-right rd-1"
        />
        <span class="absolute right-2 c-grey-400 select-none">km</span>
      </label>
    </label>
  </div>
  <svelte:fragment slot="footer">
      <Button on:click={() => locationDialog.close()} class="ml-auto" text="Toepassen" />
  </svelte:fragment>
</Dialog>

<ResultsOverlay bind:element={overlay} />
