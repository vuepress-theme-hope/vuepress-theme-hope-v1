import { getLocales } from "vuepress-shared";
import { resolve } from "path";
import { copyCodeLocales } from "./locales";

import type { Plugin } from "vuepress-typings";
import type { CopyCodeOptions } from "../types";

export const copyCodePlugin: Plugin<CopyCodeOptions> = (options, context) => {
  const PLUGIN_NAME = "vuepress-plugin-copy-code1";
  const userCopyCodeLocales = getLocales({
    context,
    name: PLUGIN_NAME,
    config: options.locales,
    default: copyCodeLocales,
  });

  delete options.locales;

  return {
    name: "vuepress-plugin-copy-code1",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: options,
      CODE_COPY_LOCALES: userCopyCodeLocales,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};
