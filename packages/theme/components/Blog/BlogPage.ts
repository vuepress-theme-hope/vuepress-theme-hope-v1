import Vue from "vue";
import ArticleList from "@theme/components/Blog/ArticleList.vue";
import ArticleType from "@theme/components/Blog/ArticleType.vue";
import CategoryList from "@theme/components/Blog/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import TagList from "@theme/components/Blog/TagList.vue";
import Timeline from "@theme/components/Blog/Timeline.vue";

export default Vue.extend({
  name: "BlogPage",

  components: {
    ArticleList,
    ArticleType,
    CategoryList,
    MyTransition,
    TagList,
    Timeline,
  },

  computed: {
    showArticles(): boolean {
      const { path } = this.$route;

      return !path.includes("/timeline");
    },

    componentName(): string {
      const pathName = this.$route.path.split("/")[1];

      if (["category", "tag"].includes(pathName)) return `${pathName}List`;
      else if (pathName === "timeline") return "timeline";

      return "articleType";
    },
  },
});
