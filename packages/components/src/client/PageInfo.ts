import Vue from "vue";
import AuthorInfo from "./pageinfo/AuthorInfo.vue";
import CategoryInfo from "./pageinfo/CategoryInfo.vue";
import ReadingTimeInfo from "./pageinfo/ReadingTimeInfo.vue";
import TagInfo from "./pageinfo/TagInfo.vue";
import TimeInfo from "./pageinfo/TimeInfo.vue";
import VisitorInfo from "./pageinfo/VisitorInfo.vue";
import WordInfo from "./pageinfo/WordInfo.vue";
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
