<template>
  <main
    :aria-labelledby="$frontmatter.heroText !== null ? 'main-title' : null"
    class="home project"
  >
    <HomeHero />

    <MyTransition :delay="0.16">
      <HomeFeatures />
    </MyTransition>

    <MyTransition :delay="0.24">
      <Content class="theme-default-content custom" />
    </MyTransition>
  </main>
</template>

<script src="./Home" />

<style lang="stylus">
.home {
  display: block;

  max-width: var(--home-page-width);
  min-height: calc(100vh - var(--navbar-height));
  margin: 0 auto;
  padding: var(--navbar-height) 2rem 0;

  @media (max-width: $MQMobileNarrow) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  {$contentClass} {
    padding-bottom: 1.5rem;
  }
}
</style>
