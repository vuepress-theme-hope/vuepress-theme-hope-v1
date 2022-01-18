import type {
  ConvertLocaleConfig,
  LocaleConfig,
} from "@mr-hope/vuepress-shared";
import PhotoSwipe = require("photoswipe");
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export interface PhowoSwipeLocaleData {
  /**
   * 关闭按钮标签文字
   *
   * Close button label text
   */
  close: string;

  /**
   * 全屏按钮标签文字
   *
   * Full screen button label text
   */
  fullscreen: string;

  /**
   * 分享按钮标签文字
   *
   * Share button label text
   */
  share: string;

  /**
   * 缩放按钮标签文字
   *
   * Zoom button label text
   */
  zoom: string;

  /**
   * 上一张图片按钮标签文字
   *
   * Previous image button label text
   */
  prev: string;

  /**
   * 下一张图片按钮标签文字
   *
   * Next image button label text
   */
  next: string;

  /**
   * 功能按钮配置
   *
   * Share button config
   */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}

export type PhowoSwipeLocaleConfig = ConvertLocaleConfig<PhowoSwipeLocaleData>;

export interface PhotoSwipeOptions {
  /**
   * 选择的范围，只有 container 元素内部的图片才会支持点击缩放。
   *
   * The range for selection. Only the image inside the container element will support click zoom
   *
   * @default '.theme-default-content'
   */
  container?: string;

  /**
   * 图片选择器
   *
   * Image selector
   *
   * @default '.theme-default-content :not(a) > img'
   */
  selector?: string;

  /**
   * 传递给 photo-swipe 的额外选项
   *
   * Options which will pass to `photo-swipe`
   */
  options?: PhotoSwipe.Options;

  /**
   * 国际化配置
   *
   * Locale config
   */
  locales?: LocaleConfig<PhowoSwipeLocaleData>;
}

declare global {
  const IMAGE_CONTAINER: string;
  const IMAGE_SELECTOR: string;
  const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
  const PHOTOSWIPE_LOCALES: PhowoSwipeLocaleConfig;
}
