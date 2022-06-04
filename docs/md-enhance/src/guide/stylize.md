---
title: Stylize
icon: style
---

This plugin can stylize inline tokens including changing tags, adding attributes and modifying content.

It's useful for you to create inline snippet with it.

<!-- more -->

## Config

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        stylize: [
          // options here
        ],
      },
    ],
  ],
};
```

## Usage

The `stylize` receives an array, where each element accepts 2 options:

- `matcher`: should be `string` or `RegExp`.

- `replacer`: a function cutomizing the matched token

For example, you can use the following cofig to transform `*Recommanded*` into a Badge `<Badge type="tip">Recommanded</Badge>`:

```js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        stylize: [
          {
            match: /n't$/,
            replacer: ({ tag, attrs, content }) => {
              if (tag === "em")
                return {
                  tag: "span",
                  attrs: { style: "color: red" },
                  content,
                };
            },
          },
        ],
      },
    ],
  ],
};
```

<!-- markdownlint-disable MD033 -->

Another example is you want a to set all the emphsis `n't` words to red color, so that `Setting this to a invalid stytax *doesn't* have any effect.` becomes: "Setting this to a invalid stytax <span style="color:red">doesn't</span> have any effect."

<!-- markdownlint-enable MD033 -->

```js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        stylize: [
          {
            match: "Recommanded",
            replacer: ({ tag, attrs }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommanded",
                };
            },
          },
        ],
      },
    ],
  ],
};
```

If you want to skip some words in some pages, you can set `noStylize` in page frontmatter with an array containing content you don't want to stylize.

::: info Performance

To avoid preformance impact, you should try to avoid using RegExp for better performance unless you need it.

Also try to create snippets with RegExp having lower costs, e.g: RegExp starting with `^` and ending with `$`.

For example, if you only want to match "SHOULD", "MUST" and "MAY", you should write `/^(?:SHOULD|M(?:UST|AY))$/u` instead of `/SHOULD|MUST|MAY/u`. The fist one will only match 2 time with "A loo...oong content" with 1000 characters, but will match nearly 3000 times with the second RegExp.

:::
