import type { Config } from "vuepress-typings";
import type {
  HopeThemeNavbarConfig,
  HopeSideBarConfig,
  HopeThemeOptions,
  HopeVuePressConfig,
} from "./theme";
import "./declare";
import "./extend";

export * from "./theme";

export const config: (config: Config<HopeThemeOptions>) => HopeVuePressConfig;

export const themeConfig: (themeConfig: HopeThemeOptions) => HopeThemeOptions;

export const navbar: (
  navbarConfig: HopeThemeNavbarConfig
) => HopeThemeNavbarConfig;

export const navbarConfig: (
  navbarConfig: HopeThemeNavbarConfig
) => HopeThemeNavbarConfig;

export const sidebar: (sidebarConfig: HopeSideBarConfig) => HopeSideBarConfig;

export const sidebarConfig: (
  sidebarConfig: HopeSideBarConfig
) => HopeSideBarConfig;
