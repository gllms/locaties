<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let icon: string | undefined = undefined;
  export let text = "";
  export let secondary: boolean = false;
  export let style: string | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<button class:secondary on:click={() => dispatch("click")} style={style} style:padding-inline={text ? "1.8rem" : "0.8rem"}>
  {#if icon}
    <span class="material-icons" style:margin-right={text ? "var(--spacing-2x)" : "0"}>{icon}</span>
  {/if}
  {#if text}
    <span>{text}</span>
  {/if}
</button>

<style>
  button {
    border-radius: 0.4rem;
    padding: 0.8rem 1.8rem;
    border-width: 1px;
    border-color: var(--color-primary-900);
    background-color: var(--color-primary-900);
    color: var(--color-white);
    font-family: var(--font-family-primary);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.024rem;
    min-height: 4rem;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: background-color .2s cubic-bezier(.2,0,0,1),box-shadow .2s cubic-bezier(.2,0,0,1),border-color .2s cubic-bezier(.2,0,0,1),-webkit-box-shadow .2s cubic-bezier(.2,0,0,1);
    white-space: nowrap;
  }

  button:hover {
    background-color: var(--color-primary-800);
  }

  button:active {
    background-color: var(--color-primary-900);
  }

  button.secondary {
    background-color: transparent;
    border-color: var(--color-grey-900);
    color: var(--color-black);
  }

  button.secondary:hover {
    background-color: var(--color-grey-400);
  }

  button.secondary:active {
    background-color: #FCFCF7;
  }
</style>