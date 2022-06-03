import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { photoSwipeLocales } from "./locales";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { PhotoSwipeOptions } from "../types";

export const photoSwipePlugin: Plugin<PhotoSwipeOptions> = (
  options,
  context
) => {
  const PLUGIN_NAME = "vuepress-plugin-photo-swipe";

  return {
    name: PLUGIN_NAME,

    define: (): Record<string, unknown> => ({
      PHOTO_SWIPE_SELECTOR:
        options.selector || ".theme-default-content :not(a) > img",
      PHOTO_SWIPE_DELAY: options.delay || 500,
      PHOTO_SWIPE_OPTIONS: options.options || {},
      PHOTO_SWIPE_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.locales,
        default: photoSwipeLocales,
      }),
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: "PhotoSwipe",
  };
};
