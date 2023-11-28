<script lang="ts">
  import { secretOptions } from "../../stores";
  import Button from "../Button.svelte";
  import Filter from "./Filter.svelte";

  export let data: {
    description: string;
    dates: string[];
    values: (boolean | undefined)[];
  } = {
    description: "",
    dates: [new Date().toISOString().slice(0, 10)],
    values: [],
  };

  export let viewMode = false;

  const buttons = [
    {
      value: true,
      icon: "mood",
      text: "Ik kan er bij zijn!",
    },
    {
      value: false,
      icon: "mood_bad",
      text: "Helaas niet",
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
    <ol>
      {#each data.dates ?? [] as date, i}
        {@const val = data.values[i]}
        <li
          class="flex items-center gap-2 w-full font-500
                 [&>button]:(flex-1 flex items-center gap-2 min-h-16 bg-white b-(1 solid grey-300 rd-1) cursor-pointer rd-2)">
          <span class="mr-2"
            >{new Date(date).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}</span>
          {#each buttons as { value, icon, text }}
            <button
              class="[&[data-active]]:(bg-primary-200 b-primary-200)"
              data-active={val === value || undefined}
              style:max-width={$secretOptions.date_buttons === "fixed"
                ? "23rem"
                : undefined}
              on:click={() =>
                (data.values[i] = val === value ? undefined : value)}>
              <span class="material-icons">{icon}</span>
              {text}

              <span class="material-icons ml-auto"
                >{`radio_button_${val === value ? "" : "un"}checked`}</span>
            </button>
          {/each}
        </li>
      {/each}
    </ol>
  {:else}
    <input
      type="text"
      bind:value={data.description}
      placeholder="Omschrijving"
      class="py-3 b-none b-b-(1 solid grey-400)" />
    <ol class="w-fit">
      {#each data.dates ?? [] as date, i}
        <li class="flex">
          <input type="date" bind:value={date} class="p-2 b b-grey-500 rd-2" />
          {#if i > 0}
            <button
              class="flex items-center bg-transparent c-grey-700 b-none cursor-pointer"
              on:click={() =>
                (data.dates = data.dates.filter((_, j) => j !== i))}>
              <span class="material-icons">delete</span>
            </button>
          {/if}
        </li>
      {/each}
    </ol>
    <Button secondary on:click={addDate} icon="add" text="Meer" />
  {/if}
</div>
