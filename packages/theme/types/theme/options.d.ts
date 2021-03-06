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
export interface HopeThemeConfig
  extends HopeThemeAppearanceOptions,
    HopeThemeAppearanceRootOptions,
    HopeThemeFeatureLocaleOptions,
    HopeThemeFeatureRootOptions,
    HopeThemeLayoutOptions,
    HopeLayoutOptions,
    HopeThemePluginOptions,
    HopeThemeMetaLocaleOptions {
  /**
   * Navbar logo
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  logo?: string;
  /**
   * Navbar logo under darkmode
   *
   * should be absolute path relative to `.vuepress/public` folder
   *
   * 夜间模式下导航栏图标
   *
   * 应为基于 `.vuepress/public` 文件夹的绝对路径
   */
  darkLogo?: string;
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
  /** 所有页面的 下一篇 链接 */
  nextLinks?: boolean;
  /** 所有页面的 上一篇 链接 */
  prevLinks?: boolean;
  /** 项目仓库地址 */
  repo?: string;
  /** 仓库标签文字 */
  repoLabel?: string;
  /** 文档所属仓库 */
  docsRepo?: string;
  /** 文档所属文件夹 */
  docsDir?: string;
  /** 文档所属分支 */
  docsBranch?: string;

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
export interface ResolvedHopeThemeConfig extends HopeThemeConfig {
  /** 侧边栏深度 */
  sidebarDepth: number;
  /** 图标 FontClass 前缀 */
  iconPrefix: string;
  /** 多语言配置 */
  locales: Record<string, HopeThemeLocaleOptions>;
  /** 显示编辑本页链接 */
  editLinks: boolean;
}
