import Vue from "vue";

import type { HopeThemeLocaleData } from "@theme/types";

export default Vue.extend({
  name: "Password",

  props: {
    page: { type: Boolean, default: false },
  },

  data: () => ({
    password: "",
    hasTried: false,
  }),

  computed: {
    isMainPage(): boolean {
      return this.$frontmatter["home"] === true;
    },

    encrypt(): HopeThemeLocaleData["encrypt"] {
      return this.$themeLocaleConfig.encrypt;
    }
  },

  methods: {
    verify(): void {
      this.hasTried = false;
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit("password-verify", this.password);

      void Vue.nextTick().then(() => {
        this.hasTried = true;
      });
    },
  },
});
