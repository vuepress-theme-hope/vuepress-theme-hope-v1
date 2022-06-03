import { getAuthor } from "@mr-hope/vuepress-shared/lib/client";
import Vue from "vue";
import AuthorIcon from "./icons/AuthorIcon.vue";
import { pageInfoLocales } from "../define";

export default Vue.extend({
  name: "AuthorInfo",

  components: { AuthorIcon },

  props: {
    defaultAuthor: {
      type: String,
      default: "",
    },
  },

  computed: {
    author(): string {
      const { author } = this.$frontmatter;

      return getAuthor(author)[0]?.name || this.defaultAuthor;
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].author;
    },
  },
});
