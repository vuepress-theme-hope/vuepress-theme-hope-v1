<template>
  <Common :sidebar="false">
    <main id="main-content" class="page not-found">
      <Page404Icon />
      <blockquote v-text="msg" />
      <button class="action-button" @click="back">{{ locale.back }}</button>
      <RouterLink class="action-button" to="/">{{ locale.home }}</RouterLink>
    </main>
  </Common>
</template>

<script src="./404" />

<style lang="stylus">
.page.not-found {
  display: block;

  max-width: var(--home-page-width);
  min-height: 80vh;
  margin: 0 auto;
  padding: calc(var(--navbar-height) + 1rem) 2rem 0 2rem !important;

  text-align: center;

  .page-404-icon {
    max-width: 600px;
    margin: 0 1.5rem;
  }

  .action-button {
    display: inline-block;

    box-sizing: border-box;

    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    border-width: 0;
    border-bottom: 1px solid var(--accent-color-dark);
    border-radius: 0.25rem;

    background: var(--accent-color);
    color: var(--white);
    outline: none;

    font-size: 1rem;

    transition: background 0.1s ease;

    &:hover {
      background: var(--accent-color-light);
      cursor: pointer;
    }
  }
}
</style>
