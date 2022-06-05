<template>
  <transition name="fade">
    <button
      v-if="display"
      :aria-label="hint"
      class="back-to-top"
      data-balloon-pos="left"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z"
          fill="currentColor"
        />
        <path
          d="m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z"
          fill="currentColor"
        />
      </svg>
    </button>
  </transition>
</template>

<script src="./BackToTop" />

<style lang="stylus">
@require '~vuepress-shared/styles/reset';

.back-to-top {
  button();

  position: fixed !important;
  right: 1rem;
  bottom: 4rem;
  z-index: 100;

  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 1rem;

  background-color: var(--bg-color, #fff);
  color: var(--accent-color, #3eaf7c);
  box-shadow: 0 2px 12px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.15));

  @media (max-width: $MQMobile) {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  &:hover {
    color: var(--accent-color-light, #4abf8a);
  }

  svg {
    overflow: hidden;
    width: 100%;
    border-radius: 50%;
    fill: currentcolor;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--color-transition, 0.3s ease);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
