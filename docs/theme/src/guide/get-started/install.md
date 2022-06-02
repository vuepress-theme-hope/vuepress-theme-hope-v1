---
title: Install / Usage
icon: install
category: Get Started
tags:
  - install
---

## Install

Create a vuepress-theme-hope project in `[dir]` folder under the current project:

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

## Usage

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

`config` is just a helper function, it will give you config description and provide auto-completion through TS’s Interface and JSDoc.

At the same time, the `config` function will also complete some default configurations for your current configuration which will pass directly to VuePress. Don’t worry it will change your config! It will respect every config you make to make sure your other plugins work well.

We are also providing `themeConfig`, `navbarConfig` and `sidebarConfig` helper to provide similar experience in case you split your config in to several files.

You can view [Config of this site][docs-config] as an example.

:::

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/docs/theme/src/.vuepress/config.ts
