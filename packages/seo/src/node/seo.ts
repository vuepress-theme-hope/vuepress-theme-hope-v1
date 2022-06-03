/* eslint-disable @typescript-eslint/naming-convention */
import { black, blue, cyan } from "chalk";
import { existsSync, readFile, writeFile } from "fs-extra";
import { join, relative } from "path";
import { addOGP } from "./inject";
import { getOGP } from "./meta";

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

  addOGP(meta, ogpContent);

  if (options.customMeta) options.customMeta(meta, page, context);

  page.frontmatter.meta = meta;
};

export const generateRobotsTxt = async ({
  cwd,
  outDir,
  sourceDir,
}: Context): Promise<void> => {
  console.log(blue("SEO:"), black.bgYellow("wait"), "Generating robots.txt");
  const publicPath = join(sourceDir, ".vuepress/public/robots.txt");

  let content = existsSync(publicPath)
    ? await readFile(publicPath, { encoding: "utf8" })
    : "";

  if (content && !content.includes("User-agent")) {
    console.error(
      blue("SEO:"),
      black.bgRed("error"),
      "robots.txt seems invalid!"
    );
  } else {
    content += "\nUser-agent:*\nDisallow:\n";

    await writeFile(join(outDir, "robots.txt"), content, {
      flag: "w",
    });

    console.log(
      blue("SEO:"),
      black.bgGreen("Success"),
      `${cyan("robots.txt")} generated and saved to ${cyan(
        relative(cwd, outDir)
      )}`
    );
  }
};
