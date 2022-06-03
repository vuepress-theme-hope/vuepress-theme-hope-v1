import type { Context, Page } from "vuepress-typings";
import type { SeoContent } from "./ogp";

export type AuthorInfo = { name: string; url?: string };

export type Author = string | string[] | AuthorInfo | AuthorInfo[];

export interface SeoOptions {
  /**
   * Delopy hostname
   *
   * 部署域名
   */
  hostname: string;

  /**
   * Default author
   *
   * 默认作者
   */
  author?: Author;

  /**
   * Content restrictions
   *
   * The age rating of the content, the format is `[int]+`, such as `"13+"`
   *
   * 内容分级情况
   *
   * 内容的年龄分级，格式为`[int]+`，如`"13+"`
   */
  restrictions?: string;

  /**
   * Whether generate description automatically
   *
   * 是否自动生成描述
   *
   * @default true
   */
  autoDescription?: boolean;

  /**
   * Fallback Image link when no image are found
   *
   * @description should be full or absolute links, probably your site favicon
   *
   * 当找不到图片时的回退图片链接
   *
   * @description 应为完整或绝对链接，你可以设置为站点图标
   */
  fallBackImage?: string;

  /**
   * Twitter username
   *
   * Twitter 用户名
   */
  twitterID?: string;

  /**
   * Whether the page is an article
   *
   * 页面是否是文章
   */
  isArticle?: (page: Page) => boolean;

  /**
   * Custom OGP Generator
   *
   * 自定义 OGP 生成器
   */
  seo?: (
    /**
     * OGP Object inferred by plugin
     *
     * 由插件推断出的 OGP 对象
     */
    ogp: SeoContent,
    /**
     * Page Object
     *
     * 页面对象
     */
    page: Page,
    /** VuePress Context */
    context: Context
  ) => SeoContent;

  /**
   * Custom meta tags
   *
   * 自定义 meta 标签
   */
  customMeta?: (
    /**
     * Meta tags
     *
     * Meta 标签
     */
    meta: Record<"content" | "name" | "charset" | "http-equiv", string>[],

    /**
     * Page Object
     *
     * 页面对象
     */
    page: Page,
    /** VuePress Context */
    context: Context
  ) => void;

  /**
   * Add canonical URL
   *
   * 添加首选地址
   */
  canonical?: string | ((page: Page) => string | null);
}
