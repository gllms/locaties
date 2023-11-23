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
      <li>
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
        <input type="date" bind:value={date} />
        {#if i > 0}
          <button
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
    style="width: fit-content; border: none"
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

  .viewMode li {
    display: flex;
    align-items: center;
    gap: var(--spacing-2x);
  }

  input[type="date"] {
    padding: var(--spacing-2x);
    border: 1px solid var(--color-grey-500);
    border-radius: var(--border-radius-2x);
  }

  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-grey-700);
  }
</style>
