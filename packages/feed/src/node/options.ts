import {
  deepAssign,
  getRootLang,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared";

import { compareDate, resolveUrl } from "./utils";

import type { Context, Page } from "vuepress-typings";
import type {
  BaseFeedOptions,
  FeedChannelOption,
  FeedLinks,
  FeedOptions,
} from "../types";

export type ResolvedFeedOptions = BaseFeedOptions & { hostname: string };

export type ResolvedFeedOptionsMap = Record<string, ResolvedFeedOptions>;

export const ensureHostName = (options: Partial<FeedOptions>): boolean => {
  // make sure hostname do not end with `/`
  if (options.hostname) {
    options.hostname = removeEndingSlash(options.hostname);

    return true;
  }

  return false;
};

export const checkOutput = (options: Partial<FeedOptions>): boolean =>
  // some locales request output
  (options.locales &&
    Object.entries(options.locales).some(
      ([, { atom, json, rss }]) => atom || json || rss
    )) ||
  // root option requsts output
  Boolean(options.atom || options.json || options.rss);

export const getFeedOptions = (
  { siteConfig }: Context,
  options: FeedOptions
): ResolvedFeedOptionsMap =>
  Object.fromEntries(
    Object.keys({
      // root locale must exists
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": {},
      ...siteConfig.locales,
    }).map((localePath) => [
      localePath,
      {
        // default values
        filter: ({ frontmatter, _filePath }: Page): boolean =>
          !(
            frontmatter["home"] ||
            !_filePath ||
            frontmatter["article"] === false ||
            frontmatter["feed"] === false
          ),
        sorter: (pageA: Page, pageB: Page): number =>
          compareDate(
            pageA.createTimeStamp
              ? new Date(pageA.createTimeStamp)
              : pageA.frontmatter.time,
            pageB.createTimeStamp
              ? new Date(pageB.createTimeStamp)
              : pageB.frontmatter.time
          ),
        ...options,
        ...options.locales?.[localePath],

        // make sure hostname is not been overrided
        hostname: options.hostname,
      } as ResolvedFeedOptions,
    ])
  );

export const getFeedChannelOption = (
  context: Context,
  options: FeedOptions,
  localePath = ""
): FeedChannelOption => {
  const {
    base,
    siteConfig: { title, description, locales = {} },
  } = context;
  const { hostname, icon, image } = options;
  const author = options.channel?.author?.name;

  const defaultChannelOpion: FeedChannelOption = {
    title: locales[localePath]?.title || title || locales["/"]?.title || "",
    link: resolveUrl(hostname, base, localePath),
    description:
      locales[localePath]?.description ||
      description ||
      locales["/"]?.description ||
      "",
    language: locales[localePath]?.lang || getRootLang(context),
    copyright: author ? `Copyright by ${author}` : "",
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon ? { icon } : {}),
    ...(image ? { image } : {}),
    ...(author ? { author: { name: author } } : {}),
  };

  return deepAssign(defaultChannelOpion, options.channel || {});
};

export const getFilename = (
  options: ResolvedFeedOptions,
  prefix = "/"
): {
  atomOutputFilename: string;
  jsonOutputFilename: string;
  rssOutputFilename: string;
} => ({
  atomOutputFilename: `${removeLeadingSlash(prefix)}${
    options.atomOutputFilename || "atom.xml"
  }`,
  jsonOutputFilename: `${removeLeadingSlash(prefix)}${
    options.jsonOutputFilename || "feed.json"
  }`,
  rssOutputFilename: `${removeLeadingSlash(prefix)}${
    options.rssOutputFilename || "rss.xml"
  }`,
});

export const getFeedLinks = (
  { base }: Context,
  options: FeedOptions
): FeedLinks => {
  const { hostname } = options;
  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options);

  return {
    atom: resolveUrl(hostname, base, atomOutputFilename),
    json: resolveUrl(hostname, base, jsonOutputFilename),
    rss: resolveUrl(hostname, base, rssOutputFilename),
  };
};
