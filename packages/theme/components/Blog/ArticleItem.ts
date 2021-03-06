import Vue from "vue";
import ArticleInfo from "@theme/components/Blog/ArticleInfo.vue";
import LockIcon from "@theme/icons/LockIcon.vue";
import PresentationIcon from "@theme/icons/PresentationIcon.vue";
import StickyIcon from "@theme/icons/StickyIcon.vue";
import { getPathMatchedKeys } from "@theme/utils/encrypt";

import type { BasePage } from "vuepress-typings";
import type { PropType } from "vue";

export default Vue.extend({
  name: "ArticleItem",

  components: { ArticleInfo, LockIcon, StickyIcon, PresentationIcon },

  props: {
    article: { type: Object as PropType<BasePage>, required: true },
  },

  computed: {
    isEncrypted(): boolean {
      return (
        getPathMatchedKeys(this.$themeConfig.encrypt, this.article.path)
          .length !== 0 || Boolean(this.article.frontmatter.password)
      );
    },

    excerpt(): string {
      if (this.article.excerpt) return this.article.excerpt;

      return (
        this.article.frontmatter.description ||
        (this.$themeConfig.blog && this.$themeConfig.blog.autoExcerpt === false
          ? ""
          : this.article.frontmatter.summary || "")
      );
    },
  },
});
