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
  <div class="@container w-380px mx-auto my-6 rd-4 of-hidden">
    <ViewMode {title} {description} {canvasItems} />
  </div>
</div>

<style>
  ._backdrop {
    /* cursor is a svg data url of two concentric semi-transparent black circles */
    cursor:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='8' fill='rgba(0,0,0,.2)'/%3E%3Ccircle cx='8' cy='8' r='6.5' fill='rgba(0,0,0,.2)'/%3E%3C/svg%3E")
        16 16,
      auto !important;
  }

</style>
