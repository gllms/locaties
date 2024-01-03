<script>
  import { onDestroy } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";

  export let text = "";
  export let duration = 5000;

  const progress = tweened(0, {
    duration,
    easing: cubicOut,
  });

  progress.set(1);

  let hidden = false;

  const timeout = setTimeout(() => {
    hidden = true;
  }, duration);

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

{#if !hidden}
  <div class="absolute left-0 bottom-26 w-full pointer-events-none -z-1">
    <div
      class="toast mx-auto px-4 py-2 w-fit bg-white c-grey-700 b-(1 solid grey-700) font-500 rd-1 overflow-hidden"
      transition:fly={{ y: 50 }}
    >
      {text}
      <div
        class="h-1 mt-2 -mb-2 -mx-4 bg-primary-600 transform-origin-left"
        style:transform={`scaleX(${$progress})`}
      ></div>
    </div>
  </div>
{/if}

<style>
  .toast {
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.20);
  }
</style>
