<script lang="ts">
  import Button from "../Button.svelte";

  export let data: {
    dates: string[];
    values: (boolean | undefined)[];
  } = {
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
  ]

  function addDate() {
    data.dates = [...data.dates, new Date().toISOString().slice(0, 10)];
  }
</script>

<div>
  {#if viewMode}
    <ol class="flex flex-col gap-2 m-0 mb-2 p-0 list-none">
      {#each data.dates ?? [] as date, i}
        {@const val = data.values[i]}
        <li
          class="flex items-center gap-2 w-full font-500
                 [&>button]:(flex-1 flex items-center gap-2 min-h-16 bg-white b-(1 solid grey-300 rd-1) cursor-pointer rd-2)">
          {new Date(date).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {#each buttons as button}
            <button
              class="[&[data-active]]:(bg-primary-200)"
              data-active={val === button.value || undefined}
              on:click={() => (data.values[i] = val === button.value ? undefined : button.value)}>
              <span class="material-icons">{button.icon}</span>
              {button.text}

              <span class="material-icons ml-auto">{`radio_button_${val === button.value ? "" : "un"}checked`}</span>
            </button>
          {/each}
        </li>
      {/each}
    </ol>
  {:else}
    <ol>
      {#each data.dates ?? [] as date, i}
        <li>
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
