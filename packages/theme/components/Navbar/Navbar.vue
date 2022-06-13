<template>
  <header class="navbar" :class="{ 'auto-hide': autoHide }">
    <div class="navbar-left">
      <ToggleSidebarButton @toggle="toggleSidebar" />
      <slot name="left-start" />
      <Component
        :is="component"
        v-for="component in leftComponents"
        :key="component"
      />
      <slot name="left-end" />
    </div>

    <div class="navbar-center">
      <slot name="center-start" />
      <Component
        :is="component"
        v-for="component in centerComponents"
        :key="component"
      />
      <slot name="center-end" />
    </div>

    <div class="navbar-right">
      <slot name="right-start" />
      <Component
        :is="component"
        v-for="component in rightComponents"
        :key="component"
      />
      <slot name="right-end" />
      <ToggleNavbarButton :active="showScreen" @toggle="toggleNavScreen" />
    </div>
  </header>
</template>

<script src="./Navbar" />

<style lang="stylus">
.navbar {
  --navbar-line-height: calc(
    var(--navbar-height) - var(--navbar-vertical-padding) * 2
  );

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 175;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  height: var(--navbar-height);
  padding: var(--navbar-vertical-padding) var(--navbar-horizontal-padding);

  background: var(--navbar-bg-color);
  box-shadow: 0 2px 8px var(--card-shadow-color);

  line-height: var(--navbar-line-height);
  white-space: nowrap;

  transition: transform ease-in-out 0.3s,
    background-color var(--color-transition), box-shadow var(--color-transition);

  backdrop-filter: saturate(150%) blur(12px);

  .hide-navbar &.auto-hide {
    transform: translateY(-100%);
  }

  .nav-link {
    padding: 0 0.25rem;
    color: var(--dark-grey);

    &.active {
      color: var(--theme-color);
    }

    .icon {
      margin-right: 0.25em;
      font-size: 1em;
    }
  }
}

.navbar-left,
.navbar-right,
.navbar-center {
  display: flex;
  align-items: center;

  > * {
    position: relative;
    margin: 0 0.25rem !important;

    &:first-child {
      margin-left: 0 !important;
    }

    &:last-child {
      margin-right: 0 !important;
    }
  }
}

// docsearch fix
.DocSearch {
  &.DocSearch-Button {
    margin-left: 0;
  }


  &.DocSearch-Container {
    position: fixed !important;
  }
}
</style>
