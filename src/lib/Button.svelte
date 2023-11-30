<script lang="ts">
  export let icon: string | undefined = undefined;
  export let text = "";
  export let secondary: boolean = false;

  let classProp: string | undefined = undefined;
  export { classProp as class };
</script>

<button
  class:secondary
  on:click
  class={`inline-flex items-center
          min-h-16 w-fit px-[1.8rem] py-[0.8rem]
          b-(1 solid primary-900) c-white
          bg-primary-900 hover:bg-primary-800 active:bg-primary-900
          [&.secondary]:(bg-transparent hover:bg-grey-400 active:bg-[#fcfcf7] b-grey-900 c-black)
          font-primary font-size-[1.4rem] font-500
          line-height-[1] [letter-spacing:0.024rem]
          rd-1 cursor-pointer whitespace-nowrap ${classProp}`}
  style:padding-inline={text ? "1.8rem" : "0.8rem"}>
  {#if icon}
    <span
      class="material-icons"
      style:margin-right={text ? "var(--spacing-2x)" : "0"}
      style:color={secondary
        ? "var(--color-grey-900)"
        : "var(--color-primary-400"}>
      {icon}</span>
  {/if}
  {#if text}
    <span>{text}</span>
  {/if}
</button>

<style>
  button {
    transition:
      background-color 0.2s cubic-bezier(0.2, 0, 0, 1),
      box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1),
      border-color 0.2s cubic-bezier(0.2, 0, 0, 1),
      -webkit-box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
  }
</style>
