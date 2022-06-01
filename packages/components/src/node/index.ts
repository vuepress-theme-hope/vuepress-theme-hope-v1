import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import {
  componentLocales,
  paginationLocales,
  pageInfoLocales,
} from "./locales";

import type { Plugin, PluginConfig } from "@mr-hope/vuepress-types";
import type { ComponentOptions } from "../types";

const noopModule = "@mr-hope/vuepress-shared/lib/esm/noopModule";

const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  const plugins: PluginConfig<unknown>[] = [];

  if (options.pageinfo)
    plugins.push(
      ["@mr-hope/git", true],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }]
    );

  return {
    name: "@mr-hope/vuepress-plugin-components",

    alias: {
      "@BackToTop": options.backToTop
        ? resolve(__dirname, "../client/BackToTop.vue")
        : noopModule,
      "@BreadCrumb": options.breadcrumb
        ? resolve(__dirname, "../client/BreadCrumb.vue")
        : noopModule,
      "@Badge": options.badge
        ? resolve(__dirname, "../client/Badge.vue")
        : noopModule,
      "@PageInfo": options.pageinfo
        ? resolve(__dirname, "../client/PageInfo.vue")
        : noopModule,
      "@Pagination": options.pagination
        ? resolve(__dirname, "../client/Pagination.vue")
        : noopModule,
      "@ScreenFull": options.screenFull
        ? resolve(__dirname, "../client/ScreenFull.vue")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP_THRESHOLD: options.backToTopThreshold || 300,
      COMPONENT_LOCALES: getLocales(context, componentLocales, options.locales),
      PAGE_INFO_LOCALES: getLocales(
        context,
        pageInfoLocales,
        options.pageInfoLocales
      ),
      PAGINATION_LOCALES: getLocales(
        context,
        paginationLocales,
        options.paginationLocales
      ),
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: options.backToTop ? "BackToTop" : [],

    plugins,
  };
};

export = componentPlugin;
