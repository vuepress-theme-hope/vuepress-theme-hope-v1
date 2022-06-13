import { CAC } from "cac";
import { getAlias } from "./node/alias";
import { covertFrontmatter } from "./node/compact";
import { resolveVuePressConfig } from "./node/config";
import { eject } from "./node/eject";
import { getPluginConfig } from "./node/plugins";
import { resolveThemeConfig } from "./node/themeConfig";

import type { Context, PluginEntry } from "vuepress-typings";
import type {
  HopeThemeNavbarConfig,
  HopeThemeSidebarConfig,
  HopeThemeOptions,
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
  themeConfig: HopeThemeOptions,
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
themeAPI.themeConfig = (themeConfig: HopeThemeOptions): HopeThemeOptions =>
  themeConfig;

themeAPI.navbar = (
  navbarConfig: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => navbarConfig;

themeAPI.navbarConfig = (
  navbarConfig: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => navbarConfig;

themeAPI.sidebar = (
  sidebarConfig: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => sidebarConfig;

themeAPI.sidebarConfig = (
  sidebarConfig: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => sidebarConfig;

export = themeAPI;
