import { resolve } from "path";
import type { Plugin } from "vuepress-typings";
import type { SmoothScrollOptions } from "../types";

const smoothScrollPlugin: Plugin<SmoothScrollOptions> = (options) => ({
  name: "@mr-hope/smooth-scroll",

  define: (): Record<string, unknown> => ({
    SMOOTH_SCROLL_DELAY: options.delay || 0,
  }),

  enhanceAppFiles: resolve(__dirname, "../client/enhanceApp.js"),
});

export = smoothScrollPlugin;
