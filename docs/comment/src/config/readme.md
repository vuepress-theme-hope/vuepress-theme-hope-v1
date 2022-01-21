---
title: API Config
icon: config
---

## type

- Type: `'valine' | 'vssue' | 'disable'`
- Required: true

Comment service provider.

Setting it to `'disable'` will only disable the comment feature.

## author

- Type: `string`
- Required: false

Default author for pages

## pageInfo

- Type: `string[] | false`
- Default: `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`

The order of the items decides the display order. Fill in `false` to disable it.

Available items:

- `'author'`: author
- `'time'`: writing date
- `'category'`: category
- `'tag'`: tags
- `'reading-time'`: expect reading time
- `'word'`: word number for the article
- `'visitor'`: pageviews

## comment

- Type: `boolean`
- Default: `true`

Whether to enable comment feature by default.

## categoryPath

- Type: `string`
- Required: No

Path to navigate when clicking category label.

`$category` will be automatically replaced by currect category name.

## tagPath

- Type: `string`
- Required: No

Path to navigate when clicking tag label.

`$tag` will be automatically replaced by currect tag name.

## titleIcon

- Type: `boolean`
- Default: `false`

Whether display icon besides title.

## titleIconPrefix

- Type: `string`
- Required: No

Title icon prefix.

## wordPerminute

- Type: `number`
- Default: `300`

Reading words per minute.

## pageInfoLocales

```ts
interface PageInfoLocaleData {
  /**
   * Author label text
   */
  author: string;

  /**
   * Writing date label text
   */
  date: string;

  /**
   * Label text marked as original
   */
  origin: string;

  /**
   * Page views label text
   */
  views: string;

  /**
   * Tag label text
   */
  tag: string;

  /**
   * Category label text
   */
  category: string;

  /**
   * Expect reading time label text
   */
  readingTime: string;

  /**
   * Words label Text
   */
  words: string;
}
```

Locales Config for page information.

## Waline config

- [See here](waline.md)

## Vssue config

- [See here](vssue.md)

## Valine config

- [See here](valine.md)
