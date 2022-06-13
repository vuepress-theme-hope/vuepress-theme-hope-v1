export interface HopeThemeAppearanceLocaleData {
  outlookLocales: {
    /**
     * Theme Color
     *
     * 主题色
     */
    themeColor: string;

    /**
     * Theme mode
     *
     * 夜间模式
     */
    darkmode: string;

    /**
     * Fullscreen text
     *
     * 全屏文字
     */
    fullscreen: string;
  };
}

export interface HopeThemeAppearanceOptions {
  /**
   * 是否在移动视图下隐藏站点名称
   *
   * Whether hide site title on mobile
   *
   * @default true
   */
  hideSiteTitleonMobile?: boolean;

  /**
   * 是否在导航栏显示仓库链接
   *
   * Whether display repo link in navbar
   *
   * @default true
   */
  repoDisplay?: boolean;

  /**
   * 是否显示 ”全屏“ 按钮
   *
   * Whether show fullscreen button in navbar
   *
   * @default true
   */
  fullscreen?: boolean;

  /**
   * 是否在侧边栏显示图标
   *
   * Whether show icons in the sidebar
   *
   * @default true
   */
  sidebarIcon?: boolean;

  /**
   * 侧边栏嵌套的标题深度
   *
   * Nested headings depth in sidebar
   *
   * @default 2
   */
  sidebarDepth?: number;

  /**
   * 是否在路径导航显示图标
   *
   * Whether display icon in breadcrumb
   *
   * @default true
   */
  breadcrumbIcon?: boolean;
}

export interface HopeThemeAppearanceRootOptions {
  /**
   * 图标前缀
   *
   * Prefix of icon class
   *
   * @default ''
   */
  iconPrefix?: string;
}
