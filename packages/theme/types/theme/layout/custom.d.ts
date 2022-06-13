/** 自定义布局配置 */
export interface HopeThemeCustomOptions {
  /** 页面顶部插槽 */
  pageTop?: string;
  /** 文章内容顶部插槽 */
  contentTop?: string;
  /** 文章内容底部插槽 */
  contentBottom?: string;
  /** 页面底部插槽 */
  pageBottom?: string;

  /** 导航栏起始插槽 */
  navbarStart?: string;
  /** 导航栏中部插槽 */
  navbarCenter?: string;
  /** 导航栏结束插槽 */
  navbarEnd?: string;

  /** 侧边栏顶部插槽 */
  sidebarTop?: string;
  /** 侧边栏中部插槽 */
  sidebarCenter?: string;
  /** 侧边栏底部插槽 */
  sidebarBottom?: string;
}
