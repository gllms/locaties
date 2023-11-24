import { defineConfig, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetUno } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  autocomplete: {
    shorthands: {
      num: "(05|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|26|28|30)",
    },
  },
  theme: {
    colors: {
      white: "#fff",
      grey: {
        900: "#000",
        800: "#565759",
        700: "#6f7073",
        600: "#88898c",
        500: "#a0a2a6",
        400: "#bbbcbf",
        300: "#d7d7d9",
        200: "#f2f3f5",
        100: "#fff",
      },
      primary: {
        900: "#003e54",
        800: "#064c6b",
        600: "#016d8c",
        400: "#b0e5f4",
        200: "#e8f9fe",
      },
      secondary: {
        900: "#a86946",
        800: "#d7855a",
        600: "#e5a484",
        400: "#fbd5c3",
        200: "#ffefe8",
      },
      tertiary: {
        800: "#aa804a",
        600: "#d7ae7a",
      },
      quarternary: {
        800: "#918c63",
        600: "#c4c1a1",
      },
      quinary: {
        500: "#3fb9a3",
      },
      septenary: {
        800: "#776294",
        600: "#cabce1",
      },
    },
    spacing: {
      "05": "0.2rem",
      1: "0.4rem",
      2: "0.8rem",
      3: "1.2rem",
      4: "1.6rem",
      5: "2rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4rem",
      11: "4.4rem",
      12: "4.8rem",
      13: "5.2rem",
      14: "5.6rem",
      15: "6rem",
      16: "6.4rem",
      17: "6.8rem",
      18: "7.2rem",
      19: "7.6rem",
      20: "8rem",
      21: "8.4rem",
      22: "8.8rem",
      23: "9.2rem",
      24: "9.6rem",
      26: "10.4rem",
      28: "11.2rem",
      30: "12rem",
    },
    fontFamily: {
      primary: '"Graphik Web",sans-serif',
      secondary: '"Kobe",sans-serif',
      "material-filled": '"Material Icons",sans-serif',
      "material-outlined": '"Material Icons Outlined",sans-serif',
    },
    borderRadius: {
      "05": "0.2rem",
      1: "0.4rem",
      2: "0.8rem",
      3: "1.2rem",
      4: "1.6rem",
    },
  }
});
