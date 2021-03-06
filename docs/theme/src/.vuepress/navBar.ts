import hope from "vuepress-theme-hope";

export default {
  en: hope.navbarConfig([
    { text: "Guide", link: "/guide/", icon: "creative" },
    { text: "Config", link: "/config/", icon: "config" },
    { text: "FAQ", link: "/FAQ/", icon: "question" },
    {
      text: "Basic",
      icon: "info",
      prefix: "/basic/",
      children: [
        { text: "Tutorial", link: "tutorial", icon: "creative" },
        { text: "Markdown", link: "markdown/", icon: "markdown" },
        { text: "VuePress", link: "vuepress/", icon: "vue" },
      ],
    },
    {
      text: "Project",
      icon: "info",
      children: [
        {
          text: "Changelog",
          link: "/changelog.html",
        },
        {
          text: "Repo",
          link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
        },
        {
          text: "Theme Demo",
          link: "/demo/",
        },
        {
          text: "Contribution Guide",
          link: "/contribution.html",
        },
        {
          text: "Plugins",
          icon: "plugin",
          children: [
            {
              text: "Active Hash Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/active-hash/",
            },
            {
              text: "AddThis Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/add-this/",
            },
            {
              text: "Comment Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/comment/",
            },
            {
              text: "Components Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/components/",
            },
            {
              text: "Copy Code Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/copy-code/",
            },
            {
              text: "Feed Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/feed/",
            },
            {
              text: "Git Info Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/git/",
            },
            {
              text: "Markdown Enhance Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/md-enhance/",
            },
            {
              text: "Photo Swipe Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/photo-swipe/",
            },
            {
              text: "PWA Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/pwa/",
            },
            {
              text: "Reading Time Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/",
            },
            {
              text: "Seo Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/seo/",
            },
            {
              text: "Sitemap Plugin",
              link: "https://vuepress-theme-hope.github.io/v1/sitemap/",
            },
          ],
        },
      ],
    },
  ]),

  zh: hope.navbarConfig([
    { text: "??????", link: "/zh/guide/", icon: "creative" },
    { text: "??????", link: "/zh/config/", icon: "config" },
    { text: "????????????", link: "/zh/FAQ/", icon: "question" },
    {
      text: "??????",
      icon: "info",
      prefix: "/zh/basic/",
      children: [
        { text: "????????????", link: "tutorial", icon: "creative" },
        { text: "Markdown", link: "markdown/", icon: "markdown" },
        { text: "VuePress", link: "vuepress/", icon: "vue" },
      ],
    },
    {
      text: "??????",
      icon: "info",
      children: [
        {
          text: "????????????",
          link: "/zh/changelog.html",
        },
        {
          text: "????????????",
          link: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",
        },
        {
          text: "????????????",
          link: "/zh/demo/",
        },
        {
          text: "????????????",
          link: "/zh/contribution.html",
        },
        {
          text: "??????",
          icon: "plugin",
          children: [
            {
              text: "????????????????????????",
              link: "https://vuepress-theme-hope.github.io/v1/active-hash/zh/",
            },
            {
              text: "AddThis ??????",
              link: "https://vuepress-theme-hope.github.io/v1/add-this/zh/",
            },
            {
              text: "????????????",
              link: "https://vuepress-theme-hope.github.io/v1/comment/zh/",
            },
            {
              text: "?????????",
              link: "https://vuepress-theme-hope.github.io/v1/components/zh/",
            },
            {
              text: "??????????????????",
              link: "https://vuepress-theme-hope.github.io/v1/copy-code/zh/",
            },
            {
              text: "Feed ??????",
              link: "https://vuepress-theme-hope.github.io/v1/feed/zh/",
            },
            {
              text: "Git ????????????",
              link: "https://vuepress-theme-hope.github.io/v1/git/zh/",
            },
            {
              text: "Markdown ????????????",
              link: "https://vuepress-theme-hope.github.io/v1/md-enhance/zh/",
            },
            {
              text: "??????????????????",
              link: "https://vuepress-theme-hope.github.io/v1/photo-swipe/zh/",
            },
            {
              text: "PWA ??????",
              link: "https://vuepress-theme-hope.github.io/v1/pwa/zh/",
            },
            {
              text: "??????????????????",
              link: "https://vuepress-theme-hope.github.io/v1/reading-time/zh/",
            },
            {
              text: "Seo ??????",
              link: "https://vuepress-theme-hope.github.io/v1/seo/zh/",
            },
            {
              text: "Sitemap ??????",
              link: "https://vuepress-theme-hope.github.io/v1/sitemap/zh/",
            },
          ],
        },
      ],
    },
  ]),
};
