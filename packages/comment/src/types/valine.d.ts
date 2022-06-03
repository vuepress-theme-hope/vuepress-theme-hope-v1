import type { ConvertLocaleConfig, LocaleConfig } from "vuepress-shared";
import type { ValineOption } from "valine";
import type { BaseCommentOptions } from "./base";

export interface ValineLocaleData {
  placeholder: string;
}

export type ValineLocaleConfig = ConvertLocaleConfig<ValineLocaleData>;

export interface ValineOptions
  extends BaseCommentOptions,
    Omit<ValineOption, "el"> {
  type: "valine";
  valineLocales?: LocaleConfig<ValineLocaleData>;
}
