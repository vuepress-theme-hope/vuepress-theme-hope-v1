import { capitalize } from "vuepress-shared/lib/client";
import Vue from "vue";
import CategoryIcon from "@theme/icons/CategoryIcon.vue";

export default Vue.extend({
  name: "CategoryInfo",

  components: { CategoryIcon },

  props: {
    category: { type: String, default: "" },
    categoryPath: { type: String, default: "" },
  },

  computed: {
    name(): string {
      if (this.category) return capitalize(this.category);

      const { category } = this.$frontmatter;

      // FIXME: Support mutiple categories
      return Array.isArray(category)
        ? capitalize(category[0] || "")
        : category
        ? capitalize(category)
        : "";
    },

    path(): string {
      return this.categoryPath.replace(/\$category/g, decodeURI(this.name));
    },

    hint(): string {
      return this.$themeLocaleConfig.metaLocales.category;
    },
  },

  methods: {
    navigate(): void {
      if (this.$route.path !== this.path) void this.$router.push(this.path);
    },
  },
});
