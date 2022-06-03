/**
 * Locales data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type LocaleData = Record<string, any>;

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

export type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
