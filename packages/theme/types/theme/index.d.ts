import type { Config } from "vuepress-typings";
import type { HopeThemeConfig, ResolvedHopeThemeConfig } from "./options";

export * from "./appearance";
export * from "./autolink";
export * from "./extends";
export * from "./feature";
export * from "./frontmatter";
export * from "./info";
export * from "./layout";
export * from "./locales";
export * from "./plugin";
export * from "./options";

/** vuepress-theme-hope 项目配置 */
export interface HopeVuePressConfig extends Config {
  /** 自定义主题的配置 */
  themeConfig: HopeThemeConfig;
}

/** 处理过的 vuepress-theme-hope 项目配置 */
export interface ResolvedHopeVuePressConfig extends HopeVuePressConfig {
  /** 使用的自定义主题 */
  theme: "hope";
  /** 自定义主题的配置 */
  themeConfig: ResolvedHopeThemeConfig;
}
