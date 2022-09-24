import { lang2PathConfig, path2langConfig, supportedLangs } from "./config";
import { Logger } from "../logger";
import { deepAssign } from "../utils";

import type { Context } from "vuepress-typings";
import type { HopeLang } from "./types";
import type {
  ConvertLocaleConfig,
  LocaleConfig,
  LocaleData,
} from "../../shared";

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
    : `You can contribute to https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/${
        plugin || "<YOUR PLUGIN>"
      }/src/node/locales.ts in this repository.
`
}Note: This warning will be shown only once`
    );
    reportStatus[lang] = true;
  }
};

/** Get language from path */
export const path2Lang = (path = "", debug = false): HopeLang => {
  if (path in path2langConfig) return path2langConfig[path];

  if (debug)
    console.warn(
      `${path} isn’t assign with a lang, and will return 'en-US' instead.`
    );

  return "en-US";
};

/** Get path from language */
export const lang2Path = (lang = "", debug = false): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as HopeLang];

  if (debug)
    console.warn(`${lang} has no path config, and will return '/' instead.`);

  return "/";
};

/**
 * Get language of root directory
 *
 * @param context VuePress Context
 * @returns root language
 */
export const getRootLang = (context: Context): string => {
  // infer from siteLocale
  const siteLocales = context.siteConfig.locales;

  if (siteLocales?.["/"] && siteLocales["/"]?.lang)
    return siteLocales["/"].lang;

  return "en-US";
};

/**
 * Get the infer language path from root directory language
 *
 * @param context VuePress Context
 * @returns infer language
 */
export const getRootLangPath = (context: Context): string =>
  lang2Path(getRootLang(context));

export const getLocalePaths = (context: Context): string[] =>
  Array.from(new Set([...Object.keys(context.siteConfig.locales || {})]));

export interface GetLocalesOptions<T extends LocaleData> {
  context: Context;
  default: ConvertLocaleConfig<T>;
  config?: LocaleConfig<T> | undefined;
  name?: string;
}

/**
 * Get final locale config to passed to client
 *
 * @param app  VuePress Node App
 * @param defaultLocalesConfig default locale config
 * @param userLocalesConfig user locale config
 * @returns final locale config
 */
export const getLocales = <T extends LocaleData>({
  context,
  name,
  default: defaultLocalesConfig,
  config: userLocalesConfig = {},
}: GetLocalesOptions<T>): ConvertLocaleConfig<T> => {
  const rootPath = getRootLangPath(context);
  const logger = new Logger(name);

  return Object.fromEntries([
    ...getLocalePaths(context)
      .filter((localePath) => localePath !== "/")
      .map<[string, T]>((localePath) => {
        if (!defaultLocalesConfig[localePath])
          logger.warn(`Locale ${localePath} is missing it's i18n config`);

        return [
          localePath,
          deepAssign(
            {},
            defaultLocalesConfig[localePath] ||
              defaultLocalesConfig[rootPath] ||
              {},
            userLocalesConfig[localePath] || {}
          ),
        ];
      }),
    [
      "/",
      deepAssign(
        {},
        defaultLocalesConfig[rootPath],
        userLocalesConfig["/"] || userLocalesConfig[rootPath] || {}
      ),
    ],
  ]);
};
