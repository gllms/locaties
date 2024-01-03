<script>
  export let title = "(Geen titel)";
  export let answers = 0;
  export let multiple = false;
  export let description = "";

  let collapsed = false;
</script>

<div class="inline-grid grid-cols-subgrid col-span-2 overflow-hidden">
  <div class="flex flex-col gap-3" class:max-h-38={collapsed}>
    <button
      class="p-0 w-full bg-transparent b-none cursor-pointer"
      on:click={() => (collapsed = !collapsed)}
    >
      <h4 class="flex items-center justify-between">
        {title}
        <span class="material-icons"
          >{"keyboard_arrow_" + (collapsed ? "down" : "up")}</span
        >
      </h4>
    </button>
    <p class="m-0 c-grey-700 font-size-12px">
      {answers} antwoorden{multiple ? "*" : ""}
      {#if multiple}
        <br />
        *Meerdere selecties waren mogelijk.
      {/if}
    </p>
    {#if description && !collapsed}
      <h6 class="c-grey-800">{description}</h6>
    {/if}
  </div>
  <div
    class="relative flex flex-col gap-2 overflow-hidden"
    class:max-h-38={collapsed}
    class:gradient={collapsed}
  >
    <slot />
  </div>
</div>

<style>
  .gradient::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(transparent, white);
    pointer-events: none;
  }
</style>
