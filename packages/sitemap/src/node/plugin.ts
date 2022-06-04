import { chalk } from "vuepress-shared";
import { covertOptions } from "./compact";
import { generateSiteMap } from "./generateSitemap";
import { logger } from "./utils";

import type { Plugin, PluginEntry } from "vuepress-typings";
import type { SitemapOptions } from "../types";

export const sitemapPlugin: Plugin<SitemapOptions> = (options, context) => {
  covertOptions(options as SitemapOptions & Record<string, unknown>);

  const plugin: PluginEntry = {
    name: "vuepress-plugin-sitemap1",
  };

  if (!options.hostname) {
    logger.error(`Option ${chalk.magenta("hostname")} is required!`);

    return plugin;
  }

  return {
    ...plugin,

    onGenerated: (): Promise<void> => generateSiteMap(options, context),

    plugins: [["@mr-hope/git", true]],
  };
};
