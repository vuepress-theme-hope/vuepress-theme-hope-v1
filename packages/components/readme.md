# @mr-hope/vuepress-plugin-components

[![Version](https://img.shields.io/npm/v/@mr-hope/vuepress-plugin-components.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/@mr-hope/vuepress-plugin-components.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/@mr-hope/vuepress-plugin-components?style=flat-square&logo=npm)](https://www.npmjs.com/package/@mr-hope/vuepress-plugin-components)

Components for vuepress-theme-hope.

## Usage

```bash
npm i @mr-hope/vuepress-plugin-components
```

This plugin register 4 components and 1 global component:

- BackToTop (Global Components)
- Badge
- BreadCrumb
- CodeGroup
- CodeGroupItem
- Pagination
- ScreenFull

## BackToTop

Back-to-top Button

## BreadCrumb

### Props

- show: Whether display globally
- icon: Whether display icon
- iconPrefix: icon class prefix

## Badge

A badge which allows you to diy it’s color.

## CodeGroup, CodeGroupItem

Code Group

Demo:

````md
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
````

## Pagination

Paging component.

### Props

- currentPage: v-model variable, current page.
- total: total number of items
- perPage: number of items per page, default is 10

## ScreenFull

A full-screen button

### Props

- enable: Whether enable this component

---

vuepress-theme-hope 的组件。

## 使用

```bash
npm i @mr-hope/vuepress-plugin-components
```

此插件注册 4 个组件和一个全局组件:

- BackToTop (全局组件)
- Badge
- BreadCrumb
- CodeGroup
- CodeGroupItem
- Pagination
- ScreenFull

## `<BackToTop />`

返回顶部按钮

## `<BreadCrumb />`

### 属性

- show: 是否全局显示
- icon: 是否显示图标
- iconPrefix: 图标前缀

## `<Badge />`

支持自定义颜色的徽章

## `<CodeGroup />`, `<CodeGroupItem />`

代码块分组。

案例:

````md
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
````

## `<Pagination />`

分页组件。

### 属性

- currentPage: V-model 双向绑定，当前为第几个页面。
- total: 总项数
- perPage: 每页包含的项目数，默认为 10

## `<ScreenFull />`

全屏按钮组件

### 属性

- enable: 是否启用此组件
