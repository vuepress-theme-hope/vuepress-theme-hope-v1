---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: 为 VuePress 提供图片预览支持
action:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

让页面图像支持预览，缩放，共享，滑动查看和下载。

## 使用插件

### 安装

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-photo-swipe
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-photo-swipe
```

:::

::::

### 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: ["photo-swipe"],
};
```

:::

::: code-group-item js

```js
// .vuepress/config.js
module.exports = {
  plugins: ["photo-swipe"],
};
```

:::

::::
