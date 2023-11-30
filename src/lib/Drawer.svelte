<script lang="ts">
  import { slide } from "svelte/transition";

  export let title = "";
  export let icon = "";

  export let open = true;
</script>

<div class="b-b-(1 solid grey-300)">
  <button
    class="flex items-center justify-between gap-2 w-full py-4 bg-transparent b-none cursor-pointer select-none"
    on:click={() => (open = !open)}>
    <span class="flex items-center gap-6">
      <span class="material-icons">{icon}</span>
      <h6>{title}</h6>
    </span>
    <span class="material-icons transition-transform duration-300" class:rotate-180={open}
      >expand_more</span>
  </button>
  {#if open}
    <div transition:slide={{ duration: 200 }}>
      <slot />
    </div>
  {/if}
</div>
