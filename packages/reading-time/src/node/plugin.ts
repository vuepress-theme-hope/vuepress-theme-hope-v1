import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./reading-time";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { ReadingTimeOptions } from "../types";

export const readingTimePlugin: Plugin<ReadingTimeOptions> = (
  options,
  context
) => {
  return {
    name: "@mr-hope/vuepress-plugin-reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_LOCALES: getLocales(
        context,
        readingTimeLocales,
        options.locales
      ),
    }),

    extendPageData($page): void {
      $page.readingTime = getReadingTime(
        $page._strippedContent,
        options.wordPerminute || 300
      );
    },
  };
};
