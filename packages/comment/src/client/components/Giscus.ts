import Vue from "vue";

import type { VNode } from "vue";
import type { GiscusLang, GiscusMapping, GiscusProps } from "../utils";
import type { GiscusOptions } from "../../types";

import "../styles/giscus.styl";

const SUPPORTED_LANGUAGES: GiscusLang[] = [
  "de",
  "gsw",
  "en",
  "es",
  "fr",
  "id",
  "it",
  "ja",
  "ko",
  "pl",
  "ro",
  "ru",
  "vi",
  "zh-CN",
  "zh-TW",
];

const giscusOption = COMMENT_OPTIONS as GiscusOptions;

const enableGiscus = Boolean(
  giscusOption.repo &&
    giscusOption.repoId &&
    giscusOption.category &&
    giscusOption.categoryId
);

export default Vue.extend({
  name: "GiscusComment",

  props: {
    darkmode: Boolean,
  },

  data: () => ({
    loaded: false,
  }),

  computed: {
    giscusLang(): GiscusLang {
      const lang = this.$lang as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(lang)) return lang;

      const shortCode = lang.split("-")[0] as GiscusLang;

      if (SUPPORTED_LANGUAGES.includes(shortCode)) return shortCode;

      return "en";
    },

    enableComment(): boolean {
      if (!enableGiscus) return false;
      const pluginConfig = giscusOption.comment !== false;
      const pageConfig = this.$frontmatter.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    },

    config(): GiscusProps {
      return {
        repo: giscusOption.repo as `${string}/${string}`,
        repoId: giscusOption.repoId,
        category: giscusOption.category,
        categoryId: giscusOption.categoryId,
        lang: this.giscusLang,
        theme: this.darkmode ? "dark" : "light",
        mapping: (giscusOption.mapping || "specific") as GiscusMapping,
        term: this.$withBase(this.$route.path),
        inputPosition: giscusOption.inputPosition || "top",
        reactionsEnabled: giscusOption.reactionsEnabled !== false ? "1" : "0",
        emitMetadata: "0",
      };
    },
  },

  mounted() {
    void import("giscus").then(() => {
      this.loaded = true;
    });
  },

  render(h): VNode {
    return h(
      "div",
      {
        class: [
          "giscus-wrapper",
          { "input-top": giscusOption.inputPosition !== "bottom" },
        ],
        style: {
          display: this.enableComment ? "block" : "none",
        },
      },
      [this.loaded ? h("giscus-widget", { props: this.config }) : ""]
    );
  },
});
