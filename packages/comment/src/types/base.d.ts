import type { LocaleConfig } from "@mr-hope/vuepress-shared";
import type { PageInfoLocaleData, PageInfo } from "./pageInfo";

export interface BaseCommentOptions {
  /**
   * 评论服务
   *
   * Comment Service
   */
  type: "valine" | "vssue" | "disable";

  /**
   * 默认作者
   *
   * Default author
   */
  author?: string;

  /**
   * 文章信息配置
   *
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/comment/zh/config/#pageinfo (zh)
   * @see https://vuepress-theme-hope.github.io/comment/config/#pageinfo (en)
   *
   * @default ['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']
   */
  pageInfo?: PageInfo[] | false;

  /**
   * 是否默认启用评论
   *
   * Whether enable comment by default
   *
   * @default true
   */
  comment?: boolean;

  /**
   * 每分钟阅读字数
   *
   * Reading speed of words per minute
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * 进行 DOM 操作的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * The delay of dom operation, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * Locales config for pageInfo
   */
  pageInfoLocales?: LocaleConfig<PageInfoLocaleData>;
}
