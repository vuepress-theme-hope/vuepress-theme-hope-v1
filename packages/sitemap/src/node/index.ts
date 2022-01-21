import { black, blue } from "chalk";
import { genSiteMap } from "./sitemap";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { SitemapOptions } from "../types";

const sitemapPlugin: Plugin<SitemapOptions> = (options, context) => {
  if (!options.hostname) {
    console.log(
      blue("Sitemap"),
      black.bgRed("Error"),
      'Not generating sitemap because required "hostname" option doesn’t exist'
    );

    return { name: "sitemap" };
  }

  return {
    name: "sitemap",

    async generated(): Promise<void> {
      await genSiteMap(options, context);
    },

    plugins: [["@mr-hope/git", true]],
  };
};

export = sitemapPlugin;
