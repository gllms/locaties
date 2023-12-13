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
  <input type="text" bind:value={data.value} />
{:else}
  <input disabled class="pointer-events-none w-full" />
{/if}
