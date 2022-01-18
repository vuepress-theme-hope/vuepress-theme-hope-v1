import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { readingTime } from "./reading-time";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { ReadingTimeOptions } from "../types";

const readingTimePlugin: Plugin<ReadingTimeOptions> = (options, context) => {
  return {
    name: "reading-time",

    define: (): Record<string, unknown> => ({
      READING_TIME_LOCALES: getLocales(
        context,
        readingTimeLocales,
        options.locales
      ),
    }),

    extendPageData($page): void {
      $page.readingTime = readingTime(
        $page._strippedContent,
        options.wordPerminute || context.themeConfig.wordPerminute || 300
      );
    },
  };
};

export = readingTimePlugin;
