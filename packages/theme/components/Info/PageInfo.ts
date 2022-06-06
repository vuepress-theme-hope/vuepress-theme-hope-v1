import Vue from "vue";
import AuthorInfo from "@theme/components/Info/AuthorInfo.vue";
import CategoryInfo from "@theme/components/Info/CategoryInfo.vue";
import DateInfo from "@theme/components/Info/DateInfo.vue";
import PageViewInfo from "@theme/components/Info/PageViewInfo.vue";
import ReadingTimeInfo from "@theme/components/Info/ReadingTimeInfo.vue";
import TagInfo from "@theme/components/Info/TagInfo.vue";
import WordInfo from "@theme/components/Info/WordInfo.vue";

import type { PropType } from "vue";
import type { PageInfo } from "@theme/types";

export interface PageInfoProps {
  /**
   * Default author
   *
   * 默认作者
   */
  defaultAuthor?: string;

  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/v1/components/guide/pageinfo/
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/v1/components/zh/guide/pageinfo/
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  items?: PageInfo[] | false;

  /**
   * Path to navigate when clicking category label
   *
   * `$category` will be automatically replaced by currect category name
   *
   * 点击分类标签时跳转的路径。
   *
   * 其中 `$category` 会被自动替换为当前分类名称
   */
  categoryPath?: string;

  /**
   * Path to navigate when clicking tag label
   *
   * `$tag` will be automatically replaced by currect tag name
   *
   * 点击标签跳转的路径。
   *
   * 其中 `$tag` 会被自动替换为当前分类名称
   */
  tagPath?: string;

  /**
   * Whether display icon besides title
   *
   * 是否在标题旁显示图标
   *
   * @default false
   */

  titleIcon?: boolean;

  /**
   * Title icon prefix
   *
   * 标题图标 class 前缀
   */
  titleIconPrefix?: string;
}

export default Vue.extend({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo,
  },

  props: {
    titleIcon: {
      type: Boolean,
      default: true,
    },

    titleIconPrefix: {
      type: String,
      default: "",
    },

    items: {
      type: Array as PropType<PageInfo[]>,
      default: (): PageInfo[] => [
        "Author",
        "PageView",
        "Date",
        "Category",
        "Tag",
        "ReadingTime",
      ],
    },

    defaultAuthor: {
      type: String,
      default: "",
    },

    categoryPath: {
      type: String,
      default: "",
    },

    tagPath: {
      type: String,
      default: "",
    },

    visitor: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    config(): PageInfo[] | false {
      const pageConfig = this.$page.frontmatter.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : this.items;
    },

    isOriginal(): boolean {
      return this.$frontmatter.isOriginal === true;
    },

    originText(): string {
      return this.$themeLocaleConfig.metaLocales.origin;
    },
  },
});
