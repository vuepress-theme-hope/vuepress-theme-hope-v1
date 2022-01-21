import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import {
  componentLocales,
  paginationLocales,
  pageInfoLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "@mr-hope/vuepress-types";
import type { ComponentOptions } from "../types";

const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  const plugins: PluginConfig<unknown>[] = [];

  if (options.pageinfo)
    plugins.push(
      ["@mr-hope/git", true],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }]
    );

  return {
    name: "@mr-hope/vuepress-plugin-components",

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP: options.backToTop,
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      BREADCRUMB: options.breadcrumb,
      BADGE: options.badge,
      COMPONENT_LOCALES: getLocales(context, componentLocales, options.locales),
      PAGE_INFO: options.pageinfo,
      PAGINATION: options.pagination,
      PAGINATION_LOCALES: getLocales(
        context,
        paginationLocales,
        options.paginationLocales
      ),
      PAGE_INFO_LOCALES: getLocales(
        context,
        pageInfoLocales,
        options.pageInfoLocales
      ),
      SCREEN_FULL: options.screenFull,
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: options.backToTop ? "BackToTop" : undefined,

    plugins,
  };
};

export = componentPlugin;
