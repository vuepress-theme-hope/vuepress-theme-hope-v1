import { getLocales } from "@mr-hope/vuepress-shared";
import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./reading-time";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { ReadingTimeOptions } from "../types";

export const readingTimePlugin: Plugin<ReadingTimeOptions> = (
  options,
  context
) => {
  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-reading-time";

  return {
    name: PLUGIN_NAME,

    define: (): Record<string, unknown> => ({
      READING_TIME_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.locales,
        default: readingTimeLocales,
      }),
    }),

    extendPageData($page): void {
      $page.readingTime = getReadingTime(
        $page._strippedContent,
        options.wordPerminute || 300
      );
    },
  };
};
