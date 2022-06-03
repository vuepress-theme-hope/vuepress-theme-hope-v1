import { getLocales } from "vuepress-shared";
import { resolve } from "path";
import { copyCodeLocales } from "./locales";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { CopyCodeOptions } from "../types";

export const copyCodePlugin: Plugin<CopyCodeOptions> = (options, context) => {
  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-copy-code";
  const userCopyCodeLocales = getLocales({
    context,
    name: PLUGIN_NAME,
    config: options.locales,
    default: copyCodeLocales,
  });

  delete options.locales;

  return {
    name: "@mr-hope/vuepress-plugin-copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: options,
      CODE_COPY_LOCALES: userCopyCodeLocales,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};
