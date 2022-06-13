import Vue from "vue";

export default Vue.extend({
  name: "NavbarBrand",

  computed: {
    siteBrandLink() {
      return this.$themeLocaleConfig.home || this.$localePath;
    },

    siteBrandTitle() {
      return this.$siteTitle;
    },

    siteBrandLogo() {
      return this.$themeLocaleConfig.logo
        ? this.$withBase(this.$themeLocaleConfig.logo)
        : null;
    },

    siteBrandLogoDark() {
      return this.$themeLocaleConfig.logoDark
        ? this.$withBase(this.$themeLocaleConfig.logoDark)
        : null;
    },
  },
});
