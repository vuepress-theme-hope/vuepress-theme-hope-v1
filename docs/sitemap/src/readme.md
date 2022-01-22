---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-sitemap"
tagline: Automatically generate a sitemap for your website when you build it.
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D @mr-hope/vuepress-plugin-sitemap
```

:::

::: code-group-item npm

```bash
npm i -D @mr-hope/vuepress-plugin-sitemap
```

:::

::::

### Usage

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/sitemap",
      {
        // your options
      },
    ],
  ],
};
```

:::

::: code-group-item js

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/sitemap",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
