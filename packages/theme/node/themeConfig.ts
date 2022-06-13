import { deepAssignReverse, getLocales } from "vuepress-shared";
import { covertThemeConfig } from "./compact";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { Context } from "vuepress-typings";
import type {
  HopeThemeConfig,
  HopeThemeLocaleOptions,
  ResolvedHopeThemeConfig,
} from "../types";

const defaultThemeConfig: HopeThemeConfig = {
  sidebarDepth: 2,
  iconPrefix: "iconfont icon-",
};

const defaultLocaleOptions: HopeThemeLocaleOptions = {
  // features
  // blog: {},
  // layouts
  repoDisplay: true,
  navbarIcon: true,
  navbarAutoHide: "mobile",
  hideSiteNameonMobile: true,
  sidebar: "auto",
  sidebarIcon: true,
  // headerDepth: 2,
  sidebarDepth: 2,
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
