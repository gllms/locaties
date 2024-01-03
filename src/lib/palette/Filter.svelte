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

  let currentPage = 0;
  $: itemsPerPage = images ? 8 : 4;

  $: pageOptions = filters[filter].options.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  $: data.filter = filter;

  $: icons = filters[filter].icons;
  $: images = filters[filter].images;

  $: allChecked = data.options?.length === filters[filter].options?.length;
</script>

{#if viewMode}
  <div
    class:pointer-events-none={!viewMode}
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [grid-auto-rows:1fr] grid-items-stretch gap-2 p-0
           [&>label]:(rd-2 bg-cover b-(1 solid grey-400))
           [&>label:has(:checked)]:(bg-primary-200 b-primary-600)
           [&_p]:(m-0 font-500)"
    class:lg:!grid-cols-3={!images}
    class:grid-cols-2={images}
  >
    {#each data.options as option}
      {@const checked = data.selected?.includes(option)}
      <label
        style:background-image={images
          ? `linear-gradient(transparent,transparent,${
              data.selected?.includes(option)
                ? "var(--color-primary-600)"
                : "rgba(0,0,0,.8)"
            }),url("https://www.locaties.nl/cdn-cgi/image/width=1280,format=auto/media/${
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
            {#if data.selected?.includes(option)}
              <div
                class="absolute w-12px h-12px left-4px top-4px bg-white"
              ></div>
            {/if}
            <span
              class="relative material-icons font-material-filled"
              class:c-primary-600={data.selected?.includes(option)}
              >{`check_box${
                data.selected?.includes(option) ? "" : "_outline_blank"
              }`}</span
            >
          </div>
        </div>
      </label>
    {/each}

    <label class="flex flex-col items-start justify-end">
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
  <label class="flex items-center mb-4">
    <span class="material-icons absolute ml-3 font-size-2.5rem">search</span>
    <input
      type="search"
      placeholder="Zoek een filteroptie"
      class="p-4 pl-11 w-full b-(1 solid grey-400) rd-1 [&::placeholder]:c-grey-400"
    />
  </label>
  <div class="grid grid-cols-2 gap-4 pb-2" class:grid-cols-4={images}>
    {#each filters[filter].options as option}
      <label
        style:background-image={images
          ? `linear-gradient(transparent,transparent,${
              data.options?.includes(option)
                ? "var(--color-primary-600)"
                : "rgba(0,0,0,.8)"
            }),url("https://www.locaties.nl/cdn-cgi/image/width=1280,format=auto/media/${
              images[filters[filter].options.indexOf(option)]
            }`
          : undefined}
        class="rd-2 bg-cover b-(1 solid grey-400)"
        class:c-white={images}
        class:b-0={images}
        class:hidden={pageOptions.indexOf(option) === -1}
      >
        {#if icons}
          <span class="material-icons m-2"
            >{icons[filters[filter].options.indexOf(option)]}</span
          >
        {/if}
        <div
          class="relative flex items-end justify-between gap-2 p-2
                 [&_p]:(m-0 font-500)"
          class:h-[16rem]={images}
        >
          <p class="overflow-hidden ws-nowrap text-ellipsis">{option}</p>
          <input
            type="checkbox"
            bind:group={data.options}
            value={option}
            class="hidden"
          />
          <div class="relative h-2rem">
            {#if data.options?.includes(option)}
              <div
                class="absolute w-12px h-12px left-4px top-4px bg-white"
                class:bg-primary-600={images}
              ></div>
            {/if}
            <span
              class="relative material-icons font-material-filled"
              class:c-primary-600={!images && data.options?.includes(option)}
              >{`check_box${
                data.options?.includes(option) ? "" : "_outline_blank"
              }`}</span
            >
          </div>
        </div>
      </label>
    {/each}
  </div>
  <div class="flex items-center w-fit mx-auto mt-2">
    <button
      class="icon-button"
      on:click={() => (currentPage = Math.max(0, currentPage - 1))}
    >
      chevron_left
    </button>
    {#each Array(Math.ceil(filters[filter].options.length / itemsPerPage)) as _, n}
      <button
        class="bg-transparent b-none cursor-pointer underline font-500"
        class:c-primary-600={currentPage === n}
        on:click={() => (currentPage = n)}
      >
        {n + 1}
      </button>
    {/each}
    <button
      class="icon-button"
      on:click={() => {
        if (currentPage < filters[filter].options.length / itemsPerPage - 1) {
          currentPage += 1;
        }
      }}
    >
      chevron_right
    </button>
  </div>
  <label
    class="absolute right-12 bottom-6 flex items-center gap-2 float-right p-2
           [&_p]:(m-0 font-500)"
  >
    <input
      type="checkbox"
      on:change={() => {
        if (data.options?.length === filters[filter].options?.length) {
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
    Selecteer alles ({filters[filter].options.length})
  </label>
{/if}
