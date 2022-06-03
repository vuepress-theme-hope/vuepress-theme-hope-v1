/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import type { default as WebpackChainConfig } from "webpack-chain";
import type { Locales } from "./locale";
import type { MarkdownConfig } from "./markdown";
import type { PluginConfig } from "./plugin";
import type { PostCssLoaderOptions, StylusLoaderOptions } from "./style";
import type { ThemeConfig } from "./theme";

/**
 * HTML tag name
 */
export type HTMLTagName = keyof HTMLElementTagNameMap;

export type HeadItem = [
  HTMLTagName,
  Partial<HTMLElementTagNameMap[HTMLTagName]>,
  string? /* innerHTML */
];

interface BaseSiteConfig {
  /**
   * 部署站点的基础路径
   *
   * Base URL
   *
   * @default '/'
   * @see https://vuepress.vuejs.org/config/#base
   */
  base?: `/${string}/`;

  /**
   * 网站的标题
   *
   * Title for the site
   *
   * @see https://vuepress.vuejs.org/config/#title
   */
  title?: string;

  /**
   * 网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中
   *
   * Description for the site.
   *
   * @see https://vuepress.vuejs.org/config/#description
   */
  description?: string;

  /**
   * 额外的需要被注入到当前页面的 HTML <head> 中的标签
   *
   * Extra tags to inject into the page HTML <head>
   *
   * @see https://vuepress.vuejs.org/config/#head
   */
  head?: HeadItem[];

  /**
   * 指定用于 dev server 的主机名
   *
   * Specify the host to use for the dev server.
   *
   * @see https://vuepress.vuejs.org/config/#host
   */
  host?: string;

  /**
   * 指定 dev server 的端口
   *
   * Specify the port to use for the dev server.
   *
   * @see https://vuepress.vuejs.org/config/#port
   */
  port?: number;

  /**
   * 指定客户端文件的临时目录
   *
   * Specify the temporary directory for client.
   *
   * @default '/path/to/@vuepress/core/.temp'
   * @see https://vuepress.vuejs.org/config/#temp
   */
  temp?: number;

  /**
   * 指定 vuepress build 的输出目录
   *
   * Specify the output directory for `vuepress build`.
   *
   * @default '.vuepress/dist'
   * @see https://vuepress.vuejs.org/config/#dest
   */
  dest?: string;

  /**
   * 提供多语言支持的语言配置
   *
   * Specify locales for i18n support.
   *
   * @see https://vuepress.vuejs.org/config/#locales
   */
  locales?: Locales;

  /**
   * 一个函数，用来控制对于哪些文件，是需要生成 `<link rel="prefetch">` 资源提示的
   *
   * A function to control what files should have <link rel="prefetch"> resource hints generated.
   *
   * @default '() => true'
   * @see https://vuepress.vuejs.org/config/#shouldprefetch
   */
  shouldPrefetch?: (
    file: string,
    type: "script" | "style" | "font" | "image"
  ) => boolean;

  /**
   * 此选项可以用于指定 cache 的路径，同时也可以通过设置为 `false` 来在每次构建之前删除 cache
   *
   * You can use this option to specify the path to the cache.
   *
   * @default 'true'
   * @see https://vuepress.vuejs.org/config/#cache
   */
  cache?: string | boolean;

  /**
   * 指定额外的需要被监听的文件
   *
   * Specify extra files to watch.
   *
   * @see https://vuepress.vuejs.org/config/#extrawatchfiles
   */
  extraWatchFiles?: string[];

  /**
   * 指定想要处理的文件
   *
   * Specify which pattern of files you want to be resolved.
   *
   * @see https://vuepress.vuejs.org/config/#patterns
   */
  patterns?: string[];
}

export type BuildSiteConfig = {
  /**
   * Options for postcss-loader 3.x
   *
   * @default { plugins: [require('autoprefixer')] }
   * @see https://vuepress.vuejs.org/config/#postcss
   */
  postcss?: PostCssLoaderOptions;

  /**
   * Options for stylus-loader
   *
   * @todo complete type, welcome pull request.
   * @default { preferPathResolver: 'webpack' }
   * @see https://vuepress.vuejs.org/config/#stylus
   */
  stylus?: StylusLoaderOptions;

  /**
   * Options for sass-loader to load *.scss files.
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#scss
   */
  scss?: Record<string, any>;

  /**
   * Options for sass-loader to load *.sass files.
   *
   * @todo complete type, welcome pull request.
   * @default { indentedSyntax: true }
   * @see https://vuepress.vuejs.org/config/#sass
   */
  sass?: Record<string, any>;

  /**
   * Options for less-loader
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#less
   */
  less?: Record<string, any>;

  /**
   * Edit the internal webpack config.
   *
   * @todo complete type, welcome pull request.
   * @see https://vuepress.vuejs.org/config/#configurewebpack
   */
  configureWebpack?:
    | WebpackConfiguration
    | ((config: WebpackConfiguration, isServer: boolean) => void)
    | ((
        config: WebpackConfiguration,
        isServer: boolean
      ) => WebpackConfiguration);

  /**
   * 通过 webpack-chain 来修改内部的 Webpack 配置
   *
   * Edit the internal webpack config with webpack-chain.
   *
   * @see https://vuepress.vuejs.org/config/#chainwebpack
   */
  chainWebpack?: (config: WebpackChainConfig, isServer: boolean) => void;
};

/**
 * @see https://vuepress.vuejs.org/config
 */
export interface Config<T extends ThemeConfig>
  extends BaseSiteConfig,
    BuildSiteConfig {
  /**
   * 主题名称
   *
   * Specify this to use a custom theme.
   *
   * @see https://vuepress.vuejs.org/config/#theme
   */
  theme?: string;

  /**
   * 主题选项
   *
   * Provide config options to the used theme.
   *
   * @see https://vuepress.vuejs.org/config/#themeconfig
   */

  themeConfig?: T;

  /**
   * Specify plugins.
   *
   * @see https://vuepress.vuejs.org/config/#plugins
   */
  plugins?: PluginConfig[];

  /**
   * Markdown options.
   *
   * @see https://vuepress.vuejs.org/config/#markdown
   */
  markdown?: MarkdownConfig;

  /** 设置成 `true` 将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积 */
  evergreen?: boolean;

  // Undocumented
  /**
   * @undocumented
   */
  name?: string;
  /**
   * @undocumented
   */
  devServer?: WebpackDevServerConfiguration;
  /**
   * @undocumented
   */
  devTemplate?: string;
  /**
   * @undocumented
   */
  permalink?: string;
  [key: string]: any;
}

/**
 * Expose `VuePress` config with function support
 */
export type UserConfig<T extends ThemeConfig> =
  | Config<T>
  | ((ctx: Context<T, Config<T>>) => Config<T>);
