import hope from "vuepress-theme-hope";

export default {
  en: hope.sidebarConfig({
    "/guide/": [
      {
        title: "Get Started",
        icon: "creative",
        prefix: "get-started/",
        collapsable: false,
        children: ["intro", "install", "markdown"],
      },
      {
        title: "Interface",
        icon: "palette",
        prefix: "interface/",
        collapsable: false,
        children: [
          "darkmode",
          "theme-color",
          "icon",
          "accessibility",
          "others",
        ],
      },
      {
        title: "Layout",
        icon: "layout",
        prefix: "layout/",
        collapsable: false,
        children: [
          "navbar",
          "sidebar",
          {
            title: "Page",
            icon: "page",
            collapsable: false,
            children: ["page", "breadcrumb", "footer"],
          },
          "home",
          "slides",
          "custom",
        ],
      },
      {
        title: "Markdown enhance",
        icon: "markdown",
        prefix: "markdown/",
        collapsable: false,
        children: [
          "intro",
          "container",
          "components",
          "code-group",
          "align",
          "sup-sub",
          "footnote",
          "mark",
          "tasklist",
          "tex",
          "flowchart",
          "mermaid",
          "demo",
          "presentation",
          "external",
        ],
      },
      {
        title: "Features",
        icon: "discover",
        prefix: "feature/",
        collapsable: false,
        children: [
          "page-info",
          "comment",
          "copy-code",
          "photo-swipe",
          "copyright",
          "git",
          "encrypt",
          "pwa",
          "feed",
          "seo",
          "sitemap",
          "typescript",
        ],
      },
      {
        title: "Blog",
        icon: "layout",
        prefix: "blog/",
        collapsable: false,
        children: ["intro", "article", "category-and-tags", "timeline", "home"],
      },
      "eject",
    ],

    "/config/": [
      {
        title: "ThemeConfig",
        icon: "config",
        prefix: "theme/",
        collapsable: false,
        children: ["", "default", "feature", "plugin", "apperance"],
      },
      "page",
      "stylus",
      "i18n",
      {
        title: "Plugins",
        icon: "plugin",
        prefix: "plugin/",
        collapsable: false,
        children: ["", "container", "copyright"],
      },
    ],

    "/basic/": [
      {
        title: "Markdown",
        icon: "markdown",
        prefix: "markdown/",
        collapsable: false,
        children: [
          "",
          "demo",
          {
            title: "Emoji",
            icon: "emoji",
            path: "emoji/",
            prefix: "emoji/",
            collapsable: false,
            children: ["people", "nature", "object", "place", "symbol"],
          },
        ],
      },
      {
        title: "VuePress",
        icon: "vue",
        prefix: "vuepress/",
        collapsable: false,
        children: [
          "",
          "file",
          "markdown",
          "plugin",
          "theme",
          "command",
          "case",
        ],
      },
    ],

    "/": [
      "",
      {
        title: "Guide",
        icon: "creative",
        prefix: "guide/",
        collapsable: false,
        children: [
          "get-started/",
          "interface/",
          "layout/",
          "markdown/",
          "feature/",
          "blog/",
          "eject",
        ],
      },
      {
        title: "Config",
        icon: "config",
        prefix: "config/",
        collapsable: false,
        children: ["", "theme/", "page", "stylus", "i18n", "plugin/"],
      },
      {
        title: "Basic",
        icon: "module",
        prefix: "basic/",
        collapsable: false,
        children: ["tutorial", "markdown/", "vuepress/"],
      },
      "changelog",
      "FAQ/",
      "demo/",
      "contribution",
    ],
  }),

  zh: hope.sidebarConfig({
    "/zh/guide/": [
      {
        title: "????????????",
        icon: "creative",
        prefix: "get-started/",
        collapsable: false,
        children: ["intro", "install", "markdown"],
      },
      {
        title: "??????",
        icon: "palette",
        prefix: "interface/",
        collapsable: false,
        children: [
          "darkmode",
          "theme-color",
          "icon",
          "accessibility",
          "others",
        ],
      },
      {
        title: "??????",
        icon: "layout",
        prefix: "layout/",
        collapsable: false,
        children: [
          "navbar",
          "sidebar",
          {
            title: "??????",
            icon: "page",
            collapsable: false,
            children: ["page", "breadcrumb", "footer"],
          },
          "home",
          "slides",
          "custom",
        ],
      },
      {
        title: "Markdown ??????",
        icon: "markdown",
        prefix: "markdown/",
        collapsable: false,
        children: [
          "intro",
          "container",
          "components",
          "code-group",
          "align",
          "sup-sub",
          "footnote",
          "mark",
          "tasklist",
          "tex",
          "flowchart",
          "mermaid",
          "demo",
          "presentation",
          "external",
        ],
      },
      {
        title: "??????",
        icon: "discover",
        prefix: "feature/",
        collapsable: false,
        children: [
          "page-info",
          "comment",
          "copy-code",
          "photo-swipe",
          "copyright",
          "git",
          "encrypt",
          "pwa",
          "feed",
          "seo",
          "sitemap",
          "typescript",
        ],
      },
      {
        title: "??????",
        icon: "layout",
        prefix: "blog/",
        collapsable: false,
        children: ["intro", "article", "category-and-tags", "timeline", "home"],
      },
      "eject",
    ],

    "/zh/config/": [
      {
        title: "????????????",
        icon: "config",
        prefix: "theme/",
        collapsable: false,
        children: ["", "default", "feature", "plugin", "apperance"],
      },
      "page",
      "stylus",
      "i18n",
      {
        title: "????????????",
        icon: "plugin",
        prefix: "plugin/",
        collapsable: false,
        children: ["", "container", "copyright"],
      },
    ],

    "/zh/basic/": [
      {
        title: "Markdown",
        icon: "markdown",
        prefix: "markdown/",
        collapsable: false,
        children: [
          "",
          "demo",
          {
            title: "Emoji",
            icon: "emoji",
            path: "emoji/",
            prefix: "emoji/",
            collapsable: false,
            children: ["people", "nature", "object", "place", "symbol"],
          },
        ],
      },
      {
        title: "VuePress",
        icon: "vue",
        prefix: "vuepress/",
        collapsable: false,
        children: [
          "",
          "file",
          "markdown",
          "plugin",
          "theme",
          "command",
          "case",
        ],
      },
    ],

    "/zh/": [
      "",
      {
        title: "??????",
        icon: "creative",
        prefix: "guide/",
        collapsable: false,
        children: [
          "get-started/",
          "interface/",
          "layout/",
          "markdown/",
          "feature/",
          "blog/",
          "eject",
        ],
      },
      {
        title: "??????",
        icon: "config",
        prefix: "config/",
        collapsable: false,
        children: ["", "theme/", "page", "stylus", "i18n", "plugin/"],
      },
      {
        title: "??????",
        icon: "module",
        prefix: "basic/",
        collapsable: false,
        children: ["tutorial", "markdown/", "vuepress/"],
      },
      "changelog",
      "FAQ/",
      "demo/",
      "contribution",
    ],
  }),
};
