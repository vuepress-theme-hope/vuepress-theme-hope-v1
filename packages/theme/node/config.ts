import { deepAssignReverse, path2Lang } from "@mr-hope/vuepress-shared";

import type { HopeVuePressConfig, ResolvedHopeVuePressConfig } from "../types";

const defaultConfig = {
  base: process.env.VuePress_BASE || "/",

  temp: "./node_modules/.temp",

  locales: {},

  theme: "hope",

  themeConfig: { locales: {} },

  evergreen: true,
};

export const config = (
  config: HopeVuePressConfig
): ResolvedHopeVuePressConfig => {
  // merge default config
  deepAssignReverse(defaultConfig, config);

  if (!config.locales) config.locales = {};

  // assign lang to locales
  for (const path in config.locales) {
    if (path !== "/" && !config.locales[path].lang)
      config.locales[path].lang = path2Lang(path);
  }

  return config as ResolvedHopeVuePressConfig;
};
