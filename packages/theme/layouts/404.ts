import Vue from "vue";
import Common from "@theme/components/Common.vue";
import Page404Icon from "@theme/icons/Page404Icon.vue";

import type { HopeThemeRouteLocaleData } from "@theme/types";

export default Vue.extend({
  name: "NotFound",

  components: {
    Common,
    Page404Icon,
  },

  computed: {
    locale(): HopeThemeRouteLocaleData {
      return this.$themeLocaleConfig.routeLocales;
    },

    msg(): string {
      return this.locale["404msg"][
        Math.floor(Math.random() * this.locale["404msg"].length)
      ];
    },
  },

  methods: {
    back(): void {
      window.history.go(-1);
    },
  },
});
