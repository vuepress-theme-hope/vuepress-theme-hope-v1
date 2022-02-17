<template>
  <transition name="fade">
    <div v-if="visible" class="v2-notice-wrapper">
      <div class="title">
        <span>📢 {{ locale.title }}</span>
        <svg
          class="icon-close"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          @click="close"
        >
          <path
            d="M512 34.133a486.4 486.4 0 1 0 486.4 486.4A486.4 486.4 0 0 0 512 34.133zM721.485 666.94l-55.603 55.466-151.518-151.125-151.518 151.117-55.603-55.467L458.76 515.823 307.243 364.715l55.603-55.467 151.518 151.125 151.518-151.116 55.603 55.466-151.518 151.1zm0 0"
            fill="currentColor"
          />
        </svg>
      </div>
      <p class="content" v-html="locale.text" />
      <hr />
      <div class="footer">
        <button class="action" @click="v2docs" v-html="locale.button" />
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from "vue";

const locales = {
  "/": {
    title: "V2 is ready",
    text: 'We welcome you to switch to "Next" tag using the V2 version of the theme based on VuePress2. <br>The V2 version has been completely refactored, with richer functions and better outlook. The theme is based on Vue3, built with Vite by default, and the performance and startup speed have been greatly improved!"',
    button: "V2 Docs",
  },
  "/zh/": {
    title: "V2 版本已就绪",
    text: "欢迎你切换到 Next 频道以使用基于 VuePress2 的 V2 版本主题。<br>V2 版本进行了全新的重构，功能更加丰富央视更加美观。主题基于 Vue3, 默认使用 Vite 构建，性能和启动速度都有极大提升!",
    button: "V2 文档",
  },
};

export default Vue.extend({
  name: "V2Notice",

  data: () => ({
    visible: false,
  }),

  mounted() {
    const hasBeenClosed = sessionStorage.getItem("v2-notice");

    this.visible = hasBeenClosed !== "true";
  },

  computed: {
    locale() {
      return locales[this.$localePath];
    },
  },

  methods: {
    close() {
      this.visible = false;
      sessionStorage.setItem("v2-notice", "true");
    },

    v2docs() {
      window.open(
        `https://vuepress-theme-hope.github.io/v2${this.$localePath}`
      );
      this.close();
    },
  },
});
</script>

<style lang="stylus" scoped>
.v2-notice-wrapper
  position fixed
  top 80px
  right 20px
  z-index 500
  width 250px

  border-radius 8px
  background var(--bgcolor)
  box-shadow 0 2px 6px 0 var(--card-shadow-color)
  overflow hidden

  .title
    position relative
    padding 10px
    margin 0
    background var(--accent-color)
    color var(--white)


    .icon-close
      display inline-block
      vertical-align middle
      float right
      width 22px
      height 22px
      margin auto

      cursor pointer

  .content
    padding 10px 15px 0
    font-size 14px


  .footer
    padding-bottom 12px
    text-align center

    .action
      display inline-block
      background-color var(--accent-color)
      padding 6px 12px
      border-radius 8px
      border none
      color var(--white)
      box-shadow var(--box-shadow)
      cursor pointer

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
