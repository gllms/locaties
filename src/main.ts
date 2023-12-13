import "./app.css";
import "uno.css";

import type { SvelteComponent } from "svelte";

import MyListButton from "./lib/MyListButton.svelte";
import FormBuilder from "./lib/FormBuilder.svelte";
import ViewMode from "./lib/ViewMode.svelte";
import SecretMenu from "./lib/SecretMenu.svelte";

import sample from "./sample";

const components: SvelteComponent[] = [];

const originalPushState = history.pushState;

history.pushState = function() {
  originalPushState.apply(this, arguments as any);

  for (const component of components)
    component.$destroy();

  components.length = 0;

  setTimeout(apply, 500);
};

apply();

function apply() {
  const testElement = document.querySelector(".locaties-test");

  if (!testElement) {
    if (
      !document.querySelector(".main > div")?.hasChildNodes() ||
      (document.querySelector("meta[property='og:url']") as HTMLMetaElement)?.content !== location.pathname
    ) {
      setTimeout(apply, 500);
      return;
    }
  }

  addComponent(
    MyListButton,
    document.querySelector("div[data-testid=drawerMyList]")
  );

  addComponent(
    FormBuilder,
    document.querySelector("div:has(> div > div > button[title='Opnieuw zoeken'])"),
    "/form/edit"
  );

  addComponent(
    ViewMode,
    document.querySelector("div:has(> div > div > button[title='Opnieuw zoeken'])"),
    "/form/view",
    sample,
  )

  addComponent(SecretMenu, document.body);

  // addComponent(FormBuilder, testElement);
  addComponent(FormBuilder, testElement, undefined, sample);
}

function addComponent(component: new (...args: any[]) => SvelteComponent, target: Element | null, path?: string | RegExp, props?: Record<string, any>) {
  if (!target)
    return;

  if (path) {
    if (typeof path === "string") {
      if (!location.pathname.startsWith(path))
        return;
    } else if (!path.test(location.pathname))
      return;
  }

  components.push(new component({
    target,
    props,
  }));
}
