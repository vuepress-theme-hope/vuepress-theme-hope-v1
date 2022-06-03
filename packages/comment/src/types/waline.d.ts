import type { ConvertLocaleConfig, LocaleConfig } from "vuepress-shared";
import type { WalineInitOptions, WalineLocale } from "@waline/client";
import type { BaseCommentOptions } from "./base";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = ConvertLocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<WalineInitOptions, "el"> {
  type: "waline";

  /**
   * Locales config for waline
   */
  walineLocales?: LocaleConfig<WalineLocaleData>;
}
