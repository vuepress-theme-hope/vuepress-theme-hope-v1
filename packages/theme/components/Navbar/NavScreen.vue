<template>
  <Transition name="fade">
    <div v-if="active" id="nav-screen">
      <div class="container">
        <slot name="before" />
        <NavScreenLinks />
        <!-- <div class="outlook-wrapper">
          <OutlookSettings />
        </div> -->
        <slot name="after" />
      </div>
    </div>
  </Transition>
</template>

<script src="./NavScreen" />

<style lang="stylus">
#nav-screen {
  position: fixed;
  top: var(--navbar-height);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 150;

  overflow-y: auto;

  padding: 0 2rem;

  background-color: var(--bg-color);

  transition: background-color 0.5s;

  @media (min-width: $MQMobile) {
    display: none;
  }

  .container {
    max-width: 320px;
    margin: 0 auto;
    padding: 2rem 0 4rem;
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.25s;

    .container {
      transition: transform 0.25s ease;
    }
  }

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;

    .container {
      transform: translateY(-8px);
    }
  }

  .outlook-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .icon {
    margin-right: 0.25em;
  }
}
</style>
