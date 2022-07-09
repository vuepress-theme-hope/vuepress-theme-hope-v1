import Vue from "vue";
import type { Route } from "vue-router";
import type { ValineOptions } from "../../types";

let timeout: NodeJS.Timeout | null = null;
const options = COMMENT_OPTIONS as ValineOptions;
const locales = VALINE_LOCALES;

export default Vue.extend({
  name: "Valine",

  computed: {
    enable(): boolean {
      return Boolean(options.appId && options.appKey);
    },

    enableComment(): boolean {
      if (!this.enable) return false;

      const globalEnable = options.comment !== false;
      const pageEnable = this.$page.frontmatter.comment;

      return (globalEnable && pageEnable !== false) || pageEnable === true;
    },

    /** Whether to display view number */
    enablePageview(): boolean {
      if (!this.enable) return false;
      const globalEnable = options.visitor !== false;
      const pageEnable = this.$page.frontmatter.pageview;

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
          }, options.delay);
        });
    },
  },

  mounted(): void {
    if (this.enable)
      timeout = setTimeout(() => {
        this.initValine();
      }, options.delay);
  },

  methods: {
    // Init valine
    initValine(): void {
      void import(/* webpackChunkName: "valine" */ "valine").then(
        (valineConstructor) => {
          const valine = new valineConstructor.default();

          valine.init({
            el: "#valine",
            appId: options.appId, // Your appId
            appKey: options.appKey, // Your appKey
            placeholder:
              options.placeholder || locales[this.$localePath].placeholder,
            meta: options.meta || ["nick", "mail"],
            requiredFields: options.requiredFields || ["nick"],
            avatar: options.avatar || "retro",
            visitor: this.enablePageview,
            recordIP: options.recordIP || false,
            path: typeof window === "undefined" ? "" : window.location.pathname,
            pageSize: options.pageSize || 10,
            enableQQ: options.enableQQ || true,
            emojiCDN: options.emojiCDN || "",
            emojiMaps: options.emojiMaps || {},
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
          });
        }
      );
    },
  },
});
