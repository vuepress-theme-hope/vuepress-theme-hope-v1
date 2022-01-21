import Vue from "vue";
import AuthorInfo from "./AuthorInfo.vue";
import CategoryInfo from "./CategoryInfo.vue";
import ReadingTimeInfo from "./ReadingTimeInfo.vue";
import TagInfo from "./TagInfo.vue";
import TimeInfo from "./TimeInfo.vue";
import VisitorInfo from "./VisitorInfo.vue";
import WordInfo from "./WordInfo.vue";
import { commentOptions, pageInfoLocales } from "./define";

import type { PageInfo } from "../types";

import "balloon-css";

export default Vue.extend({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    ReadingTimeInfo,
    TagInfo,
    TimeInfo,
    VisitorInfo,
    WordInfo,
  },

  data: () => ({
    options: commentOptions,
  }),

  computed: {
    config(): PageInfo[] | false {
      const pluginConfig = this.options.pageInfo;
      const pageConfig = this.$page.frontmatter.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig === false
        ? false
        : Array.isArray(pluginConfig)
        ? pluginConfig
        : ["author", "visitor", "time", "category", "tag", "reading-time"];
    },

    isOriginal(): boolean {
      return this.$frontmatter.original === true;
    },

    originText(): string {
      return pageInfoLocales[this.$localePath || "/"].origin;
    },
  },
});
