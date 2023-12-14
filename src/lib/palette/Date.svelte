<script lang="ts">
  import Button from "../Button.svelte";

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
      text: "Uhm",
    },
    {
      value: "no",
      icon: "clear",
      text: "Nee",
    },
  ];

  function addDate() {
    data.dates = [...data.dates, new Date().toISOString().slice(0, 10)];
  }
</script>

<div class="flex flex-col gap-4 [&>ol]:(flex flex-col gap-2 m-0 p-0 list-none)">
  {#if viewMode}
    {#if data.description}
      <p class="m-0">{data.description}</p>
    {/if}
    <div
      class="grid grid-cols-1 md:![grid-template-columns:max-content_1fr] items-center [column-gap:2.4rem]"
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
                class="material-icons ml-auto"
                class:c-primary-600={val === value}
                >{`radio_button_${val === value ? "" : "un"}checked`}</span
              >
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <ol class="w-fit">
      {#each data.dates ?? [] as date, i}
        <label
          class="relative flex items-center gap-4 p-2 b-b-(1 solid grey-400) font-bold"
          on:click={(e) => e.currentTarget.querySelector("input")?.showPicker()}
        >
          <input
            type="date"
            bind:value={date}
            class="w-0 b-none -ml-4 outline-none"
          />
          {@html new Date(date).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          <span class="material-icons ml-auto c-primary-900"
            >insert_invitation</span
          >
          <button
            class="icon-button c-grey-700"
            class:opacity-0={i === 0}
            class:pointer-events-none={i === 0}
            on:click|stopPropagation={() =>
              (data.dates = data.dates.filter((_, j) => j !== i))}
          >
            delete
          </button>
        </label>
      {/each}
    </ol>
    <Button tertiary on:click={addDate} icon="add" text="Meer" />
  {/if}
</div>
