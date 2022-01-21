import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { copyCodeLocales } from "./locales";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { CopyCodeOptions } from "../types";

const copyCodePlugin: Plugin<CopyCodeOptions> = (options, context) => {
  const userCopyCodeLocales = getLocales(
    context,
    copyCodeLocales,
    options.locales
  );

  delete options.locales;

  return {
    name: "copy-code",

    define: (): Record<string, unknown> => ({
      CODE_COPY_OPIONS: options,
      CODE_COPY_LOCALES: userCopyCodeLocales,
    }),

    clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
  };
};

export = copyCodePlugin;
