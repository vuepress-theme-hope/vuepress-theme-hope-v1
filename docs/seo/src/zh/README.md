---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-seo1"
tagline: 向你的网页注入 <meta>，来增强你网页的 SEO。
action:
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
yarn add -D vuepress-plugin-seo1
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-seo1
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
      "seo1",
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
      "seo1",
      {
        // 配置选项
      },
    ],
  ],
};
```

:::

::::
