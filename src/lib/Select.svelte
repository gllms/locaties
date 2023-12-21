<script lang="ts">
  export let value = "";

  let element: HTMLSelectElement;

  $: text = element?.querySelector<HTMLOptionElement>(`[value=${value}]`)?.innerText || "";

  let classProp: string | undefined = undefined;
  export { classProp as class };
</script>

<div class={`relative flex justify-between items-center gap-2 py-1 ${classProp}`}>
  <select bind:value bind:this={element} class="absolute w-full h-full top-0 left-0 opacity-0">
    <slot />
  </select>

  <h6>{text}</h6>

  <span class="material-icons">expand_more</span>
</div>
