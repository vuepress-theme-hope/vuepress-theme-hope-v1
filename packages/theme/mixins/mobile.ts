import Vue from "vue";

export const mobileMixin = Vue.extend({
  data: () => ({
    isMobile: false,
    // eslint-disable-next-line vue/no-reserved-keys
    _mobileHandler: null as null | (() => void),
  }),

  mounted(): void {
    this._mobileHandler = this.mobileHandler.bind(this);

    this._mobileHandler();

    window.addEventListener("resize", this._mobileHandler, false);
    window.addEventListener("orientationchange", this._mobileHandler, false);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this._mobileHandler!, false);
    window.removeEventListener(
      "orientationchange",
      this._mobileHandler!,
      false
    );
  },

  methods: {
    mobileHandler(): void {
      this.isMobile =
        window.innerWidth <= (this.$themeConfig.mobileBreakPoint || 719);
    },
  },
});
