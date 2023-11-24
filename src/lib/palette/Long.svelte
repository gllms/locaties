<script lang="ts">
  export let data = {
    value: "",
  };

  export let viewMode = false;
</script>

{#if viewMode}
  {#if data.value}
    <p class="m-0">{data.value}</p>
  {/if}
  <textarea rows="3" />
{:else}
  <input
    type="text"
    bind:value={data.value}
    placeholder="Omschrijving"
    class="py-3 b-0 b-b-(1 solid grey-400)" />
  <textarea disabled rows="3" class="pointer-events-none" />
{/if}
