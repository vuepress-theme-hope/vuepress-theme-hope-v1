import type { LocaleConfig } from "vuepress-shared";
import type { BackToTopLocaleData, ExternalLinkLocaleData } from "./locales";

export type AvailableComponent =
  | "Badge"
  // | "CodePen"
  | "ExternalLinkIcon"
  | "FontIcon";
// | "PDF"
// | "StackBlitz";

export interface ComponentOptions {
  /**
   * Components to be registered
   *
   * 需要被注册的组件
   *
   * @default []
   */
  components: AvailableComponent[];

  /**
   * Whether enabling backToTop button
   *
   *
   * @description When setting a number, it will be used as backToTop button threshold distance (in pixels)
   *
   * 是否启用返回顶部按钮
   *
   * @description 当设置为数字时，将会作为返回顶部按钮距离阈值 (单位: 像素)
   *
   * @default false
   */
  backToTop?: number | boolean;

  /**
   * backToTop button Locales config
   *
   * 返回顶部按钮国际化配置
   */
  backToTopLocales?: LocaleConfig<BackToTopLocaleData>;

  /**
   * Locales config for external link
   *
   * 国际化配置
   */
  externalLinkLocales?: LocaleConfig<ExternalLinkLocaleData>;

  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `'iconfont'` and `'font-awesome'` keywords are supported
   */
  iconAssets?: string;

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ''
   */
  iconPrefix?: string;
}
