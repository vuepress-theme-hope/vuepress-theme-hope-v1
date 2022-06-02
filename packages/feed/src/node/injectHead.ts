import { getFilename } from "./options";
import { resolveUrl } from "./utils";

import type { Context, HeadItem } from "@mr-hope/vuepress-types";
import type { ResolvedFeedOptionsMap } from "./options";

export const injectLinkstoHead = (
  context: Context,
  options: ResolvedFeedOptionsMap
): void => {
  const { base, siteConfig } = context;
  const localePaths = Object.keys(options);

  // there is only one language, so we append it to siteData
  if (localePaths.length === 1) {
    const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
      getFilename(options["/"]);
    const { atom, json, rss, hostname } = options["/"];

    const getHeadItem = (
      name: string,
      fileName: string,
      type: string
    ): HeadItem => {
      return [
        "link",
        {
          rel: "alternate",
          type,
          href: resolveUrl(hostname, base, fileName),
          title: `${
            siteConfig.title || siteConfig.locales?.["/"]?.title || ""
          } ${name} Feed`,
        },
      ];
    };

    // ensure head exists
    if (!siteConfig.head) siteConfig.head = [];

    // add atom link
    if (atom)
      siteConfig.head.push(
        getHeadItem("Atom", atomOutputFilename, "application/atom+xml")
      );

    // add json link
    if (json)
      siteConfig.head.push(
        getHeadItem("JSON", jsonOutputFilename, "application/json")
      );

    // add rss link
    if (rss)
      siteConfig.head.push(
        getHeadItem("RSS", rssOutputFilename, "application/rss+xml")
      );
  }
};
