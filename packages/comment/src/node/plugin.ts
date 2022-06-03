import { getLocales, noopModule } from "vuepress-shared";
import { resolve } from "path";
import { covertWalineOptions } from "./compact";
import { walineLocales, valineLocales } from "./locales";

import type { CommentOptions, WalineOptions } from "../types";
import type { Plugin, PluginEntry } from "@mr-hope/vuepress-types";

export const commentPlugin: Plugin<CommentOptions> = (options, context) => {
  // FIXME: This is a compact code
  if (options.type === "waline")
    covertWalineOptions(options as WalineOptions & Record<string, unknown>);

  const PLUGIN_NAME = "vuepress-plugin-comment1";
  const userValineLocales =
    options.type === "valine"
      ? getLocales({
          context,
          config: options.valineLocales,
          default: valineLocales,
          name: PLUGIN_NAME,
        })
      : {};
  const userWalineLocales =
    options.type === "waline"
      ? getLocales({
          context,
          config: options.walineLocales,
          default: walineLocales,
          name: PLUGIN_NAME,
        })
      : {};

  // remove locales so that they won't be injected in client twice
  if ("valineLocales" in options) delete options.valineLocales;
  if ("walineLocales" in options) delete options.walineLocales;

  const config: PluginEntry = {
    name: PLUGIN_NAME,

    define: (): Record<string, unknown> => ({
      COMMENT_OPTIONS: options,
      WALINE_LOCALES: userWalineLocales,
      VALINE_LOCALES: userValineLocales,
    }),

    alias: {
      "@CommentService":
        options.type === "valine"
          ? resolve(__dirname, "../client/components/Valine.vue")
          : options.type === "waline"
          ? resolve(__dirname, "../client/components/Waline.vue")
          : options.type === "vssue"
          ? resolve(__dirname, "../client/components/Vssue.js")
          : noopModule,
    },

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
  };

  if (options.type === "vssue")
    config.plugins = [["@vssue/vuepress-plugin-vssue", options]];

  return config;
};
