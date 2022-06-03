import { magenta } from "chalk";
import { stripTags } from "vuepress-shared";

import { appendSEO, generateRobotsTxt } from "./seo";
import { logger, md2text } from "./utils";

import type { Page, Plugin, PluginEntry } from "vuepress-typings";
import type { SeoOptions } from "../types";

export const seoPlugin: Plugin<SeoOptions> = (options, context) => {
  const plugin: PluginEntry = { name: "vuepress-plugin-seo2" };

  if (!options.hostname) {
    logger.error(`Option ${magenta("hostname")} is required!`);

    return plugin;
  }

  return {
    ...plugin,

    extendPageData: (page): void => {
      // generate summary
      if (!page.frontmatter.description)
        page.frontmatter.summary =
          stripTags(page.excerpt) ||
          md2text(page._strippedContent).slice(0, 180) ||
          "";

      // In VuePress1, permalinks are built after enhancers.
      const pageClone = Object.assign(
        Object.create(Object.getPrototypeOf(page) as object) as Page,
        page
      );

      pageClone.buildPermalink();

      appendSEO(pageClone, options, context);
    },

    generated: (): Promise<void> => generateRobotsTxt(context),

    plugins: [["@mr-hope/git", true]],
  };
};
