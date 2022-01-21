import type { LocaleConfig } from "@mr-hope/vuepress-shared";
import type { ComponentLocaleConfig, ComponentLocaleData } from "./locales";
import type { PageInfoLocaleData, PageInfoLocaleConfig } from "./pageInfo";
import type {
  PaginationLocaleData,
  PaginationLocaleConfig,
} from "./pagination";

export * from "./locales";
export * from "./pageInfo";
export * from "./pagination";

export interface ComponentOptions {
  /**
   * Whether enabling backToTop button
   *
   * 是否启用返回顶部按钮
   */
  backToTop?: boolean;

  /**
   * backToTop button threshold distance (in pixels)
   *
   * 返回顶部按钮触发距离 (单位：像素)
   */
  backToTopThreshold?: number;

  /**
   * Whether register breadcrumb component
   *
   * 是否注册路径导航
   */
  breadcrumb?: boolean;

  /**
   * Whether register badge component
   *
   * 是否注册徽章
   */
  badge?: boolean;

  /**
   * Whether register pagination component
   *
   * 是否注册分页
   */
  pagination?: boolean;

  /**
   * Whether register scrennfull button component
   *
   * 是否注册全屏按钮
   */
  screenFull?: boolean;

  /**
   * Locales config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<ComponentLocaleData>;

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

declare global {
  const BACK_TO_TOP: boolean;
  const BACK_TO_TOP_THRESHOLD: number;
  const BREADCRUMB: boolean;
  const BADGE: boolean;
  const COMPONENT_LOCALES: ComponentLocaleConfig;
  const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
  const PAGINATION: boolean;
  const PAGINATION_LOCALES: PaginationLocaleConfig;
  const SCREEN_FULL: boolean;
}
