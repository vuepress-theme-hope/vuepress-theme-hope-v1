---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-sitemap1"
tagline: Automatically generate a sitemap for your website when you build it.
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-sitemap1
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-sitemap1
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
      "sitemap1",
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
      "sitemap1",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
