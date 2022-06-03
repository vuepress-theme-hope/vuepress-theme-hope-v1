import type { ClientComputedMixin } from "./computed";
import type { Config } from "./config";
import type { Markdown } from "./markdown";
import type { Page, PageOptions } from "./page";
import type { PluginConfig } from "./plugin";
import type { PluginAPI } from "./plugin-api";
import type { SiteConfig } from "./site";
import type { ThemeConfig } from "./theme";
import type { ThemeAPI } from "./theme-api";

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/App.js
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */

export interface ContextConstructor {
  new (options: ContextOptions): Context;
}

export type App = Context;

/**
 * Context API
 *
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */
export interface Context<
  T = ThemeConfig,
  C extends Config<T> = Config<ThemeConfig>
> {
  /**
   * Whether VuePress run in production environment mode.
   */
  isProd: boolean;

  /**
   * A list of Page objects
   */
  pages: Page<T, C>[];

  /**
   * Root directory where the documents are located.
   */
  sourceDir: string;

  /**
   * Root directory where the temporary files are located.
   */
  tempPath: string;

  /**
   * Output path.
   */
  outDir: string;

  /**
   * i.e. base at config
   */
  base: string;

  /**
   * A utility for writing temporary files to tempPath.
   */
  writeTemp: (file: string, content: string) => void;

  /**
   * Other
   */
  options: ContextOptions;

  /**
   * Current theme config.
   */
  themeConfig: T;

  /**
   * VuePress Config.
   */
  siteConfig: C;

  vuepressDir: string;
  libDir: string;
  cwd: string;

  markdown: Markdown;

  /**
   * Plugin API.
   */
  pluginAPI: PluginAPI;

  /**
   * Theme API.
   */
  themeAPI: ThemeAPI;
  ClientComputedMixinConstructor: new () => ClientComputedMixin;
  ssrTemplate: string;
  devTemplate: string;
  globalLayout: string;
  // cache related properties, added in resolveCacheLoaderOptions()
  cacheDirectory: string;
  cacheIdentifier: string;

  // private
  /** @private */
  resolveConfigAndInitialize: () => void;
  /** @private */
  process: () => Promise<void>;
  /** @private */
  applyInternalPlugins: () => void;
  /** @private */
  applyUserPlugins: () => void;
  /** @private */
  normalizeHeadTagUrls: () => void;
  /** @private */
  resolveCacheLoaderOptions: () => void;
  /** @private */
  resolveTemplates: () => void;
  /** @private */
  resolveGlobalLayout: () => void;
  /** @private */
  resolveCommonAgreementFilePath: () => void | string;
  /** @private */
  resolvePages: () => Promise<void>;
  /** @private */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getThemeConfigValue: (key: string) => any;
  /** @private */
  resolveThemeAgreementFile: (filepath: string) => string | void;
  /** @private */
  resolveSiteAgreementFile: (filepath: string) => string | void;

  // public
  addPage: (options: PageOptions) => Promise<void>;

  /**
   * Get site data.
   */
  getSiteData: () => SiteConfig;

  /**
   * Get internal file path
   */
  getLibFilePath: (relative: string) => string;
  dev: () => Promise<Context>;
  build: () => Promise<Context>;
}

export interface ContextOptions {
  /*
   * ===========
   * cli options
   * ===========
   */

  // dirs
  sourceDir?: string;
  dest?: string;
  temp?: string;

  // listen
  host?: string;
  port?: number;

  // other
  clearScreen?: string;
  open?: boolean;
  cache?: boolean;

  /*
   * ===========
   * api options
   * ===========
   */

  theme?: string;
  plugins?: PluginConfig[];
  siteConfig?: Config;
}
