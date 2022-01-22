---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-copy-code"
tagline: 为 VuePress 提供代码块一键复制
action:
  - text: 快速上手 💡
    link: /zh/guide/
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
yarn add -D @mr-hope/vuepress-plugin-copy-code
```

:::

::: code-group-item npm

```bash
npm i -D @mr-hope/vuepress-plugin-copy-code
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
      "@mr-hope/copy-code",
      {
        // 你的选项
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
      "@mr-hope/copy-code",
      {
        // 你的选项
      },
    ],
  ],
};
```

:::

::::
