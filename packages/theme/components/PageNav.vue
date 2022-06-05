<template>
  <div v-if="prevNavLink || nextNavLink" class="page-nav">
    <AutoLink v-if="prevNavLink" class="prev" :config="prevNavLink">
      <div class="hint"><span class="arrow left" />Prev</div>
      <div class="link">
        <FontIcon :icon="prevNavLink.icon" />{{ prevNavLink.text }}
      </div>
    </AutoLink>
    <AutoLink v-if="nextNavLink" class="next" :config="nextNavLink">
      <div class="hint">Next<span class="arrow right" /></div>
      <div class="link">
        {{ nextNavLink.text }}<FontIcon :icon="nextNavLink.icon" />
      </div>
    </AutoLink>
  </div>
</template>

<script src="./PageNav" />

<style lang="stylus">
@require '~vuepress-shared/styles/arrow';
@require '~vuepress-shared/styles/wrapper';

.page-nav {
  horizontal-wrapper();

  // clear float
  overflow: auto;

  min-height: 2rem;
  margin-top: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-top: 1px solid var(--border-color);

  transition: border-top var(--color-transition);

  .nav-link {
    display: inline-block;
    padding: 0.25rem;

    .hint {
      color: var(--light-grey);
      font-size: 0.875rem;
      line-height: 2;
    }

    .arrow {
      arrow();

      font-size: 0.75rem;
    }
  }

  .prev {
    text-align: left;

    .icon {
      margin-right: 0.25em;
    }
  }

  .next {
    float: right;
    text-align: right;

    .icon {
      margin-left: 0.25em;
    }
  }
}
</style>
