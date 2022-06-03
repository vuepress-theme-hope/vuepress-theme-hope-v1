import Vue from "vue";
import ArticleItem from "@theme/components/Blog/ArticleItem.vue";
import EmptyIcon from "@theme/icons/EmptyIcon.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import { filterArticle, sortArticle } from "@theme/utils/article";
import { getPathMatchedKeys } from "@theme/utils/encrypt";

import type { BlogOptions } from "@theme/types";
import type { BasePage } from "vuepress-typings";
import type { Route } from "vue-router";

export default Vue.extend({
  name: "ArticleList",

  components: { ArticleItem, EmptyIcon, MyTransition },

  data: () => ({
    currentPage: 1,
    articleList: [] as BasePage[],
  }),

  computed: {
    blogConfig(): BlogOptions {
      return this.$themeConfig.blog || {};
    },

    articlePerPage(): number {
      return this.blogConfig.perPage || 10;
    },

    filter(): ((page: BasePage) => boolean) | undefined {
      const { path } = this.$route;

      return path.includes("/article")
        ? (page: BasePage): boolean => page.frontmatter.layout !== "Slide"
        : path.includes("/star")
        ? (page: BasePage): boolean =>
            Boolean(page.frontmatter.star || page.frontmatter.sticky)
        : path.includes("/encrypt")
        ? (page: BasePage): boolean =>
            getPathMatchedKeys(this.$themeConfig.encrypt, page.path).length !==
              0 || Boolean(page.frontmatter.password)
        : path.includes("/slide")
        ? (page: BasePage): boolean => page.frontmatter.layout === "Slide"
        : undefined;
    },

    $articles(): BasePage[] {
      // filter then sort
      return sortArticle(
        filterArticle(this.$site.pages, this.filter),
        "sticky"
      );
    },

    /** Articles in this page */
    articles(): BasePage[] {
      return this.articleList.slice(
        (this.currentPage - 1) * this.articlePerPage,
        this.currentPage * this.articlePerPage
      );
    },
  },

  watch: {
    // update article list when route is changed
    $route(to: Route, from: Route): void {
      if (to.path !== from.path) {
        this.articleList = this.getArticleList();
        // reset page to 1
        this.currentPage = 1;
      }
    },

    currentPage(): void {
      // list top border distance
      const distance =
        (
          document.querySelector("#article-list") as Element
        ).getBoundingClientRect().top + window.scrollY;

      setTimeout(() => {
        window.scrollTo(0, distance);
      }, 100);
    },
  },

  mounted(): void {
    this.articleList = this.getArticleList();
  },

  methods: {
    getArticleList(): BasePage[] {
      try {
        return this.$pagination
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (this.$pagination._matchedPages as BasePage[])
          : this.$articles;
      } catch (err) {
        return this.$articles;
      }
    },
  },
});
