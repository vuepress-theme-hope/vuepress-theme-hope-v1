import type { LocaleConfig } from "vuepress-shared";
import type { BackToTopLocaleData, ExternalLinkLocaleData } from "./locales";
import type { PageInfoLocaleData } from "./pageInfo";
import type { PaginationLocaleData } from "./pagination";

export type AvailableComponent =
  | "Badge"
  // | "CodePen"
  | "ExternalLinkIcon"
  | "FontIcon";
// | "PDF"
// | "StackBlitz";

export interface ComponentOptions {
  /**
   * Components to be registered
   *
   * 需要被注册的组件
   *
   * @default []
   */
  components: AvailableComponent[];

  /**
   * Whether enabling backToTop button
   *
   *
   * @description When setting a number, it will be used as backToTop button threshold distance (in pixels)
   *
   * 是否启用返回顶部按钮
   *
   * @description 当设置为数字时，将会作为返回顶部按钮距离阈值 (单位: 像素)
   *
   * @default false
   */
  backToTop?: number | boolean;

  /**
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTopLocales?: LocaleConfig<BackToTopLocaleData>;

  /**
   * Whether register breadcrumb component
   *
   * 是否注册路径导航
   *
   * @default false
   */
  breadcrumb?: boolean;

  /**
   * Locales config for external link
   *
   * 国际化配置
   */
  externalLinkLocales?: LocaleConfig<ExternalLinkLocaleData>;

  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `'iconfont'` and `'font-awesome'` keywords are supported
   */
  iconAssets?: string;

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ''
   */
  iconPrefix?: string;

  /**
   * Whether register pageinfo component
   *
   * 是否注册页面信息
   *
   * @default false
   */
  pageinfo?: boolean;

  /**
   * Whether register pagination component
   *
   * 是否注册分页组件
   *
   * @default false
   */
  pagination?: boolean;

  /**
   * Whether register scrennfull button component
   *
   * 是否注册全屏按钮
   *
   * @default false
   */
  screenFull?: boolean;

  /**
   * Reading speed of words per minute
   *
   * 每分钟阅读字数
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * Locales config for pageInfo
   *
   * 页面信息的国际化配置
   */
  pageInfoLocales?: LocaleConfig<PageInfoLocaleData>;

  /**
   * Locales config for pagination
   *
   * 分页的国际化配置
   */
  paginationLocales?: LocaleConfig<PaginationLocaleData>;
}
