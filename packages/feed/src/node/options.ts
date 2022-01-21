import { deepAssign, getRootLang } from "@mr-hope/vuepress-shared";
import { error, resolveUrl } from "./utils";

import type { Context } from "@mr-hope/vuepress-types";
import type { FeedChannelOption } from "../types/feed";
import type { FeedLinks, FeedOptions, FeedOutputOptions } from "../types";

export interface ResolvedFeedOutputConfig {
  enable: boolean;
  path: string;
}

export interface ResolvedFeedOutput {
  atom: ResolvedFeedOutputConfig;
  json: ResolvedFeedOutputConfig;
  rss: ResolvedFeedOutputConfig;
}

export const checkOptions = (options: FeedOptions): boolean => {
  const hostname = options.hostname;

  // make sure hostname do not end with `/`
  if (hostname) options.hostname = hostname.replace(/\/?$/u, "");
  else {
    error("Option 'hostname' is required!");
    return false;
  }

  return true;
};

export const getOutput = (output?: FeedOutputOptions): ResolvedFeedOutput => {
  const defaultOption: ResolvedFeedOutput = {
    atom: {
      enable: true,
      path: "atom.xml",
    },
    json: {
      enable: true,
      path: "feed.json",
    },
    rss: {
      enable: true,
      path: "rss.xml",
    },
  };

  return deepAssign(defaultOption, output || {});
};

export const getFeedChannelOption = (
  options: FeedOptions,
  context: Context
): FeedChannelOption => {
  const { hostname, icon, image } = options;
  const { base } = context;
  const { title, description } = context.getSiteData();
  const author = options.channel?.author?.name;

  const defaultChannelOpion: FeedChannelOption = {
    title,
    link: resolveUrl(hostname, base),
    description,
    language: getRootLang(context),
    copyright: author ? `Copyright by ${author}` : "",
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon ? { icon } : {}),
    ...(image ? { image } : {}),
    ...(author ? { author: { name: author } } : {}),
  };

  return deepAssign(defaultChannelOpion, options.channel || {});
};

export const getFeedLinks = (
  options: FeedOptions,
  output: ResolvedFeedOutput,
  context: Context
): FeedLinks => {
  const { base } = context;
  const { hostname } = options;

  return {
    atom: resolveUrl(hostname, base, output.atom.path),
    json: resolveUrl(hostname, base, output.json.path),
    rss: resolveUrl(hostname, base, output.rss.path),
  };
};
