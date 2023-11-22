/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type Item = import("svelte-dnd-action").Item;
declare type DndEvent<ItemType = Item> = import("svelte-dnd-action").DndEvent<ItemType>;

declare type DndEventParameter = CustomEvent<DndEvent<ItemType>> & {target: EventTarget & T};

declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        "on:consider"?: (event: DndEventParameter) => void;
        "on:finalize"?: (event: DndEventParameter) => void;
    }
}
