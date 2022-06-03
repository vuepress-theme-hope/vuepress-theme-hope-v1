import { getLocales, noopModule } from "vuepress-shared";
import { resolve } from "path";
import { covertOptions } from "./compact";
import { walineLocales, valineLocales } from "./locales";

import type { Plugin, PluginEntry } from "vuepress-typings";
import type { CommentOptions } from "../types";

export const commentPlugin: Plugin<CommentOptions> = (options, context) => {
  covertOptions(options as CommentOptions & Record<string, unknown>);

  const PLUGIN_NAME = "vuepress-plugin-comment1";
  const userValineLocales =
    options.provider === "Valine"
      ? getLocales({
          context,
          config: options.valineLocales,
          default: valineLocales,
          name: PLUGIN_NAME,
        })
      : {};
  const userWalineLocales =
    options.provider === "Waline"
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
        options.provider === "Giscus"
          ? resolve(__dirname, "../client/components/Giscus.js")
          : options.provider === "Waline"
          ? resolve(__dirname, "../client/components/Waline.js")
          : options.provider === "Valine"
          ? resolve(__dirname, "../client/components/Valine.vue")
          : options.provider === "Twikoo"
          ? resolve(__dirname, "../client/components/Twikoo.js")
          : options.provider === "Vssue"
          ? resolve(__dirname, "../client/components/Vssue.js")
          : noopModule,
    },

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),
  };

  if (options.provider === "Vssue")
    config.plugins = [["@vssue/vuepress-plugin-vssue", options]];

  return config;
};
