<script>
  import Button from "./Button.svelte";
  import cards from "../cards";
    import ResultsSidebar from "./ResultsSidebar.svelte";
</script>

<div class="flex gap-12 mx-96">
  <div class="w-64rem">
    <ResultsSidebar />
  </div>
  <div class="flex flex-col gap-2">
    <h6>Bepaal je plaats of regio</h6>
    <div class="flex items-center gap-6">
      <input
        type="search"
        placeholder="Zoek een plaats of regio"
        class="px-4 py-3 w-28rem"
      />
      <label class="flex gap-2">
        Straal
        <input type="range" min="0" max="100" value="50" class="accent-primary-600" />
      </label>
      <input type="number" value="50" class="w-20 py-3" />
      <Button secondary icon="map" text="Toon kaart" class="ml-auto" />
    </div>
    <div class="grid grid-cols-3 gap-6">
      {#each cards as card}
        <div class="flex gap-6 overflow-hidden">
          <div class="max-w-full flex-grow-1 font-size-6">
            <img
              class="aspect-4/3 object-cover rd-2"
              src={card.image}
              alt="location pic"
              loading="lazy"
            />
            <p class="my-1 font-600 overflow-hidden ws-nowrap overflow-hidden text-ellipsis">{card.name}</p>
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
              69%
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
