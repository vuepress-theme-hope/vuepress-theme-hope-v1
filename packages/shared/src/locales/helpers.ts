import type { Context } from "@mr-hope/vuepress-types";
import { lang2PathConfig, path2langConfig, supportedLangs } from "./config";
import { deepAssign } from "../assign";

import type { HopeLang, LocaleConfig, ConvertLocaleConfig } from "./types";

const reportStatus: Record<string, boolean> = {};

/** Check if the lang is supported */
export const checkLang = (lang = ""): boolean => supportedLangs.includes(lang);

export const showLangError = (lang: string, plugin = ""): void => {
  if (!reportStatus[lang]) {
    console.warn(
      `${lang} locates config is missing, and will return 'en-US' instead.
${
  lang === "root"
    ? ""
    : `You can contribute to https://github.com/vuepress-theme-hope/vuepress-theme-hope-v1/blob/main/packages/${
        plugin || "<YOUR PLUGIN>"
      }/src/node/locales.ts in this repository.
`
}Note: This warning will be shown only once`
    );
    reportStatus[lang] = true;
  }
};

/** Get language from path */
export const path2Lang = (path = ""): HopeLang => {
  if (path in path2langConfig) return path2langConfig[path];

  console.error(
    `${path} isn’t assign with a lang, and will return 'en-US' instead.`
  );

  return "en-US";
};

/** Get path from language */
export const lang2Path = (lang = ""): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as HopeLang];

  console.error(`${lang} has no path config, and will return '/' instead.`);

  return "/";
};

/**
 * Get language of root directory
 *
 * @param context VuePress Node Context
 * @returns root language
 */
export const getRootLang = (context: Context): HopeLang => {
  // infer from siteLocale
  const siteLocales = context.siteConfig.locales;

  if (siteLocales?.["/"] && checkLang(siteLocales["/"]?.lang))
    return siteLocales["/"].lang as HopeLang;

  // infer from themeLocale
  const themeLocales = context.themeConfig.locales;

  if (themeLocales?.["/"] && checkLang(themeLocales["/"]?.lang))
    return themeLocales["/"].lang as HopeLang;

  showLangError("root");

  return "en-US";
};

/**
 * Get the infer language path from root directory language
 *
 * @param context VuePress Node Context
 * @returns infer language
 */
export const getRootLangPath = (context: Context): string =>
  lang2Path(getRootLang(context));

export const getLocalePaths = (context: Context): string[] =>
  Array.from(
    new Set([
      ...Object.keys(context.siteConfig.locales || {}),
      ...Object.keys(context.themeConfig.locales || {}),
    ])
  );

/**
 * Get final locale options to passed to client
 *
 * @param context VuePress Node Context
 * @param defaultLocalesConfig default locale config
 * @param userLocalesConfig user locale config
 * @returns final locale config
 */
export const getLocales = <T>(
  context: Context,
  defaultLocalesConfig: ConvertLocaleConfig<T>,
  userLocalesConfig: LocaleConfig<T> = {}
): ConvertLocaleConfig<T> => {
  const rootPath = getRootLangPath(context);

  return Object.fromEntries([
    ...getLocalePaths(context).map<[string, T]>((localePath) => [
      localePath,
      deepAssign(
        {},
        userLocalesConfig[localePath] || {},
        defaultLocalesConfig[localePath] || {}
      ),
    ]),
    [
      "/",
      deepAssign(
        {},
        userLocalesConfig["/"] || userLocalesConfig[rootPath] || {},
        defaultLocalesConfig[rootPath] || {}
      ),
    ],
  ]);
};
