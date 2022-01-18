import { getLocales } from "@mr-hope/vuepress-shared";
import { resolve } from "path";
import { pageInfoLocales, walineLocales, valineLocales } from "./locales";

import type { CommentOptions } from "../types";
import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";

const commentPlugin: Plugin<CommentOptions> = (options, context) => {
  const { themeConfig } = context;
  const commentOptions: CommentOptions =
    Object.keys(options).length > 0
      ? options
      : themeConfig.comment || { type: "disable" };

  const userPageInfoLocales = getLocales(
    context,
    pageInfoLocales,
    commentOptions.pageInfoLocales
  );
  const userWalineLocales =
    commentOptions.type === "waline"
      ? getLocales(context, walineLocales, commentOptions.walineLocales)
      : {};
  const userValineLocales =
    commentOptions.type === "valine"
      ? getLocales(context, valineLocales, commentOptions.valineLocales)
      : {};

  // remove locales so that they won't be injected in client twice
  delete commentOptions.pageInfoLocales;
  if ("walineLocales" in commentOptions) delete commentOptions.walineLocales;
  if ("valineLocales" in commentOptions) delete commentOptions.valineLocales;

  const config: PluginOptionAPI = {
    name: "comment",

    define: (): Record<string, unknown> => ({
      COMMENT_OPTIONS: commentOptions,
      PAGE_INFO_LOCALES: userPageInfoLocales,
      WALINE_LOCALES: userWalineLocales,
      VALINE_LOCALES: userValineLocales,
    }),

    alias: {
      "@Valine":
        commentOptions.type === "valine"
          ? resolve(__dirname, "../client/Valine.vue")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Waline":
        commentOptions.type === "waline"
          ? resolve(__dirname, "../client/Waline.vue")
          : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    plugins: [
      ["@mr-hope/git", themeConfig.git || true],
      ["@mr-hope/reading-time", { wordPerminute: options.wordPerminute }],
    ],
  };

  if (commentOptions.type === "vssue")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.plugins!.push(["@vssue/vuepress-plugin-vssue", commentOptions]);

  return config;
};

export = commentPlugin;
