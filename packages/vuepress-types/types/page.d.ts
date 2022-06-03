/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ClientComputedMixin } from "./computed";
import type { Config } from "./config";
import type { Context } from "./context";
import type { Markdown } from "./markdown";
import type { OptionItem } from "./plugin-api";
import type { ThemeConfig } from "./theme";

export interface PageFrontmatter<
  ExtraFrontmatter extends Record<string, unknown> = Record<string, unknown>
> extends ExtraFrontmatter {
  /**
   * 页面标题
   *
   * Page title
   */
  title?: string;

  /**
   * 页面描述
   *
   * Page description
   */
  description?: string;

  /**
   * 页面语言
   *
   * Page language
   */
  lang?: string;

  /**
   * Writting Date
   *
   * 写作日期
   */
  date?: string | Date;

  /**
   * 页面布局组件名称
   *
   * Page layout component name
   */
  layout?: string;

  /**
   * 页面 meta 标题
   *
   * Page meta title
   */
  metaTitle?: string;

  /**
   * 页面 meta 标签
   *
   * Page metas tags
   */
  meta?: Record<"charset" | "content" | "http-equiv" | "name", string>[];

  /**
   * 页面永久链接
   *
   * Page permalink
   */
  permalink?: string;

  /**
   * Canonical Url
   *
   * 规范链接
   */
  canonicalUrl?: string;
}

/*
 * ==================
 * Page basic properties
 * ==================
 */

export interface BasePage {
  /**
   * Page's title
   */
  title: string;

  /**
   * Page's unique hash key
   */
  key: string;

  /**
   * Page's frontmatter object
   */
  frontmatter: PageFrontmatter;

  /**
   * Current page's real link (use regularPath when permalink does not exist)
   */
  path: string;

  /**
   * Current page's default link (follow the file hierarchy)
   */
  regularPath: string;

  /**
   * Page's relative path
   */
  relativePath: string;
  headers?: PageHeader[];
  excerpt?: string;
}

/*
 * ==================
 * Page in context
 * ==================
 */
export type PageEnhancer<T = any> = OptionItem<T>[];

export interface PageProcessOptions {
  computed: ClientComputedMixin;
  markdown: Markdown;
  enhancers: PageEnhancer[];
  preRender: Record<string, unknown>;
}

export interface PageHeader {
  level: number;
  title: string;
  slug: string;
}

export interface Page<
  T extends ThemeConfig = ThemeConfig,
  C extends Config<T> = Config<ThemeConfig>
> extends BasePage {
  /**
   * Name of page's parent directory.
   */
  readonly dirname: string;

  /**
   * file name of page's source markdown file, or the last cut of regularPath.
   */
  readonly filename: string;

  /**
   * slugified file name.
   */
  readonly slug: string;

  /**
   * stripped file name.
   */
  readonly strippedFilename: string;

  /**
   * date of current page.
   */
  readonly date: string;

  /**
   * @private
   *
   * VuePress Context
   */
  _context: Context<T, C>;

  /**
   * Page file's raw content string
   */
  _content: string;

  /**
   * Access the client global computed mixins at build time, e.g _computed.$localePath.
   */
  _computed: ClientComputedMixin<T, C>;

  /**
   * Page Headers
   */
  _extractHeaders: string[];

  /**
   * file's absolute path
   */
  _filePath: string;

  _localePath: string;

  _meta: Record<string, string>[];

  _permalink: string;

  _permalinkPattern: string;

  /**
   * Page file's content string without frontmatter
   */
  _strippedContent: string;

  process: (options: PageProcessOptions) => Promise<void>;
  stripFilename: (fileName: string) => string;
  toJson: () => BasePage;
  buildPermalink: () => void;
  enhance: (enhancers: PageEnhancer[]) => Promise<void>;
}

export interface PageOptions {
  path: string;
  meta: Record<string, string>[];
  title: string;
  content: string;
  filePath: string;
  relative: string;
  permalink: string;
  frontmatter: PageFrontmatter;
  permalinkPattern: string;
}

export interface PageConstructor {
  new (options: PageOptions, context: Context): Page;
}
