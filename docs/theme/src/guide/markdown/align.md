---
title: Custom alignment
icon: align
category: markdown
tags:
  - align
  - markdown
---

By injecting configuration into vuepress-plugin-container, you can use

```md
::: center
Paragraph to center
:::

::: right
Right paragraph
:::
```

To customize your paragraph alignment.

<!-- more -->

## Config

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      align: true,
    },
  },
};
```

## Demo

:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::

```md
:::: danger
vuepress-theme-hope v2 is still in W.I.P, the API may have

::: center
Significant changes.
:::

If you meet a bug during usage, you can

::: right
[Mention an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues).
:::
::::
```
