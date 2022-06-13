<template>
  <RouterLink :to="siteBrandLink" class="brand">
    <img
      v-if="siteBrandLogo"
      class="logo"
      :class="{ light: siteBrandLogoDark }"
      :src="siteBrandLogo"
      :alt="siteBrandTitle"
    />
    <img
      v-if="siteBrandLogoDark"
      class="logo dark"
      :src="siteBrandLogoDark"
      :alt="siteBrandTitle"
    />
    <span
      v-if="siteBrandTitle"
      class="site-name"
      :class="{ 'hide-in-pad': siteBrandLogo }"
      >{{ siteBrandTitle }}</span
    >
  </RouterLink>
</template>

<script src="./NavbarBrand" />

<style lang="stylus">
.navbar {
  .logo {
    vertical-align: top;
    height: var(--navbar-line-height);
    margin-right: 0.8rem;

    &.light {
      display: inline-block;
    }

    &.dark {
      display: none;
    }

    html.dark & {
      &.light {
        display: none;
      }

      &.dark {
        display: inline-block;
      }
    }
  }

  .site-name {
    position: relative;
    color: var(--text-color);
    font-size: 1.25rem;

    @media (max-width: $MQMobile) {
      overflow: hidden;
      width: calc(100vw - 9.4rem);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .brand:hover & {
      color: var(--accent-color);
    }
  }
}
</style>
