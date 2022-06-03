/* eslint-disable @typescript-eslint/naming-convention */
import { existsSync, readFile, writeFile } from "fs-extra";
import { join } from "path";
import { getCanonicalLink, getOGP } from "./info";
import { addOGP, appendCanonical } from "./inject";
import { logger } from "./utils";

import type { Context, Page } from "vuepress-typings";
import type { SeoOptions } from "../types";

export const appendSEO = (
  page: Page,
  options: SeoOptions,
  context: Context
): void => {
  const meta = page.frontmatter.meta || [];

  const defaultOGP = getOGP(page, options, context);

  const ogpContent = options.seo
    ? options.seo(defaultOGP, page, context)
    : defaultOGP;

  const canonicalLink = getCanonicalLink(page, options);

  addOGP(meta, ogpContent);
  appendCanonical(page, canonicalLink);

  if (options.customMeta) options.customMeta(meta, page, context);

  page.frontmatter.meta = meta;
};

export const generateRobotsTxt = async ({
  outDir,
  sourceDir,
}: Context): Promise<void> => {
  logger.load("Generating robots.txt");

  const publicPath = join(sourceDir, ".vuepress/public/robots.txt");

  let content = existsSync(publicPath)
    ? await readFile(publicPath, { encoding: "utf8" })
    : "";

  if (content && !content.includes("User-agent")) {
    logger.error();
    logger.update("robots.txt seems invalid!");
  } else {
    content += "\nUser-agent:*\nDisallow:\n";

    await writeFile(join(outDir, "robots.txt"), content, {
      flag: "w",
    });

    logger.succeed();
  }
};
