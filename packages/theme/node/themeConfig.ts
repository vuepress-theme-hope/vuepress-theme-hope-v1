import { deepAssignReverse, getLocales } from "vuepress-shared";
import { covertThemeConfig } from "./compact";
import { resolveEncrypt } from "./encrypt";
import { themeLocalesData } from "./locales";

import type { Context } from "vuepress-typings";
import type {
  HopeThemeOptions,
  HopeThemeLocaleConfig,
  HopeThemeLocaleOptions,
  HopeThemeConfig,
} from "../types";

const rootAllowConfig = [
  "blog",
  "encrypt",
  "pure",
  "darkmode",
  "themeColor",
  "fullscreen",
  "mobileBreakPoint",
];

const defaultRootOptions: HopeThemeOptions = {
  // features
  blog: {},
  encrypt: {},

  // appearance
  // pure: false,
  darkmode: "switch",
  themeColor: false,
  fullscreen: false,

  // others
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
  headerDepth: 2,
};

export const resolveThemeConfig = (
  themeOptions: HopeThemeOptions,
  context: Context
): HopeThemeConfig => {
  covertThemeConfig(themeOptions as HopeThemeOptions & Record<string, unknown>);

  // // merge default themeConfig
  // deepAssignReverse(defaultThemeConfig, themeConfig);

  // // inject locales
  // themeConfig.locales = getLocales({
  //   context,
  //   name: "vuepress-theme-hope",
  //   config: themeConfig.locales,
  //   default: themeLocalesData,
  // });
  // // handle encrypt options
  // if (themeConfig.encrypt) resolveEncrypt(themeConfig.encrypt);

  // return themeConfig as ResolvedHopeThemeConfig;

  const themeData: HopeThemeOptions = {
    ...defaultRootOptions,
    ...Object.fromEntries(
      Object.entries(themeOptions).filter(([key]) =>
        rootAllowConfig.includes(key)
      )
    ),
    locales:
      // assign locale data to `themeConfig`
      getLocales({
        context,
        name: "vuepress-theme-hope",
        default: Object.fromEntries(
          Object.entries(themeLocalesData).map(([locale, config]) => {
            // if (!enableBlog) {
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   delete config.blogLocales;
            //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //   // @ts-ignore
            //   delete config.paginationLocales;
            // }

            return [
              locale,
              {
                // default config
                ...defaultLocaleOptions,
                ...config,
              },
            ];
          })
        ),
        // extract localeConfig
        config: Object.fromEntries(
          [
            ["/", {}] as [string, HopeThemeLocaleOptions],
            ...Object.entries(themeOptions.locales || {}),
          ].map<[string, HopeThemeLocaleConfig]>(
            ([localePath, localeConfig]) => [
              localePath,
              {
                // root config
                ...Object.fromEntries(
                  Object.entries(themeOptions).filter(
                    ([key]) =>
                      key !== "locales" && !rootAllowConfig.includes(key)
                  )
                ),
                // locale options
                ...localeConfig,
              },
            ]
          )
        ),
      }),
  };

  // handle encrypt options
  themeData.encrypt = resolveEncrypt(themeData.encrypt);

  return themeData;
};
