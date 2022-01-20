import type { PageComputed } from "@mr-hope/vuepress-types";

export interface SitemapOptions {
  /**
   * domain which to be deployed to
   *
   * 网站域名
   */
  hostname: string;

  /**
   * Extra urls to be included
   *
   * 需要额外包含的网址
   */
  urls?: string[];

  /**
   * Urls to be excluded
   *
   * 不被收录的页面
   */
  exclude?: string[];

  /**
   * Output file name, relative to dest folder
   *
   * 输出的文件名，相对于输出目录
   *
   * @default 'sitemap.xml'
   */
  outFile?: string;

  /**
   * Page default update frequency
   *
   * 页面默认更新频率
   *
   * @default "daily"
   */
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

  /**
   * Date format function
   */
  dateFormatter?: (page: PageComputed) => string;

  /**
   * XML namespaces to turn on - all by default
   */
  xmlNameSpace?: {
    news: boolean;
    video: boolean;
    xhtml: boolean;
    image: boolean;
    custom?: string[];
  };
}
