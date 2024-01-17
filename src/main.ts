import "./app.css";
import "uno.css";

import type { SvelteComponent } from "svelte";

import FormBuilder from "./lib/FormBuilder.svelte";
import PhoneFillInPage from "./lib/PhoneFillInPage.svelte";
import SecretMenu from "./lib/SecretMenu.svelte";
import Banner from "./lib/Banner.svelte";
import Results from "./lib/Results.svelte";
import BannerButton from "./lib/BannerButton.svelte";

import sample from "./sample";

const originalPushState = history.pushState;

history.pushState = function() {
  originalPushState.apply(this, arguments as any);
  apply();
};

const components: SvelteComponent[] = [];

apply();

function apply() {
  for (const component of components) {
    component.$destroy();
  }

  components.length = 0;

  setTimeout(() => {
    const testElement = document.querySelector(".locaties-test");

    if (!testElement) {
      const metaPathname = new URL((document.querySelector("meta[property='og:url']") as HTMLMetaElement)?.content, location.href).pathname;
      if (!document.querySelector(".main > div")?.hasChildNodes() || metaPathname !== location.pathname) {
        setTimeout(apply, 500);
        return;
      }
    }

    addComponent(
      FormBuilder,
      document.querySelector(
        "div[class^=styles_pageWrapper]",
      ),
      "/?form/edit",
    );

    addComponent(
      PhoneFillInPage,
      document.querySelector(
        "div[class^=styles_pageWrapper]",
      ),
      "/?form/dQw4w9WgXcQ",
      sample,
    );

    addComponent(
      Results,
      document.querySelector(
        "div[class^=styles_pageWrapper]",
      ),
      "/?form/results",
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
      BannerButton,
      document.querySelector("[class*=bannerInner] [class*=content]"),
      "/categorie/teambuilding",
    );

    addComponent(SecretMenu, document.body);

    addComponent(FormBuilder, testElement, undefined, sample);
  }, 500);
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
    const fullPath = location.pathname + location.search;
    if (typeof path === "string") {
      if (!fullPath.startsWith(path)) {
        return;
      }
    } else if (!path.test(fullPath)) {
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
