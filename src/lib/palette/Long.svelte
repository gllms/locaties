<script lang="ts">
  export let data = {
    value: "",
  };
</script>

<input type="text" bind:value={data.value} placeholder="Omschrijving" />
<textarea disabled rows="3" />

<style>
  input {
    border: none;
    border-bottom: 2px solid var(--color-grey-400);
    padding-block: var(--spacing-2x);
  }

  textarea {
    pointer-events: none;
  }
</style>