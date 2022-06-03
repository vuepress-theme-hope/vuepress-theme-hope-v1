import { cyan } from "chalk";
import { createWriteStream, existsSync, readFile, writeFile } from "fs-extra";
import { resolve } from "path";
import { SitemapStream } from "sitemap";
import { removeEndingSlash, removeLeadingSlash } from "vuepress-shared";
import { logger } from "./utils";

import type { Context, Page } from "vuepress-typings";
import type {
  SitemapFrontmatterOption,
  SitemapImageOption,
  SitemapLinkOption,
  SitemapNewsOption,
  SitemapOptions,
  SitemapVideoOption,
} from "../types";

interface SitemapPageInfo {
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  img?: SitemapImageOption[];
  video?: SitemapVideoOption[];
  links?: SitemapLinkOption[];
  news?: SitemapNewsOption[];
}

const stripLocalePrefix = (
  page: Page
): {
  // path of root locale
  defaultPath: string;
  // Locale path prefix of the page
  pathLocale: string;
} => ({
  defaultPath: page.path.replace(page._localePath, "/"),
  pathLocale: page._localePath,
});

const generatePageMap = (
  options: SitemapOptions,
  { base, pages, siteConfig }: Context
): Map<string, SitemapPageInfo> => {
  const {
    changefreq,
    excludeUrls = ["/404.html"],
    modifyTimeGetter = (page): string =>
      page.updateTimeStamp ? new Date(page.updateTimeStamp).toISOString() : "",
  } = options;

  const { locales = {} } = siteConfig;

  const pageLocalesMap = pages.reduce(
    (map, page) => {
      const { defaultPath, pathLocale } = stripLocalePrefix(page);
      const pathLocales = map.get(defaultPath) || [];

      pathLocales.push(pathLocale);

      return map.set(defaultPath, pathLocales);
    },
    // a map with keys of defaultPath and string[] value with pathLocales
    new Map<string, string[]>()
  );

  const pagesMap = new Map<string, SitemapPageInfo>();

  pages.forEach((page) => {
    const frontmatterOptions: SitemapFrontmatterOption =
      (page.frontmatter["sitemap"] as SitemapFrontmatterOption) || {};

    const metaRobotTags = (page.frontmatter.meta || []).find(
      (meta) => meta.name === "robots"
    );
    const excludePage = metaRobotTags
      ? (metaRobotTags.content || "")
          .split(/,/u)
          .map((content) => content.trim())
          .includes("noindex")
      : frontmatterOptions.exclude;

    if (excludePage || excludeUrls.includes(page.path)) return;

    const lastmodifyTime = modifyTimeGetter(page);
    const { defaultPath } = stripLocalePrefix(page);
    const relatedLocales = pageLocalesMap.get(defaultPath) || [];

    let links: SitemapLinkOption[] = [];

    if (relatedLocales.length > 1) {
      links = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix]?.lang || "en",
        url: `${base}${removeLeadingSlash(
          defaultPath.replace(/^\//u, localePrefix)
        )}`,
      }));
    }

    const sitemapInfo: SitemapPageInfo = {
      ...(changefreq ? { changefreq } : {}),
      links,
      ...(lastmodifyTime ? { lastmod: lastmodifyTime } : {}),
      ...frontmatterOptions,
    };

    pagesMap.set(page.path, sitemapInfo);
  });

  return pagesMap;
};

export const generateSiteMap = async (
  options: SitemapOptions,
  context: Context
): Promise<void> => {
  const { extraUrls = [], xmlNameSpace: xmlns } = options;
  const hostname = removeEndingSlash(options.hostname);
  const sitemapFilename = options.sitemapFilename
    ? removeLeadingSlash(options.sitemapFilename)
    : "sitemap.xml";

  logger.load(`Generating sitemap to ${cyan(sitemapFilename)}`);

  const { base, outDir } = context;
  const sitemap = new SitemapStream({
    hostname,
    ...(xmlns ? { xmlns } : {}),
  });
  const pagesMap = generatePageMap(options, context);
  const sitemapXMLPath = resolve(outDir, sitemapFilename);
  const writeStream = createWriteStream(sitemapXMLPath);

  sitemap.pipe(writeStream);

  pagesMap.forEach((page, path) =>
    sitemap.write({
      url: `${base}${removeLeadingSlash(path)}`,
      ...page,
    })
  );

  extraUrls.forEach((item) =>
    sitemap.write({ url: `${base}${removeLeadingSlash(item)}` })
  );

  await new Promise<void>((resolve) => {
    sitemap.end(() => {
      logger.succeed();
      resolve();
    });
  });

  const robotTxtPath = resolve(outDir, "robots.txt");

  if (existsSync(robotTxtPath)) {
    logger.load(`Appended sitemap path to ${cyan("robots.txt")}`);

    const robotsTxt = await readFile(robotTxtPath, { encoding: "utf8" });

    const newRobotsTxtContent = `${robotsTxt.replace(
      /^Sitemap: .*$/u,
      ""
    )}\nSitemap: ${hostname}${base}${sitemapFilename}\n`;

    await writeFile(robotTxtPath, newRobotsTxtContent, { flag: "w" });

    logger.succeed();
  }
};
