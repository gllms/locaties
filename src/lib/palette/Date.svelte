<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../Button.svelte";

  export let data = {
    dates: [] as string[],
  };

  export let viewMode = false;

  onMount(() => {
    if (!data.dates)
      data = {
        dates: [new Date().toISOString().slice(0, 10)],
      };
  });

  function addDate() {
    data = {
      dates: [...data.dates, new Date().toISOString().slice(0, 10)],
    };
  }
</script>

{#if viewMode}
  <ol class="viewMode">
    {#each data.dates ?? [] as date}
      <li class="flex items-center gap-2">
        {date}
        <span>
          <Button secondary icon="check" />
          <Button secondary icon="close" />
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
  <Button
    secondary
    on:click={addDate}
    icon="add"
    class="w-fit b-none"
    text="Meer" />
{/if}

<style>
  ol {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2x);
    width: fit-content;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
  }
</style>
