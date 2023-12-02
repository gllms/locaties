declare type DndEventParameter = CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T };

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    "on:consider"?: (event: DndEventParameter) => void;
    "on:finalize"?: (event: DndEventParameter) => void;
  }
}

interface State {
  title: string;
  description: string;
  canvasItems: CanvasItem[];
}

interface PaletteItem {
  name: string;
  icon: string;
  category: "filters" | "open";
  component: new (...args: any[]) => SvelteComponent;
  args?: object;
}

interface CanvasItem {
  id: number;
  paletteType: string;
  data: object;
  isDndShadowItem?: boolean;
}
