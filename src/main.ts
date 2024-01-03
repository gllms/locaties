import "./app.css";
import "uno.css";

import type { SvelteComponent } from "svelte";

import MyListButton from "./lib/MyListButton.svelte";
import FormBuilder from "./lib/FormBuilder.svelte";
import ViewMode from "./lib/ViewMode.svelte";
import SecretMenu from "./lib/SecretMenu.svelte";
import Banner from "./lib/Banner.svelte";
import Results from "./lib/Results.svelte";
import Preview from "./lib/Preview.svelte";
import BannerButton from "./lib/BannerButton.svelte";

import sample from "./sample";

const components: SvelteComponent[] = [];

const originalPushState = history.pushState;

history.pushState = function() {
  originalPushState.apply(this, arguments as any);

  for (const component of components) {
    component.$destroy();
  }

  components.length = 0;

  setTimeout(apply, 500);
};

apply();

function apply() {
  const testElement = document.querySelector(".locaties-test");

  if (!testElement) {
    if (
      !document.querySelector(".main > div")?.hasChildNodes() ||
      (document.querySelector("meta[property='og:url']") as HTMLMetaElement)
        ?.content !== location.pathname
    ) {
      setTimeout(apply, 500);
      return;
    }
  }

  addComponent(
    MyListButton,
    document.querySelector("div[data-testid=drawerMyList]"),
  );

  addComponent(
    FormBuilder,
    document.querySelector(
      "div:has(> div > div > button[title='Opnieuw zoeken'])",
    ),
    "/form/edit",
  );

  addComponent(
    ViewMode,
    document.querySelector(
      "div:has(> div > div > button[title='Opnieuw zoeken'])",
    ),
    "/form/dQw4w9WgXcQ",
    sample,
  );

  addComponent(
    Results,
    document.querySelector(
      "div:has(> div > div > button[title='Opnieuw zoeken'])",
    ),
    "/form/results",
  );

  addComponent(
    Banner,
    document.querySelector(".locaties [class^=styles_pageContent]"),
    "/",
    undefined,
    document.querySelector(
      ".locaties [class^=styles_pageContent] > div:nth-child(18)",
    ),
  );

  addComponent(
    Banner,
    document.querySelector("div:has(>div>#faq)"),
    "/locatie/",
    {
      inDetailPage: true,
    },
    document.querySelector("div:has(>#faq)"),
  );

  addComponent(
    Preview,
    document.querySelector(
      "div:has(> div > div > button[title='Opnieuw zoeken'])",
    ),
    "/form/preview",
  );

  addComponent(
    BannerButton,
    document.querySelector("[class*=bannerInner] [class*=content]"),
    "/categorie/teambuilding",
  );

  addComponent(SecretMenu, document.body);

  addComponent(FormBuilder, testElement);
}

function addComponent(
  component: new (...args: any[]) => SvelteComponent,
  target: Element | null,
  path?: string | RegExp,
  props?: Record<string, any>,
  anchor?: Element | null,
) {
  if (!target) {
    return;
  }

  if (path) {
    if (typeof path === "string") {
      if (!location.pathname.startsWith(path)) {
        return;
      }
    } else if (!path.test(location.pathname)) {
      return;
    }
  }

  components.push(
    new component({
      target,
      anchor,
      props,
    }),
  );
}
