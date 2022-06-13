import { deepAssignReverse, path2Lang } from "vuepress-shared";

import type { Config } from "vuepress-typings";
import type { HopeThemeOptions, HopeVuePressConfig } from "../types";

const DEFAULT_SITE_CONFIG = {
  base: process.env["VuePress_BASE"] || "/",

  temp: "./node_modules/.temp",

  locales: {},

  theme: "hope",

  themeConfig: { locales: {} },

  evergreen: true,
};

export const resolveVuePressConfig = (
  config: Config<HopeThemeOptions>
): HopeVuePressConfig => {
  // merge default config
  deepAssignReverse(DEFAULT_SITE_CONFIG, config);

  // assign lang to locales
  for (const path in config.locales) {
    if (path !== "/" && !config.locales[path].lang)
      config.locales[path].lang = path2Lang(path);
  }

  return config as HopeVuePressConfig;
};
