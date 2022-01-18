import type {
  ConvertLocaleConfig,
  LocaleConfig,
} from "@mr-hope/vuepress-shared";
import type {
  WalineOptions as _WalineOptions,
  WalineLocale,
} from "@waline/client";
import type { BaseCommentOptions } from "./base";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = ConvertLocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<_WalineOptions, "el"> {
  type: "waline";

  /**
   * Locales config for waline
   */
  walineLocales?: LocaleConfig<WalineLocaleData>;
}
