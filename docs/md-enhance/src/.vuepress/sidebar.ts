import theme from "vuepress-theme-hope";

export const enSidebarConfig = theme.sidebarConfig({
  "/": [
    "",
    {
      title: "Guide",
      icon: "creative",
      prefix: "guide/",
      children: [
        "",
        "container",
        "tabs",
        "code-tabs",
        "sup-sub",
        "align",
        "footnote",
        "mark",
        "tasklist",
        "image",
        "include",
        "chart",
        "echarts",
        "flowchart",
        "mermaid",
        "tex",
        {
          title: "Code Demo",
          icon: "discover",
          prefix: "demo/",
          collapsable: true,
          children: ["", "normal", "vue", "react"],
        },
        {
          title: "Presentation",
          icon: "slides",
          prefix: "presentation/",
          collapsable: true,
          children: ["", "demo", "themes"],
        },
        "stylize",
        "others",
      ],
    },
    "config",
  ],

  "/guide/": [
    "",
    "container",
    "tabs",
    "code-tabs",
    "sup-sub",
    "align",
    "footnote",
    "mark",
    "tasklist",
    "image",
    "include",
    "chart",
    "echarts",
    "flowchart",
    "mermaid",
    "tex",
    {
      title: "Code Demo",
      icon: "discover",
      prefix: "demo/",
      collapsable: true,
      children: ["", "normal", "vue", "react"],
    },
    {
      title: "Presentation",
      icon: "slides",
      prefix: "presentation/",
      collapsable: true,
      children: ["", "demo", "themes"],
    },
    "stylize",
    "others",
  ],
});

export const zhSidebarConfig = theme.sidebarConfig({
  "/zh/": [
    "",
    {
      title: "指南",
      icon: "creative",
      prefix: "guide/",
      children: [
        "",
        "container",
        "tabs",
        "code-tabs",
        "sup-sub",
        "align",
        "footnote",
        "mark",
        "tasklist",
        "image",
        "include",
        "chart",
        "echarts",
        "flowchart",
        "mermaid",
        "tex",
        {
          title: "代码演示",
          icon: "discover",
          prefix: "demo/",
          collapsable: true,
          children: ["", "normal", "vue", "react"],
        },
        {
          title: "幻灯片",
          icon: "slides",
          prefix: "presentation/",
          collapsable: true,
          children: ["", "demo", "themes"],
        },
        "stylize",
        "others",
      ],
    },
    "config",
  ],

  "/zh/guide/": [
    "",
    "container",
    "tabs",
    "code-tabs",
    "sup-sub",
    "align",
    "footnote",
    "mark",
    "tasklist",
    "image",
    "include",
    "chart",
    "echarts",
    "flowchart",
    "mermaid",
    "tex",
    {
      title: "代码演示",
      icon: "discover",
      prefix: "demo/",
      collapsable: true,
      children: ["", "normal", "vue", "react"],
    },
    {
      title: "幻灯片",
      icon: "slides",
      prefix: "presentation/",
      collapsable: true,
      children: ["", "demo", "themes"],
    },
    "stylize",
    "others",
  ],
});
