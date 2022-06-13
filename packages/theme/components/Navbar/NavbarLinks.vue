<template>
  <nav
    class="nav-links"
    :class="{ 'hide-icon': $themeLocaleConfig.navbarIcon === false }"
  >
    <!-- user links -->
    <div
      v-for="config in navbarLinks"
      :key="config.link"
      class="nav-item hide-in-mobile"
    >
      <DropdownLink v-if="'children' in config" :config="config" />
      <AutoLink v-else :config="config" />
    </div>
  </nav>
</template>

<script src="./NavbarLinks" />

<style lang="stylus">
.navbar {
  .nav-links {
    display: flex;
    align-items: center;
    font-size: 0.875rem;

    &.hide-icon .icon {
      display: none !important;
    }
  }

  .nav-item {
    position: relative;
    margin: 0 0.25rem;
    line-height: 2rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    > .nav-link {
      color: var(--dark-grey);

      &::after {
        content: " ";

        position: absolute;
        right: 50%;
        bottom: 0;
        left: 50%;

        height: 2px;
        border-radius: 1px;

        background: var(--accent-color-light);

        visibility: hidden;

        transition: left 0.2s ease-in-out, right 0.2s ease-in-out;
      }

      &.active {
        color: var(--accent-color);
      }

      &:hover,
      &.active {
        &::after {
          right: 0;
          left: 0;
          visibility: visible;
        }
      }
    }
  }
}
</style>
