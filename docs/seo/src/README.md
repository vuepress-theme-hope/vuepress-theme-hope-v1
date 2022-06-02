---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-seo"
tagline: Inject <meta> into your web page to enhance the SEO of your web page.
action:
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
yarn add -D @mr-hope/vuepress-plugin-seo
```

:::

::: code-group-item npm

```bash
npm i -D @mr-hope/vuepress-plugin-seo
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
      "@mr-hope/seo",
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
      "@mr-hope/seo",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
