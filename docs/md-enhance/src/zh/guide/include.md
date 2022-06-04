---
title: 导入文件
icon: markdown
---

让你的 VuePress 站点中的 Markdown 文件支持导入其他文件。

<!-- 更多 -->

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      // 启用导入支持
      include: true,
      },
    ],
  ],
};
```

## 语法

使用 `@include(filename)` 导入文件。

如果要部分导入文件，你可以指定导入的行数

- `@include(filename{start-end})`
- `@include(filename{start-})`
- `@include(filename{-end})`

## 演示

`@include(./demo.snippet.md)`:

@include(.vuepress/include/zh-demo.snippet.md)

`@include(./demo.snippet.md{5-9})`:

@include(.vuepress/include/zh-demo.snippet.md{5-9})

## 高级用法

你还可以设置一个对象来自定义包含文件路径和包含行为。

```ts
interface IncludeOptions {
  /**
   * 处理 include 文件路径
   *
   * @default (path) => path
   */
  getPath?: (path: string) => string;

  /**
   * 是否深度导入包含的 markdown 文件
   *
   * @default false
   */
  deep?: boolean;
}
```

例如: 你可以使用 `@src` 作为源文件夹的别名。

```js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 添加 `@src` 别名支持
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

此外，如果你想将 Markdown 文件直接放在实际文件旁边，但不希望它们呈现为页面，你可以在 VuePress 配置中设置 `patterns` 选项。有关详细信息，请参阅 [patterns](https://v1.vuepress.vuejs.org/zh/config/#patterns)。

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
