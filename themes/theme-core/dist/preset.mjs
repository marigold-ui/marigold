import {
  colors,
  screens
} from "./chunk-YGIXVJQS.mjs";

// src/preset.ts
import { createPreset } from "@marigold/theme-preset";
var preset = createPreset("core", {
  corePlugins: {
    preflight: false
  },
  content: [
    "./node_modules/@marigold/theme-core/dist/**/*.js",
    "./node_modules/@marigold/system/dist/*.js",
    "./node_modules/@marigold/components/dist/*.js"
  ],
  theme: {
    extend: {
      screens,
      fontFamily: {
        body: "Arial, Helvetica, sans-serif"
      },
      fontSize: {
        body: "13px"
      },
      colors,
      transitionTimingFunction: {
        "ease-out": "ease-out"
      },
      // TODO: Remove gradient
      backgroundImage: {
        highlight: "linear-gradient(#3875d7 20%, #2a62bc 90%)"
      }
    }
  }
});
export {
  preset
};
//# sourceMappingURL=preset.mjs.map