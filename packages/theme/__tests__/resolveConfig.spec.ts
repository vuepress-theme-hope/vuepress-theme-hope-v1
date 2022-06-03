import { describe, it, expect } from "vitest";
import { resolveVuePressConfig } from "../node/config";

import type { Config } from "@mr-hope/vuepress-types";
import type { HopeThemeConfig } from "../types";

describe("Test resolveTheme function", () => {
  const vuepressConfig: Config<HopeThemeConfig> = {
    title: "vuepress-theme-hope",
    description: "A vuepress theme with tons of features✨",

    dest: "./dist",

    locales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": { lang: "en-US" },
      "/zh/": {
        title: "vuepress-theme-hope",
        description: "一个具有强大功能的 vuepress 主题✨",
      },
    },

    themeConfig: {
      logo: "/logo.svg",
      hostname: "https://vuepress-theme-hope.github.io",

      author: "Mr.Hope",
      repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1",
      repoDisplay: false,
      docsDir: "docs/theme/src",

      nav: [
        { text: "Home", link: "/en/", icon: "home" },
        { text: "Guide", link: "/en/guide/", icon: "creative" },
        { text: "Config", link: "/en/config/", icon: "code" },
        {
          text: "Basic",
          icon: "info",
          items: [
            {
              text: "Markdown",
              link: "/en/basic/markdown/",
              icon: "markdown",
            },
            { text: "VuePress", link: "/en/basic/vuepress/", icon: "vue" },
          ],
        },
        {
          text: "Changelog",
          link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/CHANGELOG.md",
        },
      ],
      sidebar: {
        "/guide/": [
          {
            title: "Get Started",
            icon: "creative",
            children: ["", "install"],
          },
          {
            title: "Outlook",
            icon: "palette",
            children: ["navbar", "sidebar", "breadcrumb", "page"],
          },
          {
            title: "New Feature",
            icon: "palette",
            children: ["themecolor", "fullscreen", "comment", "component"],
          },
          {
            title: "Markdown Enhance",
            icon: "markdown",
            prefix: "markdown/",
            children: ["", "sup-sub", "footnote", "tex", "flowchart"],
          },
        ],

        "/config/": [
          "",
          "themeConfig",
          "page",
          "stylus",
          {
            title: "Plugin Config",
            prefix: "plugin/",
            icon: "extension",
            children: ["", "copyright", "medium-zoom", "pwa"],
          },
        ],

        // fallback
        "/basic/": [
          {
            title: "Markdown",
            prefix: "markdown/",
            icon: "markdown",
            children: ["", "demo", "emoji"],
          },
          {
            title: "VuePress",
            prefix: "vuepress/",
            icon: "vue",
            children: [
              "",
              "file",
              "plugin",
              "theme/",
              "theme/config",
              "command",
              "case",
            ],
          },
        ],

        // eslint-disable-next-line @typescript-eslint/naming-convention
        "/": ["", "guide/", "config/", "basic/"],
      },

      locales: {
        "/zh/": {
          nav: [
            { text: "主页", link: "/", icon: "home" },
            { text: "指南", link: "/guide/", icon: "creative" },
            { text: "配置", link: "/config/", icon: "code" },
            {
              text: "基础",
              icon: "info",
              items: [
                {
                  text: "Markdown",
                  link: "/basic/markdown/",
                  icon: "markdown",
                },
                { text: "VuePress", link: "/basic/vuepress/", icon: "vue" },
              ],
            },
            {
              text: "更新日志",
              link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/CHANGELOG.md",
            },
          ],
          sidebar: {
            "/zh/guide/": [
              {
                title: "快速上手",
                icon: "creative",
                children: ["", "install"],
              },
              {
                title: "外观",
                icon: "palette",
                children: ["navbar", "sidebar", "breadcrumb", "page"],
              },
              {
                title: "新增功能",
                icon: "palette",
                children: ["themecolor", "fullscreen", "comment", "component"],
              },
              {
                title: "Markdown 增强",
                icon: "markdown",
                prefix: "markdown/",
                children: ["", "sup-sub", "footnote", "tex", "flowchart"],
              },
            ],

            "/zh/config/": [
              "",
              "themeConfig",
              "page",
              "stylus",
              {
                title: "插件配置",
                prefix: "plugin/",
                icon: "extension",
                children: ["", "copyright", "medium-zoom", "pwa"],
              },
            ],

            // fallback
            "/zh/basic/": [
              {
                title: "Markdown",
                prefix: "markdown/",
                icon: "markdown",
                children: ["", "demo", "emoji"],
              },
              {
                title: "VuePress",
                prefix: "vuepress/",
                icon: "vue",
                children: [
                  "",
                  "file",
                  "plugin",
                  "theme/",
                  "theme/config",
                  "command",
                  "case",
                ],
              },
            ],

            "/zh/": ["", "guide/", "config/", "basic/"],
          },
        },
      },

      algolia: {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: "vuepress-theme-hope-v1",
      },

      footer: {
        display: true,
        copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
      },

      comment: {
        type: "valine",
        appId: "2vSLKb0SqFKKWEgrOPGy3sp1-gzGzoHsz",
        appKey: "vma8Ewk61WeNkI81O3CGpT2i",
      },

      git: {
        timezone: "Asia/Shanghai",
      },

      mdEnhance: {
        enableAll: true,
      },

      pwa: {
        favicon: "/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          icons: [
            {
              src: "/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              short_name: "Guide",
              url: "/guide/",
              icons: [
                {
                  src: "/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              short_name: "Config",
              url: "/config/",
              icons: [
                {
                  src: "/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Basic",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              short_name: "Basic",
              url: "/basic/",
              icons: [
                {
                  src: "/assets/icon/basic-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/assets/icon/basic-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },
    },
  };

  const resolvedConfig = resolveVuePressConfig(vuepressConfig);

  it("should resolve locates for vuepress", () => {
    expect(resolvedConfig.locales).toHaveProperty("/");
    expect(resolvedConfig.locales!["/"]).toHaveProperty("lang");
    expect(resolvedConfig.locales).toHaveProperty("/zh/");
    expect(resolvedConfig.locales!["/zh/"]).toHaveProperty("lang");
  });

  it("To have base option", () => {
    expect(resolvedConfig.base).toEqual("/");
  });

  it("Evergreen should be true since the default is changed", () => {
    expect(resolvedConfig.evergreen).toEqual(true);
  });

  it("Should use vuepress-theme-hope", () => {
    expect(resolvedConfig.theme).toEqual("hope");
  });
});
