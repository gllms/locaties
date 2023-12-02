import filters from "./filters";

import Date from "./lib/palette/Date.svelte";
import Filter from "./lib/palette/Filter.svelte";
import Long from "./lib/palette/Long.svelte";
import Short from "./lib/palette/Short.svelte";

let filterTypes: Record<string, PaletteItem> = {};

for (const [key, filter] of Object.entries(filters)) {
  filterTypes[key] = {
    name: filter.name,
    icon: filter.icon,
    category: "filters",
    component: Filter,
    args: { filter: key },
  };
}

const paletteTypes: Record<string, PaletteItem> = {
  date: {
    name: "Datum",
    icon: "date_range",
    category: "filters",
    component: Date,
  },
  ...filterTypes,
  shortText: {
    name: "Korte tekst",
    icon: "short_text",
    category: "open",
    component: Short,
  },
  longText: {
    name: "Lange tekst",
    icon: "notes",
    category: "open",
    component: Long,
  },
};

export default paletteTypes;