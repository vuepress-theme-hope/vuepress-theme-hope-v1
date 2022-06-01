import { deepAssign, getRootLang } from "@mr-hope/vuepress-shared";
import { compareDate, resolveUrl } from "./utils";

import type { Context, Page } from "@mr-hope/vuepress-types";
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
    options.hostname = options.hostname.replace(/\/?$/u, "");

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
  context: Context,
  options: FeedOptions
): ResolvedFeedOptionsMap =>
  Object.fromEntries(
    Object.keys({
      // root locale must exists
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "/": {},
      ...context.siteConfig.locales,
    }).map((localePath) => [
      localePath,
      {
        // default values
        filter: ({ frontmatter, _filePath }: Page): boolean =>
          !(
            frontmatter["home"] ||
            !_filePath ||
            frontmatter.article === false ||
            frontmatter.feed === false
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

        // make sure hostname is not been overided
        hostname: options.hostname,
      } as ResolvedFeedOptions,
    ])
  );

export const getFeedChannelOption = (
  context: Context,
  options: FeedOptions,
  localePath = ""
): FeedChannelOption => {
  const { hostname, icon, image } = options;
  const {
    base,
    siteConfig: { title, description, locales = {} },
  } = context;
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
  atomOutputFilename: `${prefix.replace(/^\//, "")}${
    options.atomOutputFilename || "atom.xml"
  }`,
  jsonOutputFilename: `${prefix.replace(/^\//, "")}${
    options.jsonOutputFilename || "feed.json"
  }`,
  rssOutputFilename: `${prefix.replace(/^\//, "")}${
    options.rssOutputFilename || "rss.xml"
  }`,
});

export const getFeedLinks = (
  context: Context,
  options: FeedOptions
): FeedLinks => {
  const { base } = context;
  const { hostname } = options;
  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options);

  return {
    atom: resolveUrl(hostname, base, atomOutputFilename),
    json: resolveUrl(hostname, base, jsonOutputFilename),
    rss: resolveUrl(hostname, base, rssOutputFilename),
  };
};
