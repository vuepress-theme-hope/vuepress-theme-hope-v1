export interface HopeThemeBlogLocaleData {
  /** 文章文字 */
  article: string;
  /** 文章列表文字 */
  articleList: string;
  /** 分类文字 */
  category: string;
  /** 标签文字 */
  tag: string;
  /** 时间轴文字 */
  timeline: string;
  /** 时间轴标题文字 */
  timelineTitle: string;
  /** 全部文字 */
  all: string;
  /** 个人介绍 */
  intro: string;
  /** 搜藏文字 */
  star: string;
  /** 幻灯片 */
  slides: string;
  /** 加密 */
  encrypt: string;
}

export interface HopeThemePaginationLocaleData {
  /**
   * Previous page button label text
   *
   * 上一页文字
   */
  prev: string;

  /**
   * Next page button label text
   *
   * 下一页文字
   */
  next: string;

  /**
   * Navigation hint label text
   *
   * 跳转提示文字
   */
  navigate: string;

  /**
   * Navigation button label text
   *
   * 跳转按钮文字
   */
  action: string;

  /**
   * Error text when invalid page number, `$page` will be replaced by total page number automatically
   *
   * 页码错误文字，其中 `$page` 会自动替换为当前的总页数
   */
  errorText: string;
}
