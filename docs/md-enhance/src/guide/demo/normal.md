---
title: Normal Code Demo
icon: code
---

## Syntax

````md
::: normal-demo Optional title text

```html
<!-- html code -->
```

```js
// js code
```

```css
/* css code */
```

```json
// config (optional)
{
  "jsLib": [
    ...
  ],
  "cssLib":[
    ...
  ]
}
```

::::
````

::: warning Attention

- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. To access the page document, please visit `window.document`.

:::

## Demo

::: normal-demo Demo

```html
<h1>Mr.Hope</h1>
<p>is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome");
});
```

```css
span {
  color: red;
}
```

:::

:::: details Code

````md
::: normal-demo Demo

```html
<h1>Mr.Hope</h1>
<p>is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome");
});
```

```css
span {
  color: red;
}
```

:::
````
