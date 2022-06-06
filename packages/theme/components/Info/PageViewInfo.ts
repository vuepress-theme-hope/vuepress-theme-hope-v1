import Vue from "vue";
import EyeIcon from "@theme/icons/EyeIcon.vue";
import FireIcon from "@theme/icons/FireIcon.vue";

import type { Route } from "vue-router";

export default Vue.extend({
  name: "PageViewInfo",

  components: { EyeIcon, FireIcon },

  props: {
    visitor: { type: Boolean, default: false },
  },

  data: () => ({
    count: 0,
  }),

  computed: {
    /** visitorID, use current path */
    visitorID(): string {
      const { base } = this.$site;

      return base
        ? `${base.slice(0, base.length - 1)}${this.$page.path}`
        : this.$page.path;
    },

    hint(): string {
      return this.$themeLocaleConfig.metaLocales.views;
    },
  },

  watch: {
    $route(to: Route, from: Route): void {
      if (to.path !== from.path)
        setTimeout(() => {
          this.getCount();
        }, 500);
    },
  },

  mounted(): void {
    setTimeout(() => {
      this.getCount();
    }, 1500);
  },

  methods: {
    // show fire icon depending on the views number
    getCount(): void {
      const countElement = document.querySelector(
        ".leancloud_visitors .leancloud-visitors-count"
      );

      if (countElement) {
        const count = countElement.textContent;

        if (count && !isNaN(Number(count))) this.count = Number(count);
        else
          setTimeout(() => {
            this.getCount();
          }, 500);
      }
    },
  },
});
