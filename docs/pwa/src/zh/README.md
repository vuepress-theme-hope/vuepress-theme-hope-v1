---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-pwa1"
tagline: 一个强大的 PWA 插件
action:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

渐进式网页应用 (Progressive Web App) 支持。

## 使用插件

### 安装

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

### 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "pwa1",
      {
        // 配置选项
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
        // 你的选项
      },
    ],
  ],
};
```

:::

::::
