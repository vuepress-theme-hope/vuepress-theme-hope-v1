import type { ConvertLocaleConfig } from "vuepress-shared";
import type { AlgoliaOption } from "vuepress-typings";
import type {
  HopeThemeAppearanceLocaleData,
  HopeThemeAppearanceOptions,
} from "./appearance";
import type { HopeSideBarConfig } from "./extends";
import type {
  HopeThemeFeatureLocaleData,
  HopeThemeFeatureLocaleOptions,
} from "./feature";
import type {
  HopeThemeLayoutLocaleData,
  HopeThemeLayoutLocaleOptions,
} from "./layout";

export interface HopeThemeLocaleData
  extends HopeThemeAppearanceLocaleData,
    HopeThemeFeatureLocaleData,
    HopeThemeLayoutLocaleData {
  /** 当前语言代码 */
  lang: string;
}

export type HopeThemeLocaleConfig = ConvertLocaleConfig<HopeThemeLocaleData>;

/** vuepress-theme-hope 多语言配置 */
export interface HopeThemeLocaleOptions
  extends Partial<HopeThemeLocaleData>,
    HopeThemeAppearanceOptions,
    HopeThemeFeatureLocaleOptions,
    HopeThemeLayoutLocaleOptions {
  /** 当前语言下的标题 */
  title?: string;
  /** 当前语言下的描述 */
  description?: string;

  /**
   * 侧边栏配置
   *
   * Sidebar configuration
   */
  sidebar?: HopeSideBarConfig;

  /**
   * 侧边栏嵌套的标题深度
   *
   * Nested headings depth in sidebar
   *
   * @default 2
   */
  sidebarDepth?: number;

  /** 当前语言的 algolia 设置 */
  algolia?: AlgoliaOption;

  /** 显示所有页面的标题链接 */
  displayAllHeaders?: boolean;
}
