import Vue from "vue";
import Common from "@theme/components/Common.vue";
import Page404Icon from "@theme/icons/Page404Icon.vue";

import type { HopeThemeLocaleData } from "@theme/types";

export default Vue.extend({
  name: "NotFound",

  components: {
    Common,
    Page404Icon,
  },

  computed: {
    locales(): HopeThemeLocaleData["error404"] {
      return this.$themeLocaleConfig.error404;
    },

    msg(): string {
      return this.locales.hint[
        Math.floor(Math.random() * this.locales.hint.length)
      ];
    },
  },

  methods: {
    back(): void {
      window.history.go(-1);
    },
  },
});
