<template>
  <transition name="sw-hint-popup">
    <slot :reload="reload" :enabled="enabled" :message="message">
      <div
        v-if="enabled"
        class="sw-hint-popup"
        role="button"
        tabindex="0"
        @click="uninstall"
      >
        {{ message }}
        <span class="icon-wrapper">
          <UpdateIcon />
        </span>
      </div>
    </slot>
  </transition>
</template>

<script src="./SWHintPopup" />

<style lang="stylus">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.sw-hint-popup {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.15));
  background: var(--bg-color, #fff);
  color: var(--text-color, $textColor);
  line-height: 1.5;
  z-index: 110;
  cursor: pointer;

  .icon-wrapper {
    display: inline-block;
    vertical-align: middle;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.4em;
    background: var(--accent-color, $accentColor);
    border-radius: 0.75rem;

    svg {
      animation: rotate 3s ease infinite;
      width: 1.2em;
      height: 1.2em;
      margin: 0.15em;
      fill: var(--white, #fff);
    }
  }
}

.sw-hint-popup-enter-active, .sw-hint-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sw-hint-popup-enter, .sw-hint-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
