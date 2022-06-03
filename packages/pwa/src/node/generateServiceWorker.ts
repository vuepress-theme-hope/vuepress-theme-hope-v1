import { blue, cyan } from "chalk";
import { statSync } from "fs-extra";
import { resolve } from "path";
import { generateSW } from "workbox-build";
import { logger } from "./utils";

import type {
  ManifestEntry,
  ManifestTransform,
  ManifestTransformResult,
} from "workbox-build";

import type { Context } from "vuepress-typings";
import type { PWAOptions } from "../types";

const imageFilter =
  (outDir: string, maxsize = 1024): ManifestTransform =>
  (
    manifestEntries: (ManifestEntry & { size: number })[]
  ): ManifestTransformResult => {
    const warnings: string[] = [];
    const manifest: (ManifestEntry & { size: number })[] = [];
    const imageExtensions = [".png", ".jpg", ".jpeg", "webp", "bmp", "gif"];

    for (const entry of manifestEntries)
      if (imageExtensions.some((ext) => entry.url.endsWith(ext))) {
        const stats = statSync(resolve(outDir, entry.url));

        if (stats.size > maxsize * 1024)
          warnings.push(
            `Skipped ${entry.url}, as its ${Math.ceil(stats.size / 1024)} KB.\n`
          );
        else manifest.push(entry);
      } else manifest.push(entry);

    return { warnings, manifest };
  };

export const generateServiceWorker = async (
  { outDir, siteConfig }: Context,
  options: PWAOptions
): Promise<void> => {
  logger.load("Generating service worker");

  const { title, locales = {} } = siteConfig;
  const swDest = resolve(outDir, "./service-worker.js");

  const globPatterns = ["**/*.{js,css,svg}", "**/*.{woff,woff2,eot,ttf,otf}"];

  if (options.cacheHTML) globPatterns.push("**/*.html");
  else globPatterns.push("./index.html", "./404.html");

  if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,bmp,gif,webp}");

  await generateSW({
    swDest,
    globDirectory: outDir,
    cacheId: title || locales["/"]?.title || "hope",
    globPatterns,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: (options.maxSize || 2048) * 1024,
    manifestTransforms: [imageFilter(outDir, options.maxPicSize)],
    ...(options.generateSWConfig || {}),
  }).then(({ count, size, warnings }) => {
    logger.succeed();

    logger.info(
      `Precache ${cyan(`${count} files`)}, totaling ${cyan(
        `${(size / 1024 / 1024).toFixed(2)} Mb.`
      )}.`
    );

    if (warnings.length)
      logger.warn(`${warnings.map((warning) => `  · ${warning}`).join("\n")}`);

    if (size > 104857600)
      logger.error(
        `Cache Size is larger than 100MB, so that it can not be registerd on all browsers.\n${blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
    else if (size > 52428800)
      logger.warn(
        `\nCache Size is larger than 50MB, which will not be registerd on Safari.\n${blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
  });
};
