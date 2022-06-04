/* eslint-disable @typescript-eslint/naming-convention */
import { chalk, fs, path, getRootLang } from "vuepress-shared";

import { logger } from "./utils";

import type { Context } from "vuepress-typings";
import type { ManifestOption, PWAOptions } from "../types";

export const getManifest = async (
  context: Context,
  options: PWAOptions
): Promise<ManifestOption> => {
  const { base, sourceDir, siteConfig } = context;
  const userManifestPath = path.resolve(
    sourceDir,
    ".vuepress/public/manifest.webmanifest"
  );
  const userManifestJSONPath = path.resolve(
    sourceDir,
    ".vuepress/public/manifest.json"
  );
  const optionManifest = options.manifest || {};

  const userManifest = JSON.parse(
    fs.existsSync(userManifestPath)
      ? await fs.readFile(userManifestPath, "utf8")
      : fs.existsSync(userManifestJSONPath)
      ? await fs.readFile(userManifestJSONPath, "utf8")
      : "{}"
  ) as ManifestOption;

  const finalManifest: ManifestOption = {
    name: siteConfig.title || siteConfig.locales?.["/"]?.title || "Site",
    short_name: siteConfig.title || siteConfig.locales?.["/"]?.title || "Site",
    description:
      siteConfig.description ||
      siteConfig.locales?.["/"]?.description ||
      "A site built with vuepress",
    lang: getRootLang(context),
    start_url: base,
    scope: base,

    display: "standalone",
    theme_color: options.themeColor || "#46bd87",
    background_color: "#ffffff",
    orientation: "portrait-primary",
    prefer_related_applications: false,

    ...userManifest,
    ...optionManifest,
  };

  return finalManifest;
};

export const generateManifest = async (
  { cwd, outDir }: Context,
  manifest: Promise<ManifestOption>
): Promise<void> => {
  logger.load("Generating manifest.webmanifest");

  const manifestPath = path.resolve(outDir, "manifest.webmanifest");

  await fs.writeJSON(manifestPath, await manifest, {
    flag: "w",
  });

  logger.succeed();
  logger.update(
    `Manifest generated and saved to ${chalk.cyan(
      path.relative(cwd, manifestPath)
    )}!`
  );
};
