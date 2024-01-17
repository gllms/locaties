import { writable } from "svelte/store";

function createSecretOptions() {
  const options: Record<string, any> = {};

  const saved = localStorage.getItem("secret-options");

  if (saved)
    Object.assign(options, JSON.parse(saved));

  const { subscribe, update } = writable(options);

  return {
    subscribe,
    set: ({ "[object Object]": _, ...args }: Record<string, string>) => {
      const key = Object.keys(args)[0];
      update((options) => {
        options[key] = args[key];
        localStorage.setItem("secret-options", JSON.stringify(options));
        return options;
      });
    },
  };
}

function createDialogCounter() {
  const { subscribe, update, set } = writable(0);

  return {
    subscribe,
    set: (value: number) => {
      set(value);
      document.body.style.overflow = value > 0 ? "hidden" : "";
    }
  };
}

export const secretOptions = createSecretOptions();
export const dialogCounter = createDialogCounter();

export const title = writable("");
export const description = writable("");
export const canvasItems = writable<CanvasItem[]>([]);
