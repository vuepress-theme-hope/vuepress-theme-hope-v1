/* eslint-disable @typescript-eslint/naming-convention */
import { getAuthor, getDate, removeEndingSlash } from "vuepress-shared";

import { getCover, getImages, getLocales, resolveUrl } from "./utils";

import type { Context, Page } from "vuepress-typings";
import type { SeoContent, SeoOptions } from "../types";

export const getOGP = (
  page: Page,
  options: SeoOptions,
  context: Context
): SeoContent => {
  const {
    isArticle = (page): boolean =>
      Boolean(page._filePath && !page.frontmatter.home),
  } = options;
  const { base, siteConfig } = context;

  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      tag,
      tags = tag as string[],
    },
  } = page;

  const title =
    siteConfig.locales?.[page._localePath]?.title ||
    siteConfig.title ||
    siteConfig.locales?.["/"]?.title ||
    "";
  const author =
    pageAuthor === false ? [] : getAuthor(pageAuthor || options.author);

  const modifiedTime = page.updateTimeStamp
    ? new Date(page.updateTimeStamp).toISOString()
    : "";
  const articleTags: string[] = Array.isArray(tags)
    ? tags
    : typeof tag === "string"
    ? [tag]
    : [];

  const articleTitle = page.title;
  const cover = getCover(page, options, context);
  const images = getImages(page, options, context);
  const locales = getLocales(page._computed.$lang, siteConfig.locales || {});

  let publishedTime = "";

  if (date instanceof Date) publishedTime = new Date(date).toISOString();
  else if (date) {
    const dateInfo = getDate(date);

    if (dateInfo && dateInfo.value)
      publishedTime = dateInfo.value.toISOString();
  }

  const ogImage = cover || images[0] || options.fallBackImage || "";

  const defaultOGP: SeoContent = {
    "og:url": resolveUrl(options.hostname, base, page.path),
    "og:site_name": title,
    "og:title": articleTitle,
    "og:description":
      page.frontmatter.description ||
      (options.autoDescription ? page.frontmatter.summary || "" : ""),
    "og:type": isArticle(page) ? "article" : "website",
    "og:image": ogImage,
    "og:updated_time": modifiedTime,
    "og:locale": page._computed.$lang,
    "og:locale:alternate": locales,
    ...(options.restrictions
      ? { "og:restrictions:age": options.restrictions }
      : {}),

    ...(options.twitterID ? { "twitter:creator": options.twitterID } : {}),
    ...(ogImage
      ? {
          "twitter:card": "summary_large_image",
          "twitter:image:alt": articleTitle,
        }
      : {}),

    "article:author": author[0]?.name,
    "article:tag": articleTags,
    "article:published_time": publishedTime,
    "article:modified_time": modifiedTime,
  };

  return defaultOGP;
};

export const getCanonicalLink = (
  page: Page,
  options: SeoOptions
): string | null => {
  if (typeof options.canonical === "function") return options.canonical(page);

  if (typeof options.canonical === "string")
    return `${removeEndingSlash(options.canonical)}${page.path}`;

  return null;
};
