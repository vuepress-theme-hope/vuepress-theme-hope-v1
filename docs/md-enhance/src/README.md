---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
action:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config.html

features:
  - title: Custom Container
    icon: box
    details: Decorate Markdown content with styles
    link: /guide/container.html

  - title: Tabs
    icon: tab
    details: Group similar content with tabs and switch them together
    link: /guide/tabs.html

  - title: Code Tabs
    icon: code
    details: Group similar codes with tabs
    link: /guide/code-tabs.html

  - title: Custom Align
    icon: align
    details: Let you decide to align paragraphs in the way you like
    link: /guide/align.html

  - title: Superscript and subscript support
    icon: superscript
    details: Your Markdown now suppport superscript and subscript
    link: /guide/sup-sub.html

  - title: Footnote support
    icon: footnote
    details: Your Markdown now suppport footnotes
    link: /guide/footnote.html

  - title: Mark Support
    icon: write
    details: Mark words and sentences in Markdown
    link: /guide/mark.html

  - title: Tasklist Support
    icon: check
    details: Use tasklist in Markdown
    link: /guide/tasklist.html

  - title: image syntax
    icon: pic
    details: improve syntax to specify size and color scheme
    link: /guide/image.html

  - title: Chart Support
    icon: rank
    details: Display charts in Markdown
    link: /guide/chart.html

  - title: Flowchart Support
    icon: tree
    details: Create your flowchart in Markdown
    link: /guide/flowchart.html

  - title: Mermaid Support
    icon: diagram
    details: Add mermaid diagram in Markdown
    link: /guide/mermaid.html

  - title: Tex Support
    icon: tex
    details: Markdown now have Tex Support so you can write your formula
    link: /guide/tex.html

  - title: Include snippet Support
    icon: markdown
    details: split your docs with different parts and import them in Markdown
    link: /guide/include.html

  - title: Code Demo Support
    icon: discover
    details: You can insert code demo easily
    link: /guide/demo/

  - title: Presentation Support
    icon: slides
    details: You can insert presentation in Markdown files directly
    link: /guide/presentation/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-md-enhance
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
      "md-enhance",
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
      "md-enhance",
      {
        // your options
      },
    ],
  ],
};
```

:::

::::
