import { getFilename } from "./options";
import { resolveUrl } from "./utils";

import type { Context, HeadItem } from "@mr-hope/vuepress-types";
import type { ResolvedFeedOptionsMap } from "./options";

export const injectLinkstoHead = (
  context: Context,
  options: ResolvedFeedOptionsMap
): void => {
  const { base, siteConfig } = context;

  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options["/"]);

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
        href: resolveUrl(options["/"].hostname, base, fileName),
        title: `${
          siteConfig.title || siteConfig.locales?.["/"]?.title || ""
        } ${name} Feed`,
      },
    ];
  };

  // ensure head exists
  if (!siteConfig.head) siteConfig.head = [];

  // add atom link
  if (options["atom"])
    siteConfig.head.push(
      getHeadItem("Atom", atomOutputFilename, "application/atom+xml")
    );

  // add json link
  if (options["json"])
    siteConfig.head.push(
      getHeadItem("JSON", jsonOutputFilename, "application/json")
    );

  // add rss link
  if (options["rss"])
    siteConfig.head.push(
      getHeadItem("RSS", rssOutputFilename, "application/rss+xml")
    );
};
