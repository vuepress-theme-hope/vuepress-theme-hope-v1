<template>
  <div
    v-if="$frontmatter.features && $frontmatter.features.length"
    class="features"
  >
    <template v-for="(feature, index) in $frontmatter.features">
      <div
        v-if="feature.link"
        :key="index"
        class="feature link"
        :class="`feature${index % 9}`"
        tabindex="0"
        role="navigation"
        @click="navigate(feature.link)"
      >
        <template v-if="feature.icon">
          <img
            v-if="feature.icon.match(/(?:https?:)?\/\//)"
            class="icon"
            :src="feature.icon"
          />
          <img
            v-else-if="feature.icon.startsWith('/')"
            class="icon"
            :src="$withBase(feature.icon)"
          />
          <span :class="`icon ${$themeConfig.iconPrefix}${feature.icon}`" />
        </template>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
      <div v-else :key="index" class="feature" :class="`feature${index % 9}`">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </template>
  </div>
</template>

<script src="./HomeFeatures" />

<style lang="stylus">
.home.project {
  .features {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    align-items: stretch;
    justify-content: center;

    overflow: hidden;

    margin: 0 -2rem;
    padding: 1.2rem 0;
    border-top: 1px solid var(--border-color);

    transition: border-color var(--color-transition);

    @media (max-width: $MQMobileNarrow) {
      margin: 0 -1.5rem;
    }
  }

  .feature {
    position: relative;

    flex-basis: calc(33% - 4rem);

    overflow: hidden;

    margin: 0.5rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;

    text-align: center;

    transition: transform 0.3s, box-shadow 0.3s;

    @media (min-width: $MQWide) {
      flex-basis: calc(25% - 4rem);
    }

    @media (max-width: $MQNarrow) {
      flex-basis: calc(50% - 4rem);
    }

    @media (max-width: $MQMobile) {
      font-size: 0.95rem;
    }

    @media (max-width: $MQMobileNarrow) {
      flex-basis: calc(100%);
      margin: 0.5rem 0;
      border-radius: 0;
      font-size: 0.9rem;
    }

    &.link {
      cursor: pointer;
    }

    &:hover {
      box-shadow: 0 2px 12px 0 var(--card-shadow-color);
      transform: scale(1.05);
    }

    .icon {
      display: inline-block;
      margin-bottom: 0.5rem;
      color: var(--accent-color);
      font-size: 2rem;
    }

    h2 {
      margin: 0.25rem 0;
      border-bottom: none;

      color: var(--text-color-light);

      font-weight: bold;
      font-size: 1.25rem;

        @media (max-width: $MQMobileNarrow) {
        font-size: 1.2rem;
      }
    }

    p {
      margin: 0;
      color: var(--text-color-lighter);
      line-height: 1.4;
    }
  }
}
</style>
