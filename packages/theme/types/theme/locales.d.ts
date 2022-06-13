import type { Author } from "vuepress-shared";
import type { AlgoliaOption } from "vuepress-typings";
import type { HopeThemeAppearanceLocaleData } from "./appearance";
import type {
  HopeThemeFeatureLocaleConfig,
  HopeThemeFeatureLocaleData,
  HopeThemeFeatureLocaleOptions,
} from "./feature";
import type { LocaleData2Option } from "./helpers";
import type {
  HopeThemeLayoutLocaleData,
  HopeThemeLayoutLocaleConfig,
  HopeThemeLayoutLocaleOptions,
} from "./layout";

export interface HopeThemeLocaleData
  extends HopeThemeAppearanceLocaleData,
    HopeThemeFeatureLocaleData,
    HopeThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
}

export type HopeThemeLocaleOptions =
  LocaleData2Option<HopeThemeAppearanceLocaleData> &
    LocaleData2Option<HopeThemeFeatureLocaleData> &
    HopeThemeFeatureLocaleOptions &
    LocaleData2Option<HopeThemeLayoutLocaleData> &
    HopeThemeLayoutLocaleOptions & {
      /**
       * Global default author
       *
       * 全局默认作者
       */
      author?: Author;

      /** 当前语言的 algolia 设置 */
      algolia?: AlgoliaOption;

      /** 显示所有页面的标题链接 */
      displayAllHeaders?: boolean;
    } & LocaleData;

export type HopeThemeLocaleConfig = HopeThemeLocaleData &
  HopeThemeFeatureLocaleConfig &
  HopeThemeLayoutLocaleConfig & {
    /**
     * Global default author
     *
     * 全局默认作者
     */
    author?: Author;

    /** 当前语言的 algolia 设置 */
    algolia?: AlgoliaOption;

    /** 显示所有页面的标题链接 */
    displayAllHeaders?: boolean;
  } & LocaleData;
