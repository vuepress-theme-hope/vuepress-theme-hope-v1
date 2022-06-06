---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-sitemap1"
tagline: 自动在你构建网页时为你生成网页的 sitemap。
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

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

### 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "sitemap1",
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
      "sitemap1",
      {
        // 配置选项
      },
    ],
  ],
};
```

:::

::::
