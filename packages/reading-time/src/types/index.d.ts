import type { ReadingTime } from "./extends";
import type { ReadingTimeLocaleConfig } from "./locales";

export * from "./extends";
export * from "./locales";
export * from "./options";

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
