---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-active-hash
tagline: 为 VuePress 提供 Active Hash
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-active-hash
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-active-hash
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
      "active-hash",
      {
        // your 你的选项
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
      "active-hash",
      {
        // your 你的选项
      },
    ],
  ],
};
```

:::

::::

此插件是官方插件的改进版本:

- 我们添加了 `containerSelecter` 和 `offset` 选项以确保链接 hash 可以与当前标题完全对齐。

  您应该设置 `containerSelecter` 为主题容器，同时如果你的主题容器有一些特殊的布局，你可以通过 `offset` 选项统一增加一个偏移值。

- 如果您滚动到页面顶部，哈希将被正确删除。

此外，我们将 `sidebarLinkSelector` 更改为 `activeLinkSelecter`，这应该更具语义。

## 配置

### headerSelector

- 类型: `string`
- 默认值: `".header-anchor"`

标题锚点的选择器

### activeSelecter

- 类型: `string`
- 默认值: `".sidebar-link"`

需要激活锚点的选择器

### containerSelecter

- 类型: `string`
- 默认值: `".theme-default-content"`

主题内容容器的选择器。

它用于检测第一个标题据页面顶部的尺寸。

### offset

- 类型: `string`
- 默认值: `0`

用于锚点位置额外的偏移，用于精准对其标题锚点

当你的主题对锚点位置有处理或者容器有顶部填充时很有用。
