<script>
  import Button from "./Button.svelte";
</script>

<Button tertiary icon="fullscreen" text="Alle resultaten" class="float-right" />
<h5>Datumplanner</h5>
<p class="mb-1 c-tertiary-600 font-bold case-upper font-size-1.4rem">Hoogste score</p>
<div
  class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 b-(1 solid grey-400) rd-2)
         [&_time]:(font-size-8 c-primary-800)
         [&_span]:(font-size-6 font-bold c-grey-900)"
>
  <div class="h-48">
    <time>15 januari</time>
    <span>18 stemmen</span>
  </div>
  <div class="h-40">
    <time>26 januari</time>
    <span>18 stemmen</span>
  </div>
  <div class="h-36">
    <time>8 april</time>
    <span>18 stemmen</span>
  </div>
</div>

<div class="flex justify-between mb-6 py-4 b-b-(1 solid grey-400)">
  <span class="c-grey-400 font-size-1.4rem font-bold case-upper">overige data</span>
  <span class="material-icons">keyboard_arrow_down</span>
</div>

<h5>Ligging en omgeving</h5>
<p class="mb-1 c-tertiary-600 font-bold case-upper font-size-1.4rem">Hoogste score</p>
<div
  class="flex items-end gap-4
         [&>div]:(flex-1 flex flex-col justify-end p-2 bg-grey-200 rd-2)
         [&_data]:(font-size-8 c-primary-800)
         [&_span]:(font-size-6 font-bold c-grey-900)"
>
  <div class="h-48">
    <data>73%</data>
    <span>18 stemmen</span>
  </div>
  <div class="h-40">
    <data>44%</data>
    <span>18 stemmen</span>
  </div>
  <div class="h-36">
    <data>12%</data>
    <span>18 stemmen</span>
  </div>
</div>

<div class="flex justify-between py-4 b-b-(1 solid grey-400)">
  <span class="c-grey-400 font-size-1.4rem font-bold case-upper">overige data</span>
  <span class="material-icons">keyboard_arrow_down</span>
</div>
