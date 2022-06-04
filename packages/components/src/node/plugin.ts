import { getLocales, noopModule, path } from "vuepress-shared";
import {
  componentLocales,
  paginationLocales,
  pageInfoLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "vuepress-typings";
import type { ComponentOptions } from "../types";

export const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  const plugins: PluginConfig<unknown>[] = [];

  if (options.pageinfo)
    plugins.push(
      ["@mr-hope/git", true],
      ["reading-time1", { wordPerminute: options.wordPerminute }]
    );

  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-components";

  return {
    name: PLUGIN_NAME,

    alias: {
      "@BackToTop": options.backToTop
        ? path.resolve(__dirname, "../client/BackToTop.vue")
        : noopModule,
      "@BreadCrumb": options.breadcrumb
        ? path.resolve(__dirname, "../client/BreadCrumb.vue")
        : noopModule,
      "@Badge": options.badge
        ? path.resolve(__dirname, "../client/Badge.vue")
        : noopModule,
      "@PageInfo": options.pageinfo
        ? path.resolve(__dirname, "../client/PageInfo.vue")
        : noopModule,
      "@Pagination": options.pagination
        ? path.resolve(__dirname, "../client/Pagination.vue")
        : noopModule,
      "@ScreenFull": options.screenFull
        ? path.resolve(__dirname, "../client/ScreenFull.vue")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      COMPONENT_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        default: componentLocales,
        config: options.locales,
      }),
      PAGE_INFO_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.pageInfoLocales,
        default: pageInfoLocales,
      }),
      PAGINATION_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.paginationLocales,
        default: paginationLocales,
      }),
    }),

    enhanceAppFiles: path.resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: options.backToTop ? "BackToTop" : [],

    plugins,
  };
};
