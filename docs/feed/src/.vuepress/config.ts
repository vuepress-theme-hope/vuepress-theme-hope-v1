import hope from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

export default hope.config({
  title: "Feed Generator",
  description: "Feed Plugin for vuepress",

  base: "/v1/feed/",
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      lang: "zh-CN",
      title: "Feed 生成器",
      description: "VuePress Feed 插件",
    },
  },

  /** 主题配置 */
  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://vuepress-theme-hope.github.io",

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/feed/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      {
        text: "Guide",
        icon: "creative",
        link: "/guide/",
      },
      {
        text: "Config",
        icon: "config",
        link: "/config/",
      },
      {
        text: version,
        icon: "note",
        items: [
          {
            text: "V2 Docs",
            link: "https://vuepress-theme-hope.github.io/v2/feed/",
          },
        ],
      },
    ],

    sidebar: {
      "/": [
        "",
        "guide",
        {
          title: "Config",
          icon: "config",
          prefix: "config/",
          collapsable: false,
          children: ["", "channel", "item"],
        },
      ],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide/",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config/",
          },
          {
            text: version,
            icon: "note",
            items: [
              {
                text: "V2 文档",
                link: "https://vuepress-theme-hope.github.io/v2/feed/zh/",
              },
            ],
          },
        ],

        sidebar: {
          "/zh/": [
            "",
            "guide",
            {
              title: "配置",
              icon: "config",
              prefix: "config/",
              collapsable: false,
              children: ["", "channel", "item"],
            },
          ],
        },
      },
    },

    blog: false,

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
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      container: true,
    },

    pwa: {
      favicon: "/feed/favicon.ico",
      themeColor: "#46bd87",
      cachePic: true,
      apple: {
        icon: "/feed/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/feed/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "@mr-hope/vuepress-plugin-feed",
        short_name: "feed plugin",
        icons: [
          {
            src: "/feed/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/feed/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/feed/guide/",
            icons: [
              {
                src: "/feed/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/feed/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
          {
            name: "Config",
            short_name: "Config",
            url: "/feed/config/",
            icons: [
              {
                src: "/feed/assets/icon/config-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/feed/assets/icon/config-monochrome.png",
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

  plugins: [{ globalUIComponents: ["V2Notice"] }],
});
