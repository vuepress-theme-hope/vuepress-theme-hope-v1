import { getLocales } from "vuepress-shared";
import { readingTimeLocales } from "./locales";
import { getReadingTime } from "./readingTime";

import type { Plugin } from "vuepress-typings";
import type { ReadingTimeOptions } from "../types";

export const readingTimePlugin: Plugin<ReadingTimeOptions> = (
  options,
  context
) => {
  const PLUGIN_NAME = "vuepress-plugin-reading-time1";

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
