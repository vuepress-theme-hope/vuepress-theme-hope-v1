import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { copyCodeLocales } from "./locales";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { CopyCodeOptions } from "../types";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, context) => {
  const copyCodeOptions =
    Object.keys(options).length > 0
      ? options
      : context.themeConfig.copyCode || {};

  const userCopyCodeLocales = getLocales(
    context,
    copyCodeLocales,
    copyCodeOptions.locales
  );

  delete copyCodeOptions.locales;

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: copyCodeOptions,
      CODE_COPY_LOCALES: userCopyCodeLocales,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};

export = copyCodePlugin;
