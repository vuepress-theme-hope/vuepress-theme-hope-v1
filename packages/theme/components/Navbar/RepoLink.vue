<template>
  <div v-if="repo && $themeLocaleConfig.repoDisplay !== false" class="nav-item">
    <a
      class="repo-link"
      :href="repoLink"
      rel="noopener noreferrer"
      target="_blank"
      :aria-label="repoLabel"
    >
      <Component
        :is="`${repoType}Icon`"
        :style="{
          width: '1.25rem',
          height: '1.25rem',
          verticalAlign: 'middle',
        }"
      />
    </a>
  </div>
</template>

<script src="./RepoLink" />

<style lang="stylus">
.navbar {
  .repo-link {
    display: inline-block;

    margin: auto;
    padding: 6px;

    color: var(--dark-grey);

    // fix icon position
    line-height: 1;

    &:hover,
    &:active {
      color: var(--accent-color);
    }
  }
}
</style>
