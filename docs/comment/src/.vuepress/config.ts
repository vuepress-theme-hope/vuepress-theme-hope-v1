import hope from "vuepress-theme-hope";
import { version } from "../../../../lerna.json";

const base = process.env.BASE || "/";
const hostname =
  process.env.HOSTNAME || "https://vuepress-theme-hope-v1.netlify.app";

export default hope.config({
  title: "Comment Plugin",
  description: "Comment Plugin for VuePress",

  base: `${base}comment/`,
  dest: "./dist",

  locales: {
    "/": { lang: "en-US" },
    "/zh/": {
      lang: "zh-CN",
      title: "评论插件",
      description: "VuePress 的评论插件",
    },
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname,

    author: "Mr.Hope",
    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
    docsBranch: "v1",
    docsDir: "docs/comment/src",

    nav: [
      { text: "Home", icon: "home", link: "/" },
      {
        text: "Guide",
        icon: "creative",
        items: [
          {
            text: "Guide",
            icon: "creative",
            link: "/guide/",
          },
          { text: "Waline", icon: "waline", link: "/guide/waline.html" },
          { text: "Vssue", icon: "vssue", link: "/guide/vssue.html" },
          { text: "Valine", icon: "valine", link: "/guide/valine.html" },
        ],
      },
      {
        text: "Config",
        icon: "config",
        items: [
          { text: "Config", icon: "config", link: "/config/" },
          {
            text: "Waline",
            icon: "waline",
            link: "/config/waline.html",
          },
          { text: "Vssue", icon: "vssue", link: "/config/vssue.html" },
          {
            text: "Valine",
            icon: "valine",
            link: "/config/valine.html",
          },
        ],
      },
      {
        text: version,
        icon: "note",
        items: [
          {
            text: "V2 Docs",
            link: "https://vuepress-theme-hope.github.io/v2/comment/",
          },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        "",
        "waline",
        {
          title: "Vssue",
          icon: "vssue",
          collapsable: false,
          children: [
            "vssue",
            {
              title: "Supported platforms",
              icon: "support",
              collapsable: false,
              children: [
                "supported-platforms",
                "github",
                "gitlab",
                "gitee",
                "bitbucket",
              ],
            },
          ],
        },
        "valine",
      ],
      "/config/": ["", "waline", "vssue", "valine"],
      "/": ["guide/", "config/"],
    },

    locales: {
      "/zh/": {
        nav: [
          { text: "主页", icon: "home", link: "/zh/" },
          {
            text: "指南",
            icon: "creative",
            items: [
              {
                text: "指南",
                icon: "creative",
                link: "/zh/guide/",
              },
              { text: "Waline", icon: "waline", link: "/zh/guide/waline.html" },
              { text: "Vssue", icon: "vssue", link: "/zh/guide/vssue.html" },
              { text: "Valine", icon: "valine", link: "/zh/guide/valine.html" },
            ],
          },
          {
            text: "配置",
            icon: "config",
            items: [
              { text: "配置", icon: "config", link: "/zh/config/" },
              {
                text: "Waline",
                icon: "waline",
                link: "/zh/config/waline.html",
              },
              { text: "Vssue", icon: "vssue", link: "/zh/config/vssue.html" },
              {
                text: "Valine",
                icon: "valine",
                link: "/zh/config/valine.html",
              },
            ],
          },
          {
            text: version,
            icon: "note",
            items: [
              {
                text: "V2 文档",
                link: "https://vuepress-theme-hope.github.io/v2/comment/zh/",
              },
            ],
          },
        ],

        sidebar: {
          "/zh/guide/": [
            "",
            "waline",
            {
              title: "Vssue",
              icon: "vssue",
              collapsable: false,
              children: [
                "vssue",
                {
                  title: "支持平台",
                  icon: "support",
                  collapsable: false,
                  children: [
                    "supported-platforms",
                    "github",
                    "gitlab",
                    "gitee",
                    "bitbucket",
                  ],
                },
              ],
            },
            "valine",
          ],
          "/zh/config/": ["", "waline", "vssue", "valine"],
          "/zh/": ["guide/", "config/"],
        },
      },
    },

    blog: false,

    footer: {
      display: true,
      copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    },

    comment: {
      type: "waline",
      serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    cleanUrl: false,

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      codegroup: true,
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
        name: "@mr-hope/vuepress-plugin-comment",
        short_name: "comment plugin",
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
        ],
      },
      appendBase: true,
    },
  },

  plugins: [{ globalUIComponents: ["V2Notice"] }],
});
