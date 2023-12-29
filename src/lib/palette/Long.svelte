<script lang="ts">
  export let data = {
    description: "",
    value: "",
  };

  export let viewMode = false;
</script>

{#if viewMode}
  <textarea rows="3" bind:value={data.value} placeholder="Typ hier uw antwoord" class="resize-y" />
{:else}
  <textarea disabled rows="3" placeholder="Typ hier uw antwoord" class="opacity-50 pointer-events-none" />
{/if}

<style>
  textarea {
    --at-apply: "p-4 w-full b-(1 solid grey-400) rd-1";
  }
</style>
