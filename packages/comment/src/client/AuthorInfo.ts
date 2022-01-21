import Vue from "vue";
import AuthorIcon from "./icons/AuthorIcon.vue";
import { pageInfoLocales } from "./define";

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

      return author || (author === false ? "" : this.defaultAuthor);
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].author;
    },
  },
});
