<script lang="ts">
  import ViewMode from "./ViewMode.svelte";

  const savedState = JSON.parse(localStorage.getItem("formEditorState") ?? "{}");
  const title = savedState.title ?? "";
  const description = savedState.description ?? "";
  const canvasItems = savedState.canvasItems ?? [];
</script>

<div class="@container _backdrop absolute block w-full h-full of-y-auto">
  <ViewMode {title} {description} {canvasItems} />
</div>
