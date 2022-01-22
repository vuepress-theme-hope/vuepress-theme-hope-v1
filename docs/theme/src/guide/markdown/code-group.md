---
title: CodeGroup
icon: code
category: markdown
tags:
  - codegroup
  - markdown
---

The theme provides you a code group.

<!-- more -->

## Config

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      codegroup: true,
    },
  },
};
```

## Usage

You need to use `code-group` container outside, and place only `code-group-item` container inside it.

You need to set title for each `code-group-item` container, and place one code block in each `code-group-item` container.

If you want some item be actived by default, you can append a `:active` suffix at the end of title.

## Demo

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::

````md
:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::
````
