---
title: Other features
icon: others
category: interface
tags:
  - interface
---

## Style customization

The theme allows you to set variables in the `palette.styl` of `.vuepress/style` to customize most of the colors, responsive breakpoints, page layout size and other parameters.

For detailed info, please see [Stylus Configuration](../../config/stylus.md)

## Fullscreen Button

Enabled by default, it’s in theme popup window in navbar.

If you don’t need it, you can disable it by setting `fullscreen` to `false` in the themeConfig.

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

:::: code-group

::: code-group-item ts

```ts {6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    fullscreen: false, // Enable by default
  },
});
```

:::

::: code-group-item js

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    fullscreen: false, // Enable by default
  },
});
```

:::

::::

## Back to top button

`vuepress-theme-hope` adds a back-to-top control which will display after scrolling down 300px by default.

You can set `backToTop` to `false` in `themeConfig` to disable it, or set it to a number to change the default trigger timing of 300px.
