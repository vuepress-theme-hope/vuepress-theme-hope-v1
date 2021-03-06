---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of featuresβ¨
actions:
  - text: Get Started π‘
    link: /guide/
    type: primary

  - text: Config π 
    link: /config/

features:
  - title: Markdown Enhance π§°
    details: Add align, sup/sub script, footnote, tasklist, tex, flowchart, diagram, mark and presentation support in markdown
    link: /guide/markdown/

  - title: Pageviews and comments π¬
    details: Start pageview statistics and comment support with Waline and Vssue
    link: /guide/feature/comment/

  - title: Article information display βΉ
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support π
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption π
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color π¨
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode π
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement β
    details: Optimize pages for search engines.
    link: /guide/feature/seo/

  - title: Sitemap πΊ
    details: Generate a Sitemap for your website
    link: /guide/feature/sitemap/

  - title: Feed support π‘
    details: You can generate feed, and let users to subcribe it
    link: /guide/feature/feed/

  - title: PWA support π²
    details: The built-in PWA plugin will make your website more like an APP.
    link: /guide/feature/pwa/

  - title: TS support π§
    details: Turn on TypeScript support for your VuePress
    link: /guide/feature/typescript/

  - title: More new features β¨
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

footer: MIT Licensed | Copyright Β© 2019-present Mr.Hope
copyrightText: false
---

## π Install

Create a vuepress-theme-hope project in `[dir]` folder under the current project:

:::: code-group

::: code-group-item yarn

```bash
yarn create vuepress-theme-hope [dir]
```

:::

::: code-group-item npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

::::

## πUsage

:::: code-group

::: code-group-item ts

```ts{2,4,6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  // your config here
});
```

:::

::: code-group-item js

```js{2,4,6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  // your config here
});
```

:::

::::

::: tip

`config` is just a helper function, it will give you config description and provide auto-completion through TSβs Interface and JSDoc.

At the same time, the `config` function will also complete some default configurations for your current configuration which will pass directly to VuePress. Donβt worry it will change your config! It will respect every config you make to make sure your other plugins work well.

We are also providing `themeConfig`, `navbarConfig` and `sidebarConfig` helper to provide similar experience in case you split your config in to several files.

You can view [Config of this site][docs-config] as an example.

:::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/docs/theme/src/.vuepress/config.ts
