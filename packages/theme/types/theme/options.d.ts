import type { AlgoliaOption } from "vuepress-typings";
import type {
  HopeThemeAppearanceOptions,
  HopeThemeAppearanceRootOptions,
} from "./appearance";
import type {
  HopeThemeFeatureLocaleOptions,
  HopeThemeFeatureRootOptions,
} from "./feature";
import type { HopeThemeLayoutOptions, HopeLayoutOptions } from "./layout";
import type { HopeThemeLocaleOptions } from "./locales";
import type { HopeThemePluginOptions } from "./plugin";

/** vuepress-theme-hope 主题配置 */
export interface HopeThemeOptions
  extends HopeThemeAppearanceOptions,
    HopeThemeAppearanceRootOptions,
    HopeThemeFeatureLocaleOptions,
    HopeThemeFeatureRootOptions,
    HopeThemeLayoutOptions,
    HopeLayoutOptions,
    HopeThemePluginOptions,
    HopeThemeMetaLocaleOptions {
  /** 显示所有页面的标题链接 */
  displayAllHeaders?: boolean;

  /** 是否启用默认的搜索框 */
  search?: boolean;

  /** 搜索框占位符 */
  searchPlaceholder?: string;

  /** 默认搜索框显示的搜索结果数量 */
  searchMaxSuggestions?: number;

  /** Algolia 搜索配置 */
  algolia?: AlgoliaOption;

  /**
   * 多语言配置
   *
   * Locales config
   */
  locales?: Record<string, HopeThemeLocaleOptions>;

  /** 站点地址 */
  hostname?: string;

  /**
   * 文章显示的默认作者
   *
   * The default author of the article
   */
  author?: string;
}

/** 处理后的 vuepress-theme-hope 主题配置 */
export interface HopeThemeConfig extends HopeThemeOptions {
  /** 侧边栏深度 */
  sidebarDepth: number;
  /** 图标 FontClass 前缀 */
  iconPrefix: string;
  /** 多语言配置 */
  locales: Record<string, HopeThemeLocaleOptions>;
}
