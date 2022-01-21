import { resolve } from "path";

import { cleanUrlPlugin } from "./clean-url";
import { chunkRenamePlugin } from "./chunk-rename";

import type { CommentOptions } from "@mr-hope/vuepress-plugin-comment";
import type { PluginConfig } from "@mr-hope/vuepress-types";
import type { ResolvedHopeThemeConfig } from "../types";

const resolveAddThisOptions = (
  themeConfig: ResolvedHopeThemeConfig
): string | false => {
  const { addThis } = themeConfig;

  return typeof addThis === "string" ? addThis : false;
};

const resolveCommentOptions = (
  themeConfig: ResolvedHopeThemeConfig
): CommentOptions => {
  return {
    type: "disable",
    pageInfo: themeConfig.pageInfo,
    titleIcon: true,
    titleIconPrefix: themeConfig.iconPrefix,
    ...(themeConfig.comment || null),
    categoryPath: "/category/$category/",
    tagPath: "/tag/$tag/",
  };
};

export const getPluginConfig = (
  themeConfig: ResolvedHopeThemeConfig
): PluginConfig[] => {
  // set author for comment plugin
  if (themeConfig.comment && themeConfig.author)
    themeConfig.comment.author = themeConfig.author;

  return [
    ["@mr-hope/comment", resolveCommentOptions(themeConfig)],

    ["@mr-hope/components"],

    ["@mr-hope/feed", themeConfig.feed],

    ["@mr-hope/git", themeConfig.git],

    ["@mr-hope/pwa", themeConfig.pwa],

    ["@mr-hope/seo", themeConfig.seo],

    ["@mr-hope/sitemap", themeConfig.sitemap],

    [
      "@mr-hope/smooth-scroll",
      themeConfig.smoothScroll === false
        ? false
        : typeof themeConfig.smoothScroll === "number"
        ? { delay: themeConfig.smoothScroll }
        : themeConfig.smoothScroll || { delay: 500 },
    ],

    [
      "@vuepress/blog",
      themeConfig.blog === false
        ? false
        : {
            frontmatters: [
              {
                id: "tag",
                keys: ["tag", "tags"],
                path: "/tag/",
                layout: "Blog",
                scopeLayout: "Blog",
              },
              {
                id: "category",
                keys: ["category", "categories"],
                path: "/category/",
                layout: "Blog",
                scopeLayout: "Blog",
              },
            ],
          },
    ],
    ["@vuepress/last-updated", false],

    "@vuepress/nprogress",

    [
      "@vuepress/search",
      {
        searchMaxSuggestions: themeConfig.searchMaxSuggestions || 10,
      },
    ],

    ["active-hash", themeConfig.activeHash],

    ["add-this", resolveAddThisOptions(themeConfig)],

    [
      "copyright",
      typeof themeConfig.copyright === "object"
        ? {
            minLength: 100,
            disable: themeConfig.copyright.status === "local",
            clipboardComponent: resolve(
              __dirname,
              "../components/Clipboard.vue"
            ),
            ...themeConfig.copyright,
          }
        : false,
    ],

    ["md-enhance", themeConfig.mdEnhance || {}],

    ["@mr-hope/copy-code", themeConfig.copyCode],

    ["photo-swipe", themeConfig.photoSwipe],

    [
      "typescript",
      themeConfig.typescript
        ? {
            tsLoaderOptions:
              typeof themeConfig.typescript === "object"
                ? themeConfig.typescript
                : {},
          }
        : false,
    ],

    [
      cleanUrlPlugin,
      themeConfig.cleanUrl === false
        ? false
        : themeConfig.cleanUrl || { normalSuffix: "/" },
    ],

    [
      chunkRenamePlugin,
      themeConfig.chunkRename === false ? false : themeConfig.chunkRename,
    ],
  ];
};
