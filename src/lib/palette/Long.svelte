<script lang="ts">
  export let data = {
    description: "",
    value: "",
  };

  export let viewMode = false;
</script>

{#if viewMode}
  {#if data.description}
    <p class="m-0">{data.description}</p>
  {/if}
  <textarea rows="3" bind:value={data.value} />
{:else}
  <input
    type="text"
    bind:value={data.description}
    placeholder="Omschrijving"
    class="py-3 b-0 b-b-(1 solid grey-400)" />
  <textarea disabled rows="3" class="pointer-events-none" />
{/if}
