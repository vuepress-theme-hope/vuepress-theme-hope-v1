import Vue from "vue";
import AuthorIcon from "./icons/AuthorIcon.vue";
import { commentOptions, pageInfoLocales } from "./define";

export default Vue.extend({
  name: "AuthorInfo",
  components: { AuthorIcon },

  data: () => ({
    commentOption: commentOptions,
  }),

  computed: {
    author(): string {
      const { author } = this.$frontmatter;

      return (
        author || (author === false ? "" : this.commentOption.author || "")
      );
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].author;
    },
  },
});
