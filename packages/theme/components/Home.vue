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
  max-width: $homePageWidth;
  min-height: 100vh - $navbarHeight;
  padding: $navbarHeight 2rem 0;
  margin: 0px auto;
  overflow-x: hidden;

  @media (max-width: $MQNarrow) {
    min-height: 100vh - $navbarMobileHeight;
    padding-top: $navbarMobileHeight;
  }

  @media (max-width: $MQMobileNarrow) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  {$contentClass} {
    padding-bottom: 1.5rem;
  }
}
</style>
