<script lang="ts">
  export let data: {
    description: string;
    dates: string[];
    values: ("yes" | "maybe" | "no" | undefined)[];
  } = {
    description: "",
    dates: [new Date().toISOString().slice(0, 10)],
    values: [],
  };

  export let viewMode = false;

  const buttons: {
    value: "yes" | "maybe" | "no";
    icon: string;
    text: string;
  }[] = [
    {
      value: "yes",
      icon: "check",
      text: "Ik kan",
    },
    {
      value: "maybe",
      icon: "show_chart",
      text: "Misschien",
    },
    {
      value: "no",
      icon: "clear",
      text: "Nee",
    },
  ];

  function addDate(
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) {
    data.dates = [...(data.dates ?? []), e.currentTarget.value];
    e.currentTarget.value = "";
  }
</script>

<div class="flex flex-col gap-4">
  {#if viewMode}
    <div
      class="grid grid-cols-1 md:![grid-template-columns:max-content_1fr] items-center [column-gap:2.4rem] md:[row-gap:1.2rem] font-size-14px"
    >
      {#each data.dates ?? [] as date, i}
        {@const val = data.values[i]}
        <span class="mr-2 font-500"
          >{new Date(date).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</span
        >
        <div class="flex flex-1 gap-2 mb-4 md:mb-0">
          {#each buttons as { value, icon, text }}
            <button
              class="flex-1 flex items-center gap-2 min-h-16 bg-white b-(1 solid grey-300 rd-1) cursor-pointer rd-2
                     [&[data-active]]:(bg-primary-200 b-primary-600)"
              data-active={val === value || undefined}
              on:click={() =>
                (data.values[i] = val === value ? undefined : value)}
            >
              <span class="material-icons">{icon}</span>
              {text}

              <span
                class="material-icons ml-auto hidden md:block"
                class:c-primary-600={val === value}
                >{`radio_button_${val === value ? "" : "un"}checked`}</span
              >
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <div>
      <p class="text-caption m-0 mb-2 c-grey-700">Kies een datum</p>
      <button
        class="flex items-center gap-4 w-40rem p-4 c-grey-400 bg-transparent b-none b-(1 solid grey-400) rd-1"
        on:click={(e) => e.currentTarget.querySelector("input")?.showPicker()}
      >
        <input
          type="date"
          class="w-0 b-none -ml-4 outline-none"
          on:change={(e) => addDate(e)}
          value=""
        />
        {new Date().toISOString().slice(0, 10)}
        <span class="material-icons ml-auto c-primary-900"
          >insert_invitation</span
        >
      </button>
    </div>
    <div class="grid gap-4 w-fit">
      {#each data.dates ?? [] as date, i}
        <button
          class="grid grid-cols-subgrid items-center col-span-4 p-2 bg-transparent b-none b-b-(1 solid grey-400) font-bold text-left"
          on:click={(e) => e.currentTarget.querySelector("input")?.showPicker()}
        >
          {#each new Date(date)
            .toLocaleDateString( "nl-NL", { day: "numeric", month: "long", year: "numeric" }, )
            .split(" ") as word}
            <span>{word}</span>
          {/each}
          <button
            class="icon-button c-grey-700"
            on:click|stopPropagation={() =>
              (data.dates = data.dates.filter((_, j) => j !== i))}
          >
            delete
          </button>
          <input
            type="date"
            bind:value={date}
            class="w-0 h-0 b-none outline-none"
          />
        </button>
      {/each}
    </div>
  {/if}
</div>
