import type { Config } from "vuepress-typings";
import type { HopeThemeOptions, HopeThemeConfig } from "./options";

export * from "./appearance";
export * from "./autolink";
export * from "./feature";
export * from "./frontmatter";
export * from "./info";
export * from "./layout";
export * from "./navbar";
export * from "./locales";
export * from "./plugin";
export * from "./options";
export * from "./sidebar";

/** vuepress-theme-hope 项目配置 */
export interface HopeVuePressOptions extends Config {
  /** 自定义主题的配置 */
  themeConfig: HopeThemeOptions;
}

/** 处理过的 vuepress-theme-hope 项目配置 */
export interface HopeVuePressConfig extends HopeVuePressOptions {
  /** 使用的自定义主题 */
  theme: "hope";
  /** 自定义主题的配置 */
  themeConfig: HopeThemeConfig;
}
