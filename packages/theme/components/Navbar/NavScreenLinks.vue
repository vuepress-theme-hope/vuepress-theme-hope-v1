<template>
  <nav v-if="navbarLinks.length" class="nav-screen-links">
    <div
      v-for="config in navbarLinks"
      :key="config.link"
      class="navbar-links-item"
    >
      <NavScreenDropdown v-if="'children' in config" :config="config" />
      <AutoLink v-else :config="config" />
    </div>
  </nav>
</template>

<script src="./NavScreenLink" />

<style lang="stylus">
.nav-screen-links {
  display: none;
  padding-bottom: 0.75rem;

  @media (max-width: $MQMobile) {
    display: block;
  }

  .navbar-links-item {
    position: relative;

    display: block;

    padding: 12px 4px 11px 0;
    border-bottom: 1px solid var(--border-color);

    font-size: 16px;
    line-height: 1.5rem;

    transition: border-bottom-color var(--color-transition);
  }

  .nav-link {
    display: inline-block;
    width: 100%;
    color: var(--dark-grey);
    font-weight: normal;

    &:hover {
      color: var(--text-color);
    }

    &.active {
      color: var(--theme-color);
    }
  }
}
</style>
