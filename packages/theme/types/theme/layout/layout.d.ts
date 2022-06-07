import type { HopeSideBarConfig } from "../extends";
import type { HopeThemeFooterLocaleOptions } from "./footer";
import type { HopeThemeNavbarLocaleOptions } from "./navbar";

export interface HopeLayoutOptions
  extends HopeThemeFooterLocaleOptions,
    HopeThemeMetaLocaleOptions,
    HopeThemeNavbarLocaleOptions {
  /**
   * 侧边栏配置
   *
   * Sidebar configuration
   */
  sidebar?: HopeSideBarConfig;
}
