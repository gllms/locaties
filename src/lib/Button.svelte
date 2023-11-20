<script lang="ts">
  export let icon: string = "add";
  export let primary: boolean = true;
</script>

<button class:primary>
  <span>{icon}</span>
  <slot />
</button>

<style>
  button {
    border-radius: 0.4rem;
    padding: 0.8rem 1.8rem;
    background-color: var(--color-primary-900);
    border: 1px solid var(--color-primary-900);
    color: var(--color-white);
    font-family: var(--font-family-primary);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.024rem;
    min-height: 4rem;
    cursor: pointer;
  }
</style>