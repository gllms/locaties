<script lang="ts">
  export let icon: string | undefined = undefined;
  export let text = "";

  export let disabled = false;

  export let secondary: boolean = false;
  export let tertiary: boolean = false;


  let classProp: string | undefined = undefined;
  export { classProp as class };
</script>

<button
  {disabled}
  class:secondary
  class:tertiary
  on:click
  class={`inline-flex items-center
          min-h-16 w-fit px-1.8rem py-0.8rem
          b-(1 solid transparent) c-white
          bg-primary-900 hover:bg-primary-800 active:bg-primary-900
          [&.secondary]:(bg-transparent hover:bg-grey-400 active:bg-#fcfcf7 b-grey-900 c-black)
          [&.tertiary]:(!px-0 bg-transparent hover:bg-transparent hover:c-primary-600 active:bg-#fcfcf7 b-none c-black)
          disabled:(bg-grey-400)
          font-primary font-size-1.4rem font-500
          line-height-1 [letter-spacing:0.024rem]
          rd-1 cursor-pointer whitespace-nowrap select-none ${classProp}`}
  style:padding-inline={text ? "1.8rem" : "0.8rem"}
>
  {#if icon}
    <span
      class="material-icons"
      class:c-grey-900={secondary}
      class:c-primary-400={tertiary}
      style:margin-right={text ? "var(--spacing-2x)" : "0"}
    >
      {icon}</span
    >
  {/if}
  {#if text}
    <span class:underline={tertiary}>{text}</span>
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
