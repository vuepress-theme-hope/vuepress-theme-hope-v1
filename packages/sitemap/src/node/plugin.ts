import { black, blue } from "chalk";
import { covertOptions } from "./compact";
import { generateSiteMap } from "./generateSitemap";

import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { SitemapOptions } from "../types";

export const sitemapPlugin: Plugin<SitemapOptions> = (options, context) => {
  covertOptions(options as SitemapOptions & Record<string, unknown>);

  const plugin: PluginOptionAPI = {
    name: "@mr-hope/vuepress-plugin-sitemap",
  };

  if (!options.hostname) {
    console.log(
      blue("Sitemap"),
      black.bgRed("Error"),
      'Not generating sitemap because required "hostname" option doesn’t exist'
    );

    return plugin;
  }

  return {
    ...plugin,

    generated: async (): Promise<void> => generateSiteMap(options, context),

    plugins: [["@mr-hope/git", true]],
  };
};
