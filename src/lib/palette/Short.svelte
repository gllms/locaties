<script lang="ts">
  export let data = {
    value: "",
  };
</script>

<input type="text" bind:value={data.value} placeholder="Omschrijving" />
<input disabled />

<style>
  input[type="text"] {
    border: none;
    border-bottom: 2px solid var(--color-grey-400);
    padding-block: var(--spacing-2x);
  }

  input[disabled] {
    pointer-events: none;
  }
</style>