import type { SvelteComponent } from "svelte";
import "./app.css";
import MyListButton from "./lib/MyListButton.svelte";
import FormBuilder from "./lib/FormBuilder.svelte";
import "uno.css";
import SecretMenu from "./lib/SecretMenu.svelte";

const components: SvelteComponent[] = [];

const originalPushState = history.pushState;

history.pushState = function () {
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
    "/form"
  );

  addComponent(SecretMenu, document.body);

  addComponent(FormBuilder, testElement);
}

function addComponent(component: new (...args: any[]) => SvelteComponent, target: Element | null, path?: string) {
  if (!target)
    return;

  if (path && !location.pathname.startsWith(path))
    return;

  components.push(new component({
    target,
  }));
}