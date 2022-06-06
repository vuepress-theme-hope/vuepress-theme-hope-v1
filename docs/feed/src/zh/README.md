---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-feed1"
tagline: 为 VuePress 提供 Feed 生成
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-feed1
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-feed1
```

:::

::::

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "feed1",
      {
        // 你的选项
      },
    ],
  ],
};
```

:::

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "feed1",
      {
        // 你的选项
      },
    ],
  ],
};
```

:::

::::
