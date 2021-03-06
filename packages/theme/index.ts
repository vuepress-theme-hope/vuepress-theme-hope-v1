import { CAC } from "cac";
import { getAlias } from "./node/alias";
import { covertFrontmatter } from "./node/compact";
import { resolveVuePressConfig } from "./node/config";
import { eject } from "./node/eject";
import { getPluginConfig } from "./node/plugins";
import { resolveThemeConfig } from "./node/themeConfig";

import type { Context, PluginEntry } from "vuepress-typings";
import type {
  HopeNavBarConfig,
  HopeSideBarConfig,
  HopeThemeConfig,
} from "./types";

const blogAddtionalPages = [
  {
    path: "/article/",
    frontmatter: { layout: "Blog" },
  },
  {
    path: "/star/",
    frontmatter: { layout: "Blog" },
  },
  {
    path: "/encrypt/",
    frontmatter: { layout: "Blog" },
  },
  {
    path: "/slide/",
    frontmatter: { layout: "Blog" },
  },
  {
    path: "/timeline/",
    frontmatter: { layout: "Blog" },
  },
];

// Theme API.
const themeAPI = (
  themeConfig: HopeThemeConfig,
  context: Context
): PluginEntry => {
  const resolvedConfig = resolveThemeConfig(themeConfig, context);

  return {
    name: "vuepress-theme-hope",

    alias: getAlias(resolvedConfig, context),

    plugins: getPluginConfig(resolvedConfig),

    additionalPages: resolvedConfig.blog === false ? [] : blogAddtionalPages,

    extendPageData: (page): void => {
      covertFrontmatter(page.frontmatter, page._filePath);
    },

    extendCli: (cli: CAC): void => {
      cli
        .command(
          "eject-hope [targetDir]",
          "copy vuepress-theme-hope into .vuepress/theme for customization."
        )
        .option("--debug", "eject in debug mode")
        .action((dir: string) => {
          void eject(dir || ".");
        });
    },
  };
};

themeAPI.config = resolveVuePressConfig;

// helper functions
themeAPI.themeConfig = (themeConfig: HopeThemeConfig): HopeThemeConfig =>
  themeConfig;
themeAPI.navbarConfig = (navbarConfig: HopeNavBarConfig): HopeNavBarConfig =>
  navbarConfig;
themeAPI.sidebarConfig = (
  sidebarConfig: HopeSideBarConfig
): HopeSideBarConfig => sidebarConfig;

export = themeAPI;
