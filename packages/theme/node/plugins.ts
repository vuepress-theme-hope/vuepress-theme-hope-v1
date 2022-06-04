import { resolve } from "path";

import { cleanUrlPlugin } from "./clean-url";
import { chunkRenamePlugin } from "./chunk-rename";

import type { AddThisOptions } from "vuepress-plugin-add-this";
import type { CommentOptions } from "vuepress-plugin-comment1";
import type { ComponentOptions } from "@mr-hope/vuepress-plugin-components";
import type { CopyCodeOptions } from "vuepress-plugin-copy-code1";
import type { FeedOptions } from "vuepress-plugin-feed1";
import type { PWAOptions } from "vuepress-plugin-pwa1";
import type { SeoOptions } from "vuepress-plugin-seo1";
import type { SitemapOptions } from "vuepress-plugin-sitemap1";
import type { SmoothScrollOptions } from "@mr-hope/vuepress-plugin-smooth-scroll";
import type { PluginConfig } from "vuepress-typings";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import type { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import type { ResolvedHopeThemeConfig } from "../types";

const resolveAddThisOptions = (
  themeConfig: ResolvedHopeThemeConfig
): AddThisOptions | false => {
  const { addThis } = themeConfig;

  return typeof addThis === "string" ? { pubid: addThis } : false;
};

const resolveCommentOptions = (
  themeConfig: ResolvedHopeThemeConfig
): CommentOptions | false => {
  return themeConfig.comment === false
    ? false
    : {
        provider: "None",
        ...(themeConfig.comment?.provider === "Waline"
          ? { dark: "html.dark" }
          : {}),
        ...(themeConfig.comment || null),
      };
};

const resolveComponentsOptions = (
  themeConfig: ResolvedHopeThemeConfig
): ComponentOptions => ({
  ...(themeConfig.components || null),
  backToTop: themeConfig.backToTop !== false,
  backToTopThreshold:
    typeof themeConfig.backToTop === "number" ? themeConfig.backToTop : 300,
  breadcrumb: true,
  badge: true,
  pageinfo: true,
  pagination: true,
  screenFull: true,
});

const resolveCopyCodeOptions = (
  themeConfig: ResolvedHopeThemeConfig
): CopyCodeOptions | false =>
  themeConfig.copyCode === false ? false : themeConfig.copyCode || {};

const resolveFeedOptions = (
  themeConfig: ResolvedHopeThemeConfig
): FeedOptions | false => {
  return themeConfig.feed === false
    ? false
    : {
        hostname: themeConfig.hostname || "",
        ...themeConfig.feed,
        channel: {
          ...(themeConfig.author
            ? { author: { name: themeConfig.author } }
            : {}),
          copyright: themeConfig.footer.copyright || "",
          ...(themeConfig.feed?.channel || null),
        },
      };
};

const resolveMarkdownEnhanceOptions = (
  themeConfig: ResolvedHopeThemeConfig
): MarkdownEnhanceOptions => ({
  container: true,
  ...(themeConfig.mdEnhance || {}),
});

const resolvePhotoSwipeOptions = (
  themeConfig: ResolvedHopeThemeConfig
): PhotoSwipeOptions | false =>
  themeConfig.photoSwipe === false ? false : themeConfig.photoSwipe || {};

const resolvePwaOptions = (
  themeConfig: ResolvedHopeThemeConfig
): PWAOptions | false =>
  themeConfig.pwa === false ? false : themeConfig.pwa || {};

const resolveSeoOptions = (
  themeConfig: ResolvedHopeThemeConfig
): SeoOptions | false =>
  themeConfig.seo === false
    ? false
    : {
        hostname: themeConfig.hostname || "",
        ...(themeConfig.author ? { author: themeConfig.author } : {}),
        ...themeConfig.seo,
      };

const resolveSitemapOptions = (
  themeConfig: ResolvedHopeThemeConfig
): SitemapOptions | false =>
  themeConfig.sitemap === false
    ? false
    : { hostname: themeConfig.hostname || "", ...themeConfig.sitemap };

const resolveSmmothScrollOptions = (
  themeConfig: ResolvedHopeThemeConfig
): SmoothScrollOptions | false =>
  themeConfig.smoothScroll === false
    ? false
    : typeof themeConfig.smoothScroll === "number"
    ? { delay: themeConfig.smoothScroll }
    : { delay: 500, ...(themeConfig.smoothScroll || {}) };

export const getPluginConfig = (
  themeConfig: ResolvedHopeThemeConfig
): PluginConfig[] => {
  // set author for comment plugin
  if (themeConfig.comment && themeConfig.author)
    themeConfig.comment.author = themeConfig.author;

  return [
    ["comment1", resolveCommentOptions(themeConfig)],

    ["@mr-hope/components", resolveComponentsOptions(themeConfig)],

    ["feed1", resolveFeedOptions(themeConfig)],

    ["@mr-hope/git", themeConfig.git],

    ["pwa1", resolvePwaOptions(themeConfig)],

    ["seo1", resolveSeoOptions(themeConfig)],

    ["sitemap1", resolveSitemapOptions(themeConfig)],

    ["@mr-hope/smooth-scroll", resolveSmmothScrollOptions(themeConfig)],

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

    ["md-enhance", resolveMarkdownEnhanceOptions(themeConfig)],

    ["copy-code1", resolveCopyCodeOptions(themeConfig)],

    ["photo-swipe", resolvePhotoSwipeOptions(themeConfig)],

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
