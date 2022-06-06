import { getLocales, noopModule, path } from "vuepress-shared";
import { backToTopLocales, externallinkLocales } from "./locales";
import { getIconPrefix } from "./utils";

import type { Plugin } from "vuepress-typings";
import type { ComponentOptions } from "../types";

export const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-components";

  return {
    name: PLUGIN_NAME,

    alias: {
      "@BackToTop": options.backToTop
        ? path.resolve(__dirname, "../client/components/BackToTop.vue")
        : noopModule,
      "@Badge": options.components?.includes("Badge")
        ? path.resolve(__dirname, "../client/components/Badge.vue")
        : noopModule,
      "@ExternalLinkIcon": options.components?.includes("ExternalLinkIcon")
        ? path.resolve(__dirname, "../client/components/ExternalLinkIcon.js")
        : noopModule,
      "@FontIcon": options.components?.includes("FontIcon")
        ? path.resolve(__dirname, "../client/components/FontIcon.js")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP_THRESHOLD:
        typeof options.backToTop === "number" ? options.backToTop : 300,
      BACK_TO_TOP_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        default: backToTopLocales,
        config: options.backToTopLocales,
      }),
      EXTERNAL_LINK_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        default: externallinkLocales,
        config: options.externalLinkLocales,
      }),
      ICON_PREFIX:
        typeof options.iconPrefix === "string"
          ? options.iconPrefix
          : getIconPrefix(options.iconAssets),
    }),

    enhanceAppFiles: path.resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: options.backToTop ? "BackToTop" : [],
  };
};
