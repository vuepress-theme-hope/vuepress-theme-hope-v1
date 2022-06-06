---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "vuepress-plugin-feed1"
tagline: Feed plugin for vuepress
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

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

### Usage

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "feed1",
      {
        // your options
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
      "feed1",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
