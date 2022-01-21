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
   * Whether enabling backToTop button or the threshold distance (in pixels)
   *
   * 是否启用返回顶部按钮，或触发距离 (单位：像素)
   */
  backToTop?: number | boolean;

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
  paginationLocales: LocaleConfig<PaginationLocaleData>;
}

declare global {
  const BACK_TO_TOP: number | false;
  const BREADCRUMB_ICON_PREFIX: string;
  const COMPONENT_LOCALES: ComponentLocaleConfig;
  const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
  const PAGINATION_LOCALES: PaginationLocaleConfig;
}
