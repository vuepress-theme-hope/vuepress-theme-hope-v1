import type { Page } from "@vuepress/core";
import type { FeedChannelOption } from "./feed";

export interface FeedOutputOptions {
  atom?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'atom.xml'
     */
    path?: string;
  };
  json?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'feed.json'
     */
    path?: string;
  };
  rss?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'rss.xml'
     */
    path?: string;
  };
}

export interface FeedOptions {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname: string;
  /**
   * A large iamge/icon of the feed
   *
   * 一个大的图片，用作 feed 展示
   */
  image?: string;

  /**
   * A small icon of the feed，probably the favicon
   *
   * 一个小的图标，显示在订阅列表中
   */
  icon?: string;

  /**
   * Max items to be output
   *
   * 输出的最大条目数量
   */
  count?: number;

  /**
   * options to init feed channel
   *
   * Feed Chaneel 选项
   */
  channel?: Partial<FeedChannelOption>;

  /**
   * OutputConfig
   *
   * 输出配置
   */
  output?: FeedOutputOptions;

  /**
   * Feed sorter
   *
   * Feed 项目排序器
   */
  sort?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageA: Page & Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageB: Page & Record<string, any>
  ) => number;

  /**
   * Filter pages to load to feed
   *
   * Feed过滤器
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: (page: Page & Record<string, any>) => boolean;
}
