import Vue from "vue";
import AuthorInfo from "./AuthorInfo.vue";
import CategoryInfo from "./CategoryInfo.vue";
import ReadingTimeInfo from "./ReadingTimeInfo.vue";
import TagInfo from "./TagInfo.vue";
import TimeInfo from "./TimeInfo.vue";
import VisitorInfo from "./VisitorInfo.vue";
import WordInfo from "./WordInfo.vue";
import { pageInfoLocales } from "./define";

import type { PropType } from "vue";
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

  props: {
    titleIcon: {
      type: Boolean,
      default: true,
    },

    titleIconPrefix: {
      type: String,
      default: "",
    },

    items: {
      type: Array as PropType<PageInfo[]>,
      default: (): PageInfo[] => [
        "author",
        "visitor",
        "time",
        "category",
        "tag",
        "reading-time",
      ],
    },

    defaultAuthor: {
      type: String,
      default: "",
    },

    categoryPath: {
      type: String,
      default: "",
    },

    tagPath: {
      type: String,
      default: "",
    },

    visitor: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    config(): PageInfo[] | false {
      const pageConfig = this.$page.frontmatter.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : this.items;
    },

    isOriginal(): boolean {
      return this.$frontmatter.original === true;
    },

    originText(): string {
      return pageInfoLocales[this.$localePath || "/"].origin;
    },
  },
});
