import MediaLinks from "@theme/components/MediaLinks.vue";
import { timelineMixin } from "@theme/mixins/timeline";
import { filterArticle } from "@theme/utils/article";
import { navigate } from "@theme/utils/navigate";

import type { BlogOptions, HopeThemeBlogLocaleData } from "@theme/types";

export default timelineMixin.extend({
  name: "BloggerInfo",

  components: { MediaLinks },

  computed: {
    blogConfig(): BlogOptions {
      return this.$themeConfig.blog || {};
    },

    bloggerName(): string {
      return (
        this.blogConfig.name ||
        this.$themeConfig.author ||
        this.$siteTitle ||
        ""
      );
    },

    bloggerAvatar(): string {
      return this.blogConfig.avatar || this.$themeConfig.logo || "";
    },

    hasIntro(): boolean {
      return Boolean(this.blogConfig.intro);
    },

    hintAttr(): string {
      return this.hasIntro ? "aria-label" : "";
    },

    locale(): HopeThemeBlogLocaleData {
      return this.$themeLocaleConfig.blogLocales;
    },

    articleNumber(): number {
      return filterArticle(this.$site.pages).length;
    },
  },

  methods: {
    navigate(url: string): void {
      navigate(url, this.$router, this.$route);
    },

    jumpIntro(): void {
      if (this.hasIntro)
        navigate(this.blogConfig.intro as string, this.$router, this.$route);
    },
  },
});
