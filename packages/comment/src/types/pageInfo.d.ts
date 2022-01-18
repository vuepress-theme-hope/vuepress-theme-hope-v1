import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PageInfoLocaleData {
  /** 作者 */
  author: string;
  /** 写作日期 */
  date: string;
  /** 原创文字 */
  origin: string;
  /** 访问量 */
  views: string;
  /** 标签文字 */
  tag: string;
  /** 分类文字 */
  category: string;
  /** 阅读时间 */
  readingTime: string;
  /** 文章字数 */
  words: string;
}

export type PageInfoLocaleConfig = ConvertLocaleConfig<PageInfoLocaleData>;

/**
 * 页面信息类型
 *
 * Type of page information
 */
export type PageInfo =
  | "author"
  | "time"
  | "category"
  | "tag"
  | "reading-time"
  | "word"
  | "visitor";
