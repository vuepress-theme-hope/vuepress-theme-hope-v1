import { getDate, timeTransformer } from "../../shared";

import type { Page } from "vuepress-typings";
import type { DateOptions } from "../../shared";

export const injectLocalizedDate = (
  page: Page & { localizedDate?: string; createTimeStamp?: number },
  options: DateOptions
): void => {
  if (!page.localizedDate) {
    if (page.frontmatter.date) {
      const date = getDate(page.frontmatter.date, options)?.value;

      if (date) page.localizedDate = timeTransformer(date, options);
    } else if (page.createTimeStamp)
      page.localizedDate = timeTransformer(
        new Date(page.createTimeStamp),
        options
      );
  }
};
