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
  <textarea rows="3" />
{:else}
  <input type="text" bind:value={data.value} placeholder="Omschrijving" />
  <textarea disabled rows="3" />
{/if}

<style>
  p {
    margin: 0;
  }

  input {
    border: none;
    border-bottom: 2px solid var(--color-grey-400);
    padding-block: var(--spacing-2x);
  }

  textarea[disabled] {
    pointer-events: none;
  }
</style>
