---
title: 安装/使用
icon: install
category: Get Started
tags:
  - install
---

## 安装

在当前项目的 `[dir]` 文件夹内创建 vuepress-theme-hope 项目:

:::: code-group

::: code-group-item yarn

```bash
yarn create vuepress-theme-hope [dir]
```

:::

::: code-group-item npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

::::

## 使用

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  // your config here
});
```

:::

::: code-group-item js

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  // your config here
});
```

:::

::::

::: tip

`config` 是一个 Helper 函数，它会在你编辑配置的时候，通过 TS 的 Interface 以及 JSDoc，很方便的给你配置的提示并提供自动补全。

同时，`config` 函数也会为你补全一些直接交付给 VuePress 的默认配置。您无需担心该函数会改变您的配置！它会尊重您所做的每个配置，以确保您的其他插件正常运行。

我们同时提供 `themeConfig`，`navbarConfig` 和 `sidebarConfig` Helper 函数，以应对你将配置拆分成数个文件的情况。

你可以查看 [本文档配置][docs-config] 作为一个配置参考。

:::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.ts
