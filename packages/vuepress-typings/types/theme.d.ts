import type { PluginEntry } from "./plugin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThemeLocaleData = Record<string, any>;

export interface ThemeLocaleConfig {
  [key: string]: ThemeLocaleData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ThemeConfig extends Record<string, any> {
  locales?: ThemeLocaleConfig;
}

export interface ThemeEntry extends PluginEntry {
  /**
   * HTML template path used in dev mode.
   *
   * @default https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html
   * @see https://vuepress.vuejs.org/theme/option-api.html#devtemplate
   */
  devTemplate?: string;

  /**
   * HTML template path used in build mode
   *
   * @default https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.ssr.html
   * @see https://vuepress.vuejs.org/theme/option-api.html#ssrtemplate
   */
  ssrTemplate?: string;

  /**
   * Extends a theme
   *
   * @see https://vuepress.vuejs.org/theme/option-api.html#extend
   */
  extend?: string;

  /**
   * Global layout component is a component responsible for the global layout strategy.
   *
   * @see https://vuepress.vuejs.org/theme/option-api.html#globallayout
   */
  globalLayout?: string;
}

export type ThemeEntryFunction<T extends ThemeConfig = ThemeConfig> = (
  themeConfig: T,
  ctx: Context<T, Config<T>>
) => ThemeEntry;

/**
 * Export type of theme entry with function support
 *
 * @see https://vuepress.vuejs.org/theme/option-api.html
 */
export type Theme<T extends ThemeConfig = ThemeConfig> =
  | ThemeEntry
  | ThemeEntryFunction<T>;
