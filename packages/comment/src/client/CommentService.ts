import Vue from "vue";
import CommentProvider from "@CommentProvider";

export default Vue.extend({
  name: "CommentService",

  components: {
    CommentProvider,
  },

  data: () => ({
    options: COMMENT_OPTIONS,
  }),

  computed: {
    pluginEnable(): boolean {
      return (
        this.options.type !== "disable" &&
        (this.$frontmatter.comment || this.options.comment !== false)
      );
    },
  },
});
