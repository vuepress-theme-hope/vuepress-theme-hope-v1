import Vue from "vue";

import type { TwikooOptions } from "../../types";

import "../styles/twikoo.styl";

const twikooOption = COMMENT_OPTIONS as TwikooOptions;

const enableTwikoo = Boolean(twikooOption.envId);

export default Vue.extend({
  name: "TwikooComment",

  data: () => ({ id: 0 }),

  computed: {
    enableComment(): boolean {
      if (!enableTwikoo) return false;
      const pluginConfig = twikooOption.comment !== false;
      const pageConfig = this.$frontmatter.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    },
  },

  mounted() {
    if (enableTwikoo) this.initTwikoo();
  },

  methods: {
    initTwikoo(): void {
      const timeID = (this.id = new Date().getTime());

      void Promise.all([
        import("twikoo"),
        new Promise<void>((resolve) => {
          setTimeout(resolve, twikooOption.delay);
        }),
      ]).then(([{ init }]) => {
        if (timeID === this.id)
          void init({
            lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
            ...twikooOption,
            el: "#twikoo-comment",
          });
      });
    },
  },

  render(h) {
    return h(
      "div",
      {
        class: "twikoo-wrapper",
        style: { display: this.enableComment ? "block" : "none" },
      },
      [h("div", { attrs: { id: "twikoo-comment" } })]
    );
  },
});
