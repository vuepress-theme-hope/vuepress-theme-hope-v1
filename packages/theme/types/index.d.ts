import type { Config } from "@mr-hope/vuepress-types";
import type {
  HopeNavBarConfig,
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
export const navbarConfig: (navbarConfig: HopeNavBarConfig) => HopeNavBarConfig;
export const sidebarConfig: (
  sidebarConfig: HopeSideBarConfig
) => HopeSideBarConfig;
