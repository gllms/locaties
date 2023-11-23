<script lang="ts">
  export let data = {
    value: "",
  };

  export let viewMode = false;
</script>

{#if viewMode}
  {#if data.value}
    <p>{data.value}</p>
  {/if}
  <input type="text" />
{:else}
  <input type="text" bind:value={data.value} placeholder="Omschrijving" />
  <input disabled />
{/if}

<style>
  p {
    margin: 0;
  }

  input[placeholder="Omschrijving"] {
    border: none;
    border-bottom: 2px solid var(--color-grey-400);
    padding-block: var(--spacing-2x);
  }

  input[disabled] {
    pointer-events: none;
  }
</style>
