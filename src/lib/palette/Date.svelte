<script lang="ts">
  import Button from "../Button.svelte";

  export let data: {
    dates: string[];
    values: (boolean | undefined)[];
  } = {
    dates: [new Date().toISOString().slice(0, 10)],
    values: [],
  };

  $: console.log(data.values);

  export let viewMode = false;

  function addDate() {
    data.dates = [...data.dates, new Date().toISOString().slice(0, 10)];
  }
</script>

<div
  class="[&>ol]:(flex flex-col gap-2 w-fit m-0 mb-2 p-0 list-none) [&_li]:flex">
  {#if viewMode}
    <ol class="viewMode">
      {#each data.dates ?? [] as date, i}
        {@const val = data.values[i]}
        <li class="flex items-center gap-2">
          {date}
          <span class="flex gap-2 [&>button]:(min-h-16 b-(1 solid black rd-1))">
            <button
              class={"icon-button" +
                (val === true ? " bg-black c-white" : "")}
              on:click={() => (data.values[i] = val === true ? undefined : true)}>
              check
            </button>
            <button
              class={"icon-button" +
                (val === false ? " bg-black c-white" : "")}
              on:click={() => (data.values[i] = val === false ? undefined : false)}>
              close
            </button>
          </span>
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
