import { deepAssignReverse, getLocales, path2Lang } from "vuepress-shared";
import { covertThemeConfig } from "./compact";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { Config, Context } from "vuepress-typings";
import type {
  HopeThemeConfig,
  ResolvedHopeThemeConfig,
  ResolvedHopeVuePressConfig,
} from "../types";

const defaultConfig = {
  base: process.env["VuePress_BASE"] || "/",

  temp: "./node_modules/.temp",

  locales: {},

  theme: "hope",

  themeConfig: { locales: {} },

  evergreen: true,
};

const defaultThemeConfig: HopeThemeConfig = {
  sidebarDepth: 2,
  iconPrefix: "iconfont icon-",
};

export const resolveThemeConfig = (
  themeConfig: HopeThemeConfig,
  context: Context
): ResolvedHopeThemeConfig => {
  covertThemeConfig(themeConfig as HopeThemeConfig & Record<string, unknown>);

  // merge default themeConfig
  deepAssignReverse(defaultThemeConfig, themeConfig);

  // inject locales
  themeConfig.locales = getLocales({
    context,
    name: "vuepress-theme-hope",
    config: themeConfig.locales,
    default: themeLocalesData,
  });
  // handle encrypt options
  if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);

  return themeConfig as ResolvedHopeThemeConfig;
};

export const resolveVuePressConfig = (
  config: Config<HopeThemeConfig>
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
