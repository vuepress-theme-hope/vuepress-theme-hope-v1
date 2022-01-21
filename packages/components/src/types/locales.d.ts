import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ComponentLocaleData {
  /**
   * 返回顶部文字
   *
   * Back to top button label text
   */
  backToTop: string;

  /**
   * 在新窗口中打开
   *
   * Open in new window text
   */
  openInNewWindow: string;
}

export type ComponentLocaleConfig = ConvertLocaleConfig<ComponentLocaleData>;
