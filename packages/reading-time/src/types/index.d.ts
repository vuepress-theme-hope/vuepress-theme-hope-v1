import type {
  ConvertLocaleConfig,
  LocaleConfig,
} from "@mr-hope/vuepress-shared";

/**
 * Muti language config for `@mr-hope/vuepress-plugin-reading-time` plugin
 *
 * `@mr-hope/vuepress-plugin-reading-time` 插件的多语言配置
 */
export interface ReadingTimeLocaleData {
  /**
   * 字数模板
   *
   * Word template
   */
  word: string;
  /**
   * 小于一分钟文字
   *
   * Text for less than one minute
   */
  minute: string;
  /**
   * 时间模板
   *
   * Time template
   */
  time: string;
}

export type ReadingTimeLocaleConfig =
  ConvertLocaleConfig<ReadingTimeLocaleData>;

export interface ReadingTime {
  /** expect reading time */
  minutes: number;
  /** words of this page */
  words: number;
}

export interface ReadingTimeOptions {
  /**
   * 每分钟阅读的字数
   *
   * reading speed (words per minute)
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * 多语言选项
   *
   * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/reading-time/src/node/locales.ts)
   *
   * Locales config
   *
   * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/reading-time/src/node/locales.ts)
   */

  locales?: LocaleConfig<ReadingTimeLocaleData>;
}

declare module "@mr-hope/vuepress-types/types/page" {
  interface PageComputed {
    readingTime: ReadingTime;
  }

  interface Page {
    readingTime: ReadingTime;
  }
}

declare global {
  const READING_TIME_LOCALES: ReadingTimeLocaleConfig;
}
