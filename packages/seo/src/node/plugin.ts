import { black, blue, cyan } from "chalk";
import { appendSEO, generateRobotsTxt } from "./seo";
import { striptags } from "./stripTags";
import { md2text } from "./utils";

import type { Page, Plugin, PluginEntry } from "vuepress-typings";
import type { SeoOptions } from "../types";

export const seoPlugin: Plugin<SeoOptions> = (options, context) => {
  const plugin: PluginEntry = { name: "vuepress-plugin-seo" };

  if (!options.hostname) {
    console.log(
      blue("SEO:"),
      black.bgRed("error"),
      `Option ${cyan("hostname")} is required!`
    );

    return plugin;
  }

  return {
    ...plugin,

    extendPageData: (page): void => {
      // generate summary
      if (!page.frontmatter.description)
        page.frontmatter.summary =
          striptags(page.excerpt) ||
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

    generated: async (): Promise<void> => generateRobotsTxt(context),

    plugins: [["@mr-hope/git", true]],
  };
};
