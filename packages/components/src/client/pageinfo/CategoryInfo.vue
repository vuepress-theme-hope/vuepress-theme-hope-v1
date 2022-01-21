<template>
  <span
    v-if="name"
    class="category-info"
    :class="{ enable: path }"
    :role="path ? 'navigation' : ''"
    :aria-label="hint"
    data-balloon-pos="down"
    @click="navigate"
  >
    <CategoryIcon />
    <span property="articleSection" v-text="name" />
  </span>
</template>

<script src="./CategoryInfo" />

<style lang="stylus">
.category-info.enable > span:hover
  cursor pointer
  color var(--accent-color, $accentColor)
</style>
