<script lang="ts">
  import { canvasItems, description, secretOptions, title } from "../stores";
  import ViewMode from "./ViewMode.svelte";

  function handleMessage(e: MessageEvent) {
    if (e.origin !== "https://www.locaties.nl") return;

    $title = e.data.title;
    $description = e.data.description;
    $canvasItems = e.data.canvasItems;
    $secretOptions = e.data.secretOptions;
  }
</script>

<svelte:window on:message={handleMessage} />

<ViewMode
  title={$title}
  description={$description}
  canvasItems={$canvasItems}
/>

<style>
  :global(head:has(meta[property="og:url"][content^="/form/preview"]) + body) {
    & header {
      display: none;
    }

    & [class^="styles_pageWrapper"] {
      padding-top: 0;
    }

    & .backdrop {
      min-height: 100%;
    }
  }
</style>
