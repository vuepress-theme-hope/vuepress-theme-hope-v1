import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { pageInfoLocales, walineLocales, valineLocales } from "./locales";

import type { CommentOptions } from "../types";
import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";

const commentPlugin: Plugin<CommentOptions> = (options, context) => {
  const userPageInfoLocales = getLocales(
    context,
    pageInfoLocales,
    options.pageInfoLocales
  );
  const userWalineLocales =
    options.type === "waline"
      ? getLocales(context, walineLocales, options.walineLocales)
      : {};
  const userValineLocales =
    options.type === "valine"
      ? getLocales(context, valineLocales, options.valineLocales)
      : {};

  // remove locales so that they won't be injected in client twice
  delete options.pageInfoLocales;
  if ("walineLocales" in options) delete options.walineLocales;
  if ("valineLocales" in options) delete options.valineLocales;

  const config: PluginOptionAPI = {
    name: "comment",

    define: (): Record<string, unknown> => ({
      COMMENT_OPTIONS: options,
      PAGE_INFO_LOCALES: userPageInfoLocales,
      WALINE_LOCALES: userWalineLocales,
      VALINE_LOCALES: userValineLocales,
    }),

    alias: {
      "@Valine":
        options.type === "valine"
          ? resolve(__dirname, "../client/Valine.vue")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Waline":
        options.type === "waline"
          ? resolve(__dirname, "../client/Waline.vue")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    plugins: [
      ["@mr-hope/git", true],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
    ],
  };

  if (options.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(["@vssue/vuepress-plugin-vssue", options]);

  return config;
};

export = commentPlugin;
