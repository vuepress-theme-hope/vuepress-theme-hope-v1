import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import {
  componentLocales,
  paginationLocales,
  pageInfoLocales,
} from "./locales";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { ComponentOptions } from "../types";

const componentPlugin: Plugin<ComponentOptions> = (options, context) => {
  return {
    name: "@mr-hope/vuepress-plugin-components",

    define: (): Record<string, unknown> => ({
      BACK_TO_TOP:
        options.backToTop === false ? false : options.backToTop || 300,
      COMPONENT_LOCALES: getLocales(context, componentLocales, options.locales),
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
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: "BackToTop",
  };
};

export = componentPlugin;
