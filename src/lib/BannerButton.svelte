<script>
  import Button from "./Button.svelte";
</script>

<Button
  secondary
  icon="speaker_notes"
  text="Verzamel meningen"
  on:click={() => (location.href = "/form/edit")}
/>

<style>
  :global([class*="bannerInner"] [class*="content"] button) {
    @apply mt-4rem -mb-8rem c-white b-white;

    & > .material-icons {
      color: white !important;
    }
  }
</style>
