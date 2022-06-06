import ArticleIcon from "@theme/icons/ArticleIcon.vue";
import CategoryIcon from "@theme/icons/CategoryIcon.vue";
import TagIcon from "@theme/icons/TagIcon.vue";
import TimeIcon from "@theme/icons/TimeIcon.vue";
import CategoryList from "@theme/components/Blog/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import TagList from "@theme/components/Blog/TagList.vue";
import TimelineList from "@theme/components/Blog/TimelineList.vue";
import { filterArticle } from "@theme/utils/article";
import { starMixin } from "@theme/mixins/star";

import type { HopeThemeBlogLocaleData } from "@theme/types";

export default starMixin.extend({
  name: "BlogInfo",

  components: {
    ArticleIcon,
    CategoryIcon,
    CategoryList,
    MyTransition,
    TagIcon,
    TagList,
    TimeIcon,
    TimelineList,
  },

  data: () => ({
    active: "category",
  }),

  computed: {
    locale(): HopeThemeBlogLocaleData {
      return this.$themeLocaleConfig.blogLocales;
    },

    articleNumber(): number {
      return filterArticle(this.$site.pages).length;
    },
  },

  methods: {
    setActive(name: string): void {
      this.active = name;
    },

    navigate(path: string): void {
      if (this.$route.path !== path) void this.$router.push(path);
    },
  },
});
