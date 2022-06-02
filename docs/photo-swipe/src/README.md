---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: Photo swipe plugin for vuepress
action:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

Let your images support preview, zoom, share, swipe view and download.

## How to use

### Install

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

### Usage

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
