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
  <input type="text" />
{:else}
  <input
    type="text"
    bind:value={data.value}
    placeholder="Omschrijving"
    class="py-3 b-none b-b-(1 solid grey-400)" />
  <input disabled class="pointer-events-none" />
{/if}
