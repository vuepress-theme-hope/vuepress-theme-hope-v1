import { capitalize } from "@mr-hope/vuepress-shared";
import Vue from "vue";
import CategoryIcon from "./icons/CategoryIcon.vue";
import { pageInfoLocales } from "../define";

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

      return category ? capitalize(category) : "";
    },

    path(): string {
      return this.categoryPath.replace(/\$category/g, decodeURI(this.name));
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].category;
    },
  },

  methods: {
    navigate(): void {
      if (this.$route.path !== this.path) void this.$router.push(this.path);
    },
  },
});
