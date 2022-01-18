import type {
  ConvertLocaleConfig,
  LocaleConfig,
} from "@mr-hope/vuepress-shared";

export interface CopyCodeLocaleData {
  /**
   * 复制按钮文字
   *
   * Copy button label text
   */
  copy: string;

  /**
   * 复制成功提示消息文字
   *
   * Success message text after content is copied
   */
  hint: string;
}

export type CopyCodeLocaleConfig = ConvertLocaleConfig<CopyCodeLocaleData>;

export interface CopyCodeOptions {
  /**
   * 代码块选择器
   *
   * Code block selector
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[];
  /**
   * 提示消息显示时间
   *
   * Prompt message display time
   *
   * @default 2000
   */
  duration?: number;
  /**
   * 是否展示在移动端
   *
   * Whether to display on the mobile side
   *
   * @default false
   */
  showInMobile?: boolean;

  /**
   * Locale config
   */
  locales?: LocaleConfig<CopyCodeLocaleData>;
}

declare global {
  const CODE_COPY_OPIONS: Required<CopyCodeOptions>;
  const CODE_COPY_LOCALES: CopyCodeLocaleConfig;
}
