---
title: React Code Demo
icon: react
---

## Syntax

````md
::: react-demo Optional title text

```js
// your script, exporting your react component through `export default`
```

```css
/* Your css content */
```

```json
// Config (Optional)
```

:::
````

::: warning Attention

- Babel must be loaded when using react to parse JSX, this is done by the plugin automaticaly
- You must export your component through `export default`
- We use "ShadowDOM" to make style isolation, and we already replace `document` with `shadowRoot`. To access the page document, please visit `window.document`.

:::

## Demo

::: react-demo A function-based React Demo

```js
export default () => {
  const message = "very handsome";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope is
      <span id="very" onClick={handler}>
        {message}
      </span>
    </div>
  );
};
```

```css
.box span {
  color: blue;
}
```

:::

:::: details Code

````md
::: react-demo A function-based React Demo

```js
export default () => {
  const message = "very handsome";

  const handler = () => {
    alert(message);
  };

  return (
    <div className="box">
      Mr.Hope is
      <span id="very" onClick={handler}>
        {message}
      </span>
    </div>
  );
};
```

```css
.box span {
  color: blue;
}
```

:::
````

::::

::: react-demo A class-based React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope is
        <span id="very" onClick={this.handler}>
          {this.state.message}
        </span>
      </div>
    );
  }
  handler() {
    alert(this.state.message);
  }
}
```

```css
.box span {
  color: blue;
}
```

:::

:::: details Code

````md
::: react-demo A class-based React Demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box">
        Mr.Hope is
        <span id="very" onClick={this.handler}>
          {this.state.message}
        </span>
      </div>
    );
  }
  handler() {
    alert(this.state.message);
  }
}
```

```css
.box span {
  color: blue;
}
```

:::
````

::::
