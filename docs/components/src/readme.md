---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-components"
tagline: Components lib plugin for vuepress
action:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## Install

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D @mr-hope/vuepress-plugin-components
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D @mr-hope/vuepress-plugin-components
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
export default {
  plugins: [
    [
      "@mr-hope/components",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/components",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>
