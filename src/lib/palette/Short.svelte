<script lang="ts">
  export let data = {
    description: "",
    value: "",
  };

  export let viewMode = false;
</script>

{#if viewMode}
  <input type="text" bind:value={data.value} placeholder="Typ hier uw antwoord" />
{:else}
  <input type="text" disabled placeholder="Typ hier uw antwoord" class="opacity-50" />
{/if}

<style>
  input {
    @apply px-5 py-4 w-full b-(1 solid grey-400) rd-1;
  }
</style>
