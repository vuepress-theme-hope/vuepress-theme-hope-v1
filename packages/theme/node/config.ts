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
  iconPrefix: "icon-",
};

export const resolveThemeConfig = (
  themeConfig: HopeThemeConfig,
  context: Context
): ResolvedHopeThemeConfig => {
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
