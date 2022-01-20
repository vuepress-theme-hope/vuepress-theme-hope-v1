---
icon: creative
---

# Guide

This plugin exposes two components at `@mr-hope/vuepress-plugin-comment/lib/client/<component name>.vue`. Please include it manually in your theme.

- `<Comment />`: Comment component
- `<PageInfo />`: Page information component

## `<PageInfo />`

Insert page information component (`<PageInfo />`) before the `<Content />` component manually.

- [View Details](page-info.md)

## `<Comment />`

We recommended you to insert the comment component (`<Comment />`) after the `<PageNav />` component.

By default, `<Comment />` component is enabled globally. You can disable it locally by setting `comment: false` in page frontmatter.

To keep it globally disabled, please set `comment` to `false` in the plugin options. Then you can set `comment: true` in page frontmatter to enable it locally.

You can choose from 3 comment service provider: Waline, Vssue and Valine.

::: tip Comparison between services

- Waline uses a backend server to support comment and pageview statistics, and you can comment without logging in to any account. It needs extra configuration on backend, and you can deploy on vercel for free.
- Vssue uses the issue panel of the code platform repo and requires the user to login or register the corresponding platform account.
- Valine uses leancloud to support pageview statistics, and you can comment without logging in to any account

If your site is for the general public rather than programmers, Waline is recommended, otherwise Vssue is recommended.

:::

### Waline

See [Waline Config Guide](waline.md)

### Vssue

See [Vssue Config Guide](vssue.md)

### Valine

See [Valine Config Guide](valine.md)
