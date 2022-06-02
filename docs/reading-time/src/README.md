---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-reading-time"
tagline: Expect reading time and word count statistics
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

This plugin will inject expect reading time and word count statistics into the page object.

Will automatically inject `readingTime` into the page object:

```ts
interface ReadingTime {
  /** Expect reading minute */
  minutes: number;
  /** Words count */
  words: number;
}
```

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D @mr-hope/vuepress-plugin-reading-time
```

:::

::: code-group-item npm

```bash
npm i -D @mr-hope/vuepress-plugin-reading-time
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
      "@mr-hope/reading-time",
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
      "@mr-hope/reading-time",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::

## Plugin options

### wordPerminute

- Type: `number`
- Default: `300`

Reading speed (words per minute)

### locales

```ts
interface ReadingTimeLocaleData {
  /**
   * Word template, `$word` will be automatically replaced by actual words
   */
  word: string;

  /**
   * Text for less than one minute
   */
  less1Minute: string;

  /**
   * Time template
   */
  time: string;
}
```

Locales config.
