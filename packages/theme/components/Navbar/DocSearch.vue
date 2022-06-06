<template>
  <div id="docsearch" />
</template>

<script src="./DocSearch" />

<style lang="stylus">
.DocSearch-Button,
.DocSearch {
  --docsearch-primary-color: var(--c-theme-color);
  --docsearch-text-color: var(--text-color);
  --docsearch-highlight-color: var(--theme-color);
  --docsearch-muted-color: var(--light-gery);
  --docsearch-container-background: rgb(9 10 17 / 80%);
  --docsearch-modal-background: var(--bg-color-float);
  --docsearch-searchbox-background: var(--bg-color-active);
  --docsearch-searchbox-focus-background: var(--bg-color);
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--theme-color);
  --docsearch-hit-color: var(--text-color-light);
  --docsearch-hit-active-color: var(--bg-color);
  --docsearch-hit-background: var(--bg-color);
  --docsearch-hit-shadow: 0 1px 3px 0 var(--border-color);
  --docsearch-footer-background: var(--bg-color);

  html.dark & {
    --docsearch-logo-color: var(--c-text);
    --docsearch-modal-shadow: inset 1px 1px 0 0 #2c2e40, 0 3px 8px 0 #000309;
    --docsearch-key-shadow: inset 0 -2px 0 0 #282d55, inset 0 0 1px 1px #51577d,
      0 2px 2px 0 rgb(3 4 9 / 30%);
    --docsearch-key-gradient: linear-gradient(-225deg, #444950, #1c1e21);
    --docsearch-footer-shadow: inset 0 1px 0 0 rgb(73 76 106 / 50%),
      0 -4px 8px 0 rgb(0 0 0 / 20%);
  }
}

// docsearch fix
// stylelint-disable selector-class-pattern
.DocSearch {
  &.DocSearch-Button {
    margin-left: 0;
  }

  &.DocSearch-Container {
    position: fixed !important;
  }
}
</style>
