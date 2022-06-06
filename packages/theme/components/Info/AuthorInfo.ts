import { getAuthor } from "vuepress-shared/lib/client";
import Vue from "vue";
import AuthorIcon from "@theme/icons/AuthorIcon.vue";

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
      return this.$themeLocaleConfig.metaLocales.author;
    },
  },
});
