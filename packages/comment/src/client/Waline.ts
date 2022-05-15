import Vue from "vue";
import { Route } from "vue-router";
import { walineLocales } from "./define";

import type { WalineLocale, WalineInstance } from "@waline/client";
import type { PropType } from "vue";
import type { WalineOptions } from "../types";

let timeout: NodeJS.Timeout | null = null;

export default Vue.extend({
  name: "Waline",

  props: {
    config: {
      type: Object as PropType<WalineOptions>,
      required: true,
    },
  },

  data: () => ({
    waline: null as WalineInstance | null,
  }),

  computed: {
    enable(): boolean {
      const { config } = this;

      return Boolean(config.serverURL);
    },

    enableComment(): boolean {
      if (!this.enable) return false;

      const globalEnable = this.config.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    enablePageview(): boolean {
      if (!this.enable) return false;

      const globalEnable = this.config.visitor !== false;
      const pageEnable = this.$page.frontmatter.visitor;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },
  },

  watch: {
    $route(to: Route, from: Route): void {
      // Refresh comment when navigating to a new page
      if (to.path !== from.path) {
        Vue.nextTick(() => {
          if (timeout) clearTimeout(timeout);

          timeout = setTimeout(() => {
            this.waline?.update({
              path: this.$withBase(this.$route.path),
              visitor: this.enablePageview,
            });
          }, this.config.delay);
        });
      }
    },
  },

  mounted(): void {
    if (this.enable)
      timeout = setTimeout(() => {
        const { config } = this;

        void import(/* webpackChunkName: "waline" */ "@waline/client").then(
          ({ default: Waline }) => {
            this.waline = Waline({
              el: "#waline-comment",
              lang: this.$lang === "zh-CN" ? "zh-CN" : "en-US",
              locale: {
                ...walineLocales[this.$localePath || "/"],
                ...(config.locale || {}),
              } as WalineLocale,
              emoji: [
                "//unpkg.com/@waline/emojis@1.0.1/weibo",
                "//unpkg.com/@waline/emojis@1.0.1/bilibili",
              ],
              dark: "body.theme-dark",
              ...config,
              visitor: this.enablePageview,
              path: this.$withBase(this.$route.path),
            }) as WalineInstance;
          }
        );
      }, this.config.delay);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    if (timeout) clearTimeout(timeout);
    this.waline?.destroy();
  },
});
