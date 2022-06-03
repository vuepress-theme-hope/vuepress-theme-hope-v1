import type { ReadingTime } from "./extends";
import type { ReadingTimeLocaleConfig } from "./locales";

declare module "@mr-hope/vuepress-types/types/page" {
  interface BasePage {
    readingTime: ReadingTime;
  }

  interface Page {
    readingTime: ReadingTime;
  }
}

declare global {
  const READING_TIME_LOCALES: ReadingTimeLocaleConfig;
}
