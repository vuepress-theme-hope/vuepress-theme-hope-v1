<template>
  <header class="hero">
    <MyTransition>
      <img
        v-if="$frontmatter.heroImage"
        key="light"
        :class="{ light: Boolean($frontmatter.darkHeroImage) }"
        :src="$withBase($frontmatter.heroImage)"
        :alt="$frontmatter.heroAlt || 'HomeLogo'"
      />
    </MyTransition>
    <MyTransition>
      <img
        v-if="$frontmatter.darkHeroImage"
        key="dark"
        class="dark"
        :src="$withBase($frontmatter.darkHeroImage)"
        :alt="$frontmatter.heroAlt || 'HomeLogo'"
      />
    </MyTransition>
    <div class="hero-info">
      <MyTransition :delay="0.04">
        <h1
          v-if="$frontmatter.heroText !== false"
          id="main-title"
          v-text="$frontmatter.heroText || $title || 'Hello'"
        />
      </MyTransition>
      <MyTransition :delay="0.08">
        <p
          class="description"
          v-text="
            $frontmatter.tagline ||
            $description ||
            'Welcome to your VuePress site'
          "
        />
      </MyTransition>
      <MyTransition :delay="0.12">
        <p v-if="$frontmatter.action" class="action">
          <NavLink
            v-for="action in actionLinks"
            :key="action.text"
            :item="action"
            class="action-button"
            :class="action.type || ''"
          />
        </p>
      </MyTransition>
    </div>
  </header>
</template>

<script src="./HomeHero" />

<style lang="stylus">
.home.project {
  .hero {
    text-align: center;

    @media (min-width: $MQNarrow) {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      text-align: left;
    }

    img {
      display: block;
      max-width: 100%;
      max-height: 280px;
      margin: 0;

      @media (max-width: $MQNarrow) {
        margin: 3rem auto 1.5rem;
      }

      @media (max-width: $MQMobile) {
        max-height: 240px;
        margin: 2rem auto 1.2rem;
      }

      @media (max-width: $MQMobileNarrow) {
        max-height: 210px;
        margin: 1.5rem auto 1rem;
      }

      &.light {
        display: block;

        html.dark & {
          display: none;
        }
      }

      &.dark {
        display: none;

        html.dark & {
          display: block;
        }
      }
    }

    h1,
    .description,
    .action {
      margin: 1.8rem auto;

      @media (min-width: $MQNarrow) {
        margin: 1.8rem 0;
      }

      @media (max-width: $MQMobile) {
        margin: 1.5rem auto;
      }

      @media (max-width: $MQMobileNarrow) {
        margin: 1.2rem auto;
      }
    }

    h1 {
      font-size: 3.6rem;
      font-family: var(--font-family-fancy);

      @media (max-width: $MQMobile) {
        font-size: 2.5rem;
      }

      @media (max-width: $MQMobileNarrow) {
        font-size: 2rem;
      }
    }

    .description {
      max-width: 35rem;

      color: var(--text-color-l40);

      font-size: 1.6rem;
      font-family: var(--font-family-fancy);
      line-height: 1.3;

      @media (max-width: $MQMobile) {
        font-size: 1.4rem;
      }

      @media (max-width: $MQMobileNarrow) {
        font-size: 1.2rem;
      }
    }

    .action-button {
      display: inline-block;

      overflow: hidden;

      margin: 0.6rem 0.8rem;
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--accent-color);
      border-radius: 0.5rem;

      color: var(--accent-color);

      font-size: 1.2rem;

      transition: background-color var(--color-transition),
        color var(--color-transition);

      @media (max-width: $MQMobile) {
        padding: 0.8rem 1.2rem;
        font-size: 1.1rem;
      }

      @media (max-width: $MQMobileNarrow) {
        font-size: 1rem;
      }

      &:hover {
        background-color: var(--accent-color);
        color: var(--white);
      }

      &.primary {
        background-color: var(--accent-color);
        color: var(--white);

        &:hover {
          border-color: var(--accent-color-l10);
          background-color: var(--accent-color-l10);
        }
      }
    }
  }
}
</style>
