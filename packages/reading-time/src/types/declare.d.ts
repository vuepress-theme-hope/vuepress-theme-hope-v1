import type { ReadingTime } from "./extends";
import type { ReadingTimeLocaleConfig } from "./locales";

declare module "vuepress-typings/types/page" {
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
