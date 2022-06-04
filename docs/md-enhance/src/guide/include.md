---
title: Include Files
icon: markdown
---

Let the Markdown file in your VuePress site support including other files.

<!-- more -->

## Config

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable include files
        include: true,
      },
    ],
  ],
};
```

## Syntax

Use `@include(filename)` to include a file.

To partially import the file, you can specify the range of lines to be included:

- `@include(filename{start-end})`
- `@include(filename{start-})`
- `@include(filename{-end})`

## Demo

`@include(./demo.snippet.md)`:

@include(.vuepress/include/demo.snippet.md)

`@include(./demo.snippet.md{5-9})`:

@include(.vuepress/include/demo.snippet.md{5-9})

## Advanced

You can also set an object to customize include filepath and include behavior.

```ts
interface IncludeOptions {
  /**
   * handle include filePath
   *
   * @default (path) => path
   */
  getPath?: (path: string) => string;

  /**
   * Whether deep include files in included markdown files
   *
   * @default false
   */
  deep?: boolean;
}
```

E.g.: you can use `@src` as an alias for your source directory.

```js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Add `@src` alias support
        include: {
          getPath: (file) => {
            if (file.startsWith("@src"))
              return file.replace("@src", path.resolve(__dirname, ".."));

            return file;
          },
        },
      },
    ],
  ],
};
```

Also, to place your Markdown files directly besides your actual files, but don’t want them rendered as pages, you can set `patterns` options in VuePress config. See [patterns](https://v1.vuepress.vuejs.org/config/#patterns) for more details.

```js {7}
module.exports = {
  patterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    [
      "md-enhance",
      {
        include: true,
      },
    ],
  ],
};
```
