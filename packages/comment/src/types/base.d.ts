import type { LocaleConfig } from "@mr-hope/vuepress-shared";
import type { PageInfoLocaleData, PageInfo } from "./pageInfo";

export interface BaseCommentOptions {
  /**
   * 默认作者
   *
   * Default author
   */
  author?: string;

  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/comment/config/#pageinfo
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/comment/zh/config/#pageinfo
   *
   * @default ['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']
   */
  pageInfo?: PageInfo[] | false;

  /**
   * Whether enable comment by default
   *
   * 是否默认启用评论
   *
   * @default true
   */
  comment?: boolean;

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

  /**
   * Reading speed of words per minute
   *
   * 每分钟阅读字数
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * The delay of dom operation, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 进行 DOM 操作的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * Locales config for pageInfo
   *
   * 页面信息的国际化配置
   */
  pageInfoLocales?: LocaleConfig<PageInfoLocaleData>;
}
