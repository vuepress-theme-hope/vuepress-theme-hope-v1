---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: A powerfull PWA plugin
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will turn on Progressive Web App Support.

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-pwa
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-pwa
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
      "@mr-hope/pwa",
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
      "@mr-hope/pwa",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
