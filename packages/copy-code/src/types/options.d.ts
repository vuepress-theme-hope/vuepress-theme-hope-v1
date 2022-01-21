import type { LocaleConfig } from "@mr-hope/vuepress-shared";
import type { CopyCodeLocaleData } from "./locales";

export interface CopyCodeOptions {
  /**
   * Code block selector
   *
   * 代码块选择器
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[];
  /**
   * Prompt message display time
   *
   * setting with`0` will disable the hint
   *
   * 提示消息显示时间
   *
   * 设置为 `0` 会禁用提示
   *
   * @default 2000
   */
  duration?: number;
  /**
   * Whether to display on the mobile side
   *
   * 是否展示在移动端
   *
   * @default false
   */
  showInMobile?: boolean;

  /**
   * Locale config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<CopyCodeLocaleData>;
}
