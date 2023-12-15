<script lang="ts">
  import filters from "../../filters";

  export let data: {
    description: string;
    filter: string;
    options: string[];
    selected: string[] | string;
  } = {
    description: "",
    filter: "location",
    options: [],
    selected: [],
  };

  export let viewMode = false;
  export let filter: keyof typeof filters = "location";

  $: data.filter = filter;

  $: icons = filters[filter].icons;
  $: images = filters[filter].images;

  $: allChecked = data.options.length === filters[filter].options.length;
</script>

{#if viewMode}
  {#if data.description}
    <p class="m-0">{data.description}</p>
  {/if}
  <div
    class:pointer-events-none={!viewMode}
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [grid-auto-rows:1fr] grid-items-stretch gap-2 p-0
           [&>label]:(rd-2 bg-cover b-(1 solid grey-400))
           [&>label:has(:checked)]:(bg-primary-200 b-primary-600)
           [&_p]:(m-0 font-500)"
    class:lg:!grid-cols-3={!images}
  >
    {#each data.options as option}
      {@const checked = data.selected.includes(option)}
      <label
        style:background-image={images
          ? `linear-gradient(transparent,transparent,rgba(0,0,0,.8)),url("https://www.locaties.nl/cdn-cgi/image/width=1280,format=auto/media/${
              images[filters[filter].options.indexOf(option)]
            }`
          : undefined}
        class:c-white={images}
        class:!b-0={images}
      >
        {#if icons}
          <span class="material-icons m-2"
            >{icons[filters[filter].options.indexOf(option)]}</span
          >
        {/if}
        <div
          class="relative flex items-end justify-between gap-2 p-3
                 [&_p]:(m-0 font-500)"
          class:h-[16rem]={images}
        >
          <p class="overflow-hidden ws-nowrap text-ellipsis">{option}</p>
          <input
            type="checkbox"
            bind:group={data.selected}
            value={option}
            class="hidden"
          />
          <div class="relative h-2rem">
            {#if data.selected.includes(option)}
              <div
                class="absolute w-12px h-12px left-4px top-4px bg-white"
              ></div>
            {/if}
            <span
              class="relative material-icons font-material-filled"
              class:c-primary-600={data.selected.includes(option)}
              >{`check_box${
                data.selected.includes(option) ? "" : "_outline_blank"
              }`}</span
            >
          </div>
        </div>
      </label>
    {/each}

    <label class="flex flex-col items-start">
      {#if icons}
        <span class="material-icons m-2">remove</span>
      {/if}
      <div
        class="flex justify-between items-center gap-2 w-full p-3
                 [&_p]:(m-0 font-500)"
      >
        <p class="overflow-hidden ws-nowrap text-ellipsis">Geen voorkeur</p>
        <input
          type="radio"
          bind:group={data.selected}
          value="Geen voorkeur"
          class="hidden"
        />
        <span
          class="material-icons ml-auto"
          class:c-primary-600={data.selected === "Geen voorkeur"}
          >{`radio_button_${
            data.selected === "Geen voorkeur" ? "" : "un"
          }checked`}</span
        >
      </div>
    </label>
  </div>
{:else}
  <div class="carousel flex gap-4 pb-2 overflow-x-scroll">
    {#each filters[filter].options as option}
      <label
        style:background-image={images
          ? `linear-gradient(transparent,transparent,rgba(0,0,0,.8)),url("https://www.locaties.nl/cdn-cgi/image/width=1280,format=auto/media/${
              images[filters[filter].options.indexOf(option)]
            }`
          : undefined}
        class="rd-2 bg-cover b-(1 solid grey-400)"
        class:c-white={images}
        class:b-0={images}
      >
        {#if icons}
          <span class="material-icons m-2"
            >{icons[filters[filter].options.indexOf(option)]}</span
          >
        {/if}
        <div
          class="relative flex items-end justify-between w-max gap-2 p-2
                 [&_p]:(m-0 font-500)"
          class:h-[16rem]={images}
          class:!w-[16rem]={images}
        >
          <p class="overflow-hidden ws-nowrap text-ellipsis">{option}</p>
          <input
            type="checkbox"
            bind:group={data.options}
            value={option}
            class="hidden"
          />
          <div class="relative h-2rem">
            {#if data.options.includes(option)}
              <div
                class="absolute w-12px h-12px left-4px top-4px bg-white"
              ></div>
            {/if}
            <span
              class="relative material-icons font-material-filled"
              class:c-primary-600={data.options.includes(option)}
              >{`check_box${
                data.options.includes(option) ? "" : "_outline_blank"
              }`}</span
            >
          </div>
        </div>
      </label>
    {/each}
  </div>
  <label
    class="flex items-center gap-2 float-right p-2
           [&_p]:(m-0 font-500)"
  >
    <input
      type="checkbox"
      on:change={() => {
        if (data.options.length === filters[filter].options.length) {
          data.options = [];
        } else {
          data.options = filters[filter].options.slice();
        }
      }}
      class="hidden"
    />
    <span
      class="relative material-icons font-material-filled"
      class:c-primary-600={allChecked}
      >{`check_box${allChecked ? "" : "_outline_blank"}`}</span
    >
    Selecteer alles
  </label>
{/if}

<style>
  .carousel::-webkit-scrollbar {
    height: 8px;
  }

  .carousel::-webkit-scrollbar-track {
    background: transparent;
  }

  .carousel::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 8px;
  }

  .carousel::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey-500);
  }
</style>
