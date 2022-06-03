import Vue from "vue";
import { filterArticle, sortArticle } from "@theme/utils/article";

import type { BasePage } from "@mr-hope/vuepress-types";

export const starMixin = Vue.extend({
  computed: {
    $starArticles(): BasePage[] {
      const { pages } = this.$site;

      // filter before sort
      return sortArticle(
        filterArticle(pages, (page) => Boolean(page.frontmatter.star)),
        "star"
      );
    },
  },
});
