import type { Config } from "vuepress-typings";
import type {
  HopeThemeNavbarConfig,
  HopeSideBarConfig,
  HopeThemeConfig,
  ResolvedHopeVuePressConfig,
} from "./theme";
import "./declare";
import "./extend";

export * from "./theme";

export const config: (
  config: Config<HopeThemeConfig>
) => ResolvedHopeVuePressConfig;

export const themeConfig: (themeConfig: HopeThemeConfig) => HopeThemeConfig;
export const navbarConfig: (
  navbarConfig: HopeThemeNavbarConfig
) => HopeThemeNavbarConfig;
export const sidebarConfig: (
  sidebarConfig: HopeSideBarConfig
) => HopeSideBarConfig;
