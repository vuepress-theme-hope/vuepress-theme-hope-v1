import ArticleIcon from "@theme/icons/ArticleIcon.vue";
import CategoryIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/CategoryIcon.vue";
import TagIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/TagIcon.vue";
import TimeIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/TimeIcon.vue";
import CategoryList from "@theme/components/Blog/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import TagList from "@theme/components/Blog/TagList.vue";
import TimelineList from "@theme/components/Blog/TimelineList.vue";
import { filterArticle } from "@theme/utils/article";
import { starMixin } from "@theme/mixins/star";

import type { HopeThemeLocaleData } from "@theme/types";

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
    locales(): HopeThemeLocaleData["blog"] {
      return this.$themeLocaleConfig.blog;
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
