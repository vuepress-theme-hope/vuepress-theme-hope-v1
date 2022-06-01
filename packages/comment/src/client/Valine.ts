import Vue from "vue";
import { Route } from "vue-router";
import { ValineOptions } from "../types";
import { valineLocales } from "./define";

import type { PropType } from "vue";

let timeout: NodeJS.Timeout | null = null;

export default Vue.extend({
  name: "Valine",

  props: {
    config: {
      type: Object as PropType<ValineOptions>,
      required: true,
    },
  },

  computed: {
    enable(): boolean {
      const { config } = this;

      return Boolean(config && config.appId && config.appKey);
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
      if (to.path !== from.path)
        // Refresh comment when navigating to a new page
        Vue.nextTick(() => {
          if (timeout) clearTimeout(timeout);

          timeout = setTimeout(() => {
            this.initValine();
          }, this.config.delay);
        });
    },
  },

  mounted(): void {
    if (this.enable)
      timeout = setTimeout(() => {
        this.initValine();
      }, this.config.delay);
  },

  methods: {
    // Init valine
    initValine(): void {
      const { config } = this;

      void import(/* webpackChunkName: "valine" */ "valine").then(
        (valineConstructor) => {
          const valine = new valineConstructor.default();

          valine.init({
            el: "#valine",
            appId: config.appId, // Your appId
            appKey: config.appKey, // Your appKey
            placeholder:
              config.placeholder ||
              valineLocales[this.$localePath || "/"].placeholder,
            meta: config.meta || ["nick", "mail"],
            requiredFields: config.requiredFields || ["nick"],
            avatar: config.avatar || "retro",
            visitor: this.enablePageview,
            recordIP: config.recordIP || false,
            path: typeof window === "undefined" ? "" : window.location.pathname,
            pageSize: config.pageSize || 10,
            enableQQ: config.enableQQ || true,
            emojiCDN: config.emojiCDN || "",
            emojiMaps: config.emojiMaps || {},
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
          });
        }
      );
    },
  },
});
