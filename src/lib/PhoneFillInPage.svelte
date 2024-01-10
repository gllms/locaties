<script lang="ts">
  import ViewMode from "./ViewMode.svelte";

  const savedState = JSON.parse(
    localStorage.getItem("formEditorState") ?? "{}",
  );
  const title = savedState.title ?? "";
  const description = savedState.description ?? "";
  const canvasItems = savedState.canvasItems ?? [];
</script>

<svelte:head>
  <title>{title || "Involve"}</title>
</svelte:head>

<div class="_backdrop absolute flex w-full h-full of-y-auto">
  <div class="@container aspect-[9/19.5] mx-auto my-6 rd-4 of-hidden">
    <ViewMode {title} {description} {canvasItems} />
  </div>
</div>
