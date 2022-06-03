/* eslint-disable @typescript-eslint/naming-convention */
import { getRootLang } from "vuepress-shared";
import { black, blue, cyan } from "chalk";
import { existsSync, readFile, writeJSON } from "fs-extra";
import { relative, resolve } from "path";

import type { Context } from "vuepress-typings";
import type { ManifestOption, PWAOptions } from "../types";

export const getManifest = async (
  context: Context,
  options: PWAOptions
): Promise<ManifestOption> => {
  const { base, sourceDir, siteConfig } = context;
  const userManifestPath = resolve(
    sourceDir,
    "./.vuepress/public/manifest.webmanifest"
  );
  const userManifestJSONPath = resolve(
    sourceDir,
    "./.vuepress/public/manifest.json"
  );

  const optionManifest = options.manifest || {};

  const userManifest = JSON.parse(
    existsSync(userManifestPath)
      ? await readFile(userManifestPath, "utf8")
      : existsSync(userManifestJSONPath)
      ? await readFile(userManifestJSONPath, "utf8")
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
  context: Context,
  manifest: Promise<ManifestOption>
): Promise<void> => {
  console.log(
    blue("PWA:"),
    black.bgYellow("wait"),
    "Generating manifest.webmanifest..."
  );

  const { cwd, outDir } = context;
  const manifestPath = resolve(outDir, "manifest.webmanifest");

  await writeJSON(manifestPath, await manifest, {
    flag: "w",
  });

  console.log(
    blue("PWA:"),
    black.bgGreen("Success"),
    `Manifest generated and saved to ${cyan(relative(cwd, manifestPath))}`
  );
};
