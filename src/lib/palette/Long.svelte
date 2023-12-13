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
  <textarea disabled rows="3" class="w-full pointer-events-none" />
{/if}
