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

export const secretOptions = createSecretOptions();

export const title = writable("");
export const description = writable("");
export const canvasItems = writable<CanvasItem[]>([]);