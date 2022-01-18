import { lang2PathConfig } from "./config";

/**
 * Locales config, a key-value object
 *
 * - Key is the locale path (prefix)
 * - Value is the locales data
 *
 * @remark suffix `Config` means this is for user config
 */
export declare type LocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  Partial<T>
>;

/**
 * Locales data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type LocaleData = Record<string, any>;

/** Types for supported lang codes */
export type HopeLang = keyof typeof lang2PathConfig;

export type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
