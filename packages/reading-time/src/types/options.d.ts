import type { LocaleConfig } from "vuepress-shared";
import type { ReadingTimeLocaleData } from "./locales";

export interface ReadingTimeOptions {
  /**
   * reading speed (words per minute)
   *
   * 每分钟阅读的字数
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/packages/reading-time/src/node/locales.ts)
   *
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/packages/reading-time/src/node/locales.ts)
   */

  locales?: LocaleConfig<ReadingTimeLocaleData>;
}
