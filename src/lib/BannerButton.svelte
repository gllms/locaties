<script>
  import Button from "./Button.svelte";
</script>

<Button
  secondary
  icon="speaker_notes"
  text="Verzamel meningen"
  on:click={() => (location.href = "/?form/edit")}
/>
