import {
  deepAssignReverse,
  getLocales,
  path2Lang,
} from "@mr-hope/vuepress-shared";
import { resolveEncrypt } from "./encrypt";
import { themeLocales } from "./locales";

import type { Context } from "@mr-hope/vuepress-types";
import type {
  HopeThemeConfig,
  HopeVuePressConfig,
  ResolvedHopeThemeConfig,
  ResolvedHopeVuePressConfig,
} from "../types";

const defaultConfig = {
  base: process.env.VuePress_BASE || "/",

  temp: "./node_modules/.temp",

  locales: {},

  theme: "hope",

  themeConfig: { locales: {} },

  evergreen: true,
};

const defaultThemeConfig: HopeThemeConfig = {
  sidebarDepth: 2,
  iconPrefix: "icon-",
  footer: {},
  editLinks: true,
};

const convertThemeConfig = (
  themeConfig: HopeThemeConfig & Record<string, unknown>
): void => {
  // FIXME: Compact Code
  [
    // v1 options
    ["namedChunk", "chunkRename"],
    ["addthis", "addThis"],
    ["markdown", "mdEnhance"],
    ["lastUpdatedTransformer", "lastUpdate"],
  ].forEach(([oldOptions, newOptions]) => {
    if (oldOptions in themeConfig) {
      console.warn(
        `"${oldOptions}" is deprecated, you should use "${newOptions}" instead.`
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line
      options[newOptions] = options[oldOptions];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line
      delete options[oldOptions];
    }
  });
};

export const resolveThemeConfig = (
  themeConfig: HopeThemeConfig,
  context: Context
): ResolvedHopeThemeConfig => {
  convertThemeConfig(themeConfig as HopeThemeConfig & Record<string, unknown>);

  // merge default themeConfig
  deepAssignReverse(defaultThemeConfig, themeConfig);

  // inject locales
  themeConfig.locales = getLocales(context, themeLocales, themeConfig.locales);
  // handle encrypt options
  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);

  return themeConfig as ResolvedHopeThemeConfig;
};

export const resolveVuePressConfig = (
  config: HopeVuePressConfig
): ResolvedHopeVuePressConfig => {
  // merge default config
  deepAssignReverse(defaultConfig, config);

  // assign lang to locales
  for (const path in config.locales) {
    if (path !== "/" && !config.locales[path].lang)
      config.locales[path].lang = path2Lang(path);
  }

  return config as ResolvedHopeVuePressConfig;
};
