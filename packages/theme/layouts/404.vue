<template>
  <Common :sidebar="false">
    <main class="page not-found">
      <Page404Icon />
      <blockquote v-text="msg" />
      <button class="action-button" @click="back">{{ locales.back }}</button>
      <RouterLink class="action-button" to="/">{{ locales.home }}</RouterLink>
    </main>
  </Common>
</template>

<script src="./404" />

<style lang="stylus">
.page.not-found {
  display: block;

  max-width: $homePageWidth;

  min-height: 80vh;
  margin: 0 auto;
  padding: ($navbarHeight + 1rem) 2rem 0 2rem !important;

  text-align: center;

  @media (max-width: $MQMobile) {
    padding-top: $navbarMobileHeight + 1rem;
  }

  .page-404-icon {
    max-width: 600px;
    margin: 0 1.5rem;

    .theme-dark & {
      filter: invert(70%);
    }
  }

  .action-button {
    display: inline-block;

    box-sizing: border-box;

    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    border-width: 0;
    border-bottom: 1px solid var(--accent-color-d10);
    border-radius: 0.25rem;
    background: var(--accent-color);
    color: var(--white);
    outline: none;

    font-size: 1rem;

    transition: background 0.1s ease;

    &:hover {
      background: var(--accent-color-l10);
      cursor: pointer;
    }
  }
}
</style>
