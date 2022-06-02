---
title: Config
icon: config
---

## Plugin Options

### hostname

- Type: `string`
- Required: No

Deploy hostname.

### author

- Type: `string`
- Required: No

Default author.

### autoDescription

- Type: `boolean`
- Default: `true`

Whether generate description automatically

### fallBackImage

- Type: `string`
- Required: No

Fallback Image link when no image are found

### restrictions

- Type: `string`
- Required: No

The age rating of the content, the format is `[int]+`, such as `"13+"`.

### twitterID

- Type: `string`
- Required: No

Fill in your twitter username.

### isArticle

- Type: `(page: Page) => boolean`
- Required: No

Use this option to judge whether the page is an article.

### seo

- Type:

  ```ts
  function seo(
    seo: SeoContent,
    page: Page,
    context: Context
  ) => SeoContent;
  ```

- Required: No

Custom SEO Generator.

You can use this options to edit SEO tags.

### customMeta

- Type:

  ```ts
  function customHead(
    meta: Meta,
    page: Page,
    context: Context
  ) => void
  ```

- Required: No

You can use this options to edit meta tags injected to `<head>`.
