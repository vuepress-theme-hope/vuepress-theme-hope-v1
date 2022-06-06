---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-pwa1"
tagline: A powerfull PWA plugin
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will turn on Progressive Web App Support.

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-pwa1
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-pwa1
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
      "pwa1",
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
      "pwa1",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
