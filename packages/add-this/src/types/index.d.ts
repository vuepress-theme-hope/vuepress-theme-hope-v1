/** Add this 配置 */
export interface AddThisOptions {
  /**
   * Public ID for add this
   *
   * @see https://vuepress-theme-hope.github.io/add-this/guide/
   *
   * Add This 的公开 ID
   *
   * @see https://vuepress-theme-hope.github.io/add-this/zh/guide/
   */
  pubid: string;
}

declare global {
  const PUB_ID: string;
}
