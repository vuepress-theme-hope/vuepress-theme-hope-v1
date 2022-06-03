import type { CAC } from "cac";
import type { Application } from "express";
import type { default as WebpackDevServer } from "webpack-dev-server";
import type { default as WebpackChainConfig } from "webpack-chain";
import type { Config } from "./config";
import type { Context } from "./context";
import type { ExtendMarkdown } from "./markdown";
import type { Page, PageOptions } from "./page";
import type { UserPlugins, PluginOptions } from "./plugin";
import type { ThemeConfig } from "./theme";

export type PlainObjectWithStringValue = Record<string, string>;

export type MarkdownItChainConfig = WebpackChainConfig;

export interface PluginGeneratedFile {
  name: string;
  content: string;
}

export type EnhanceAppFilesGeneratedFile = PluginGeneratedFile;

export type ClientDynamicModulesGeneratedFile = PluginGeneratedFile & {
  dirname?: string;
};

export type PluginGeneratedFileTypes<T extends PluginGeneratedFile> =
  | T
  | T[]
  | Promise<T>
  | Promise<T[]>;

/**
 * Plugin Options API
 */
export type PluginEntryOptions = {
  /**
   * Current name
   */
  name: string;

  /**
   * Specify whether current plugin can be applied multiple times.
   */
  multiple?: boolean;

  /**
   * Sub plugins
   */
  plugins?: UserPlugins;

  /**
   * Edit the internal webpack config with webpack-chain.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#chainwebpack
   */
  chainWebpack?: (config: WebpackChainConfig, isServer: boolean) => void;

  /**
   * Specify define
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#define
   */
  define?: Record<string, unknown> | (() => Record<string, unknown>);

  /**
   * Specify alias
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#alias
   */
  alias?: Record<string, string>;

  /**
   * Equivalent to `before` in `webpack-dev-server`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#beforedevserver
   */
  beforeDevServer?: (app: Application, server: WebpackDevServer) => void;

  /**
   * Equivalent to `after` in `webpack-dev-server`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#afterdevserver
   */
  afterDevServer?: (app: Application, server: WebpackDevServer) => void;

  /**
   * A function to edit default config or apply extra plugins to the `markdown-it` instance.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown
   */
  extendMarkdown?: ExtendMarkdown;

  /**
   * Edit the internal Markdown config with `markdown-it-chain`
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#chainmarkdown
   */
  chainMarkdown?: (config: MarkdownItChainConfig) => void;

  /**
   * This option accepts absolute file path(s) pointing to the enhancement file(s).
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#enhanceappfiles
   */
  enhanceAppFiles?:
    | string
    | string[]
    | (() =>
        | PluginGeneratedFileTypes<EnhanceAppFilesGeneratedFile>
        | string
        | string[]);

  /**
   * Generate some client modules at compile time.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#clientdynamicmodules
   */
  clientDynamicModules?: () => PluginGeneratedFileTypes<ClientDynamicModulesGeneratedFile>;

  /**
   * A function used to extend or edit the $page object
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendpagedata
   */
  extendPageData?: <
    ExtraData extends Record<string, unknown> = Record<string, never>
  >(
    page: Page & ExtraData
  ) => void | Promise<void>;

  /**
   * A path to the mixin file which allows you to control the lifecycle of root component.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#clientrootmixin
   */
  clientRootMixin?: string;

  /**
   * Add extra pages pointing to a Markdown file:
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#additionalpages
   */
  additionalPages?:
    | Partial<PageOptions>[]
    | (() => Promise<Partial<PageOptions>[]>);

  /**
   * Define global ui components fixed somewhere on the page.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#globaluicomponents
   */
  globalUIComponents?: string | string[];

  /**
   * Register a extra command to enhance the CLI of VuePress.
   *
   * @see https://vuepress.vuejs.org/plugin/option-api.html#extendcli
   */
  extendCli?: (cac: CAC) => void;
};

/**
 * Export type of plugin entry
 *
 * @see https://vuepress.vuejs.org/plugin/writing-a-plugin.html
 */
export type PluginEntry = PluginEntryOptions & {
  /**
   * The ready hook is executed after the application is initialized.
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#ready
   */
  ready?: () => void | Promise<void>;

  /**
   * Trigger when a new compilation is triggered
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#updated
   */
  updated?: () => void;

  /**
   * Called when a (production) build finishes, with an array of generated page HTML paths.
   *
   * @see https://vuepress.vuejs.org/plugin/life-cycle.html#generated
   */
  generated?: (pagePaths: string[]) => void | Promise<void>;
};

export type PluginFunction<
  T extends PluginOptions = PluginOptions,
  U extends ThemeConfig = ThemeConfig
> = (pluginOptions: T, context: Context<U, Config<U>>) => PluginEntry;

/**
 * Export type of plugin entry with function support
 *
 * @see https://vuepress.vuejs.org/plugin/writing-a-plugin.html
 */
export type Plugin<
  T extends PluginOptions = PluginOptions,
  U extends ThemeConfig = ThemeConfig
> = PluginEntry | PluginFunction<T, U>;

export type PluginConfig<PluginOption = unknown> =
  | string
  | PluginEntry
  | [string]
  | [string, PluginOption]
  | [Plugin, PluginOption]
  | Record<string, PluginOption>;
