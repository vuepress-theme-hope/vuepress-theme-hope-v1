import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { covertWalineOptions } from "./compact";
import { walineLocales, valineLocales } from "./locales";

import type { CommentOptions, WalineOptions } from "../types";
import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";

export const commentPlugin: Plugin<CommentOptions> = (options, context) => {
  // FIXME: This is a compact cod
  if (options.type === "waline")
    covertWalineOptions(options as WalineOptions & Record<string, unknown>);

  const userValineLocales =
    options.type === "valine"
      ? getLocales(context, valineLocales, options.valineLocales)
      : {};
  const userWalineLocales =
    options.type === "waline"
      ? getLocales(context, walineLocales, options.walineLocales)
      : {};

  // remove locales so that they won't be injected in client twice
  if ("valineLocales" in options) delete options.valineLocales;
  if ("walineLocales" in options) delete options.walineLocales;

  const config: PluginOptionAPI = {
    name: "@mr-hope/vuepress-plugin-comment",

    define: (): Record<string, unknown> => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
      VALINE_LOCALES: userValineLocales,
    }),

    alias: {
      "@CommentProvider":
        options.type === "valine"
          ? resolve(__dirname, "../client/Valine.vue")
          : options.type === "waline"
          ? resolve(__dirname, "../client/Waline.vue")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
  };

  if (options.type === "vssue")
    config.plugins = [["@vssue/vuepress-plugin-vssue", options]];

  return config;
};
