declare module "twikoo" {
  export interface TwikooInitOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * Container Element selector
     */
    el: string;

    /**
     * Article path
     *
     * @default window.location.pathname
     */
    path?: string;

    /**
     * Diplay language
     */
    lang?: string;

    /**
     * Calback when comment loaded
     */
    onCommentLoaded?: () => void;
  }
  export interface TwikooCommentCountOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * @description protocal, domain and url should not be included
     */
    urls: string[];
    /**
     * Whether include reply
     *
     * @default false
     */
    includeReply?: boolean;
  }

  export interface TwikooCommentCountResult {
    url: string;
    count: number;
  }

  export interface TwikooRecentCommentsOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * @description max to 100
     *
     * @default 10
     */
    pageSize?: number;
    /**
     * Whether include reply
     *
     * @default false
     */
    includeReply?: boolean;
  }

  export interface TwikooRecentCommentsResult {
    /** 评论 ID */
    id: string;
    /** 评论地址 */
    url: string;
    /** 昵称 */
    nick: string;
    /** 邮箱的 MD5 值，可用于展示头像 */
    mailMd5: string;
    /** 网址 */
    link: string;
    /** HTML 格式的评论内容 */
    comment: string;
    /** 纯文本格式的评论内容 */
    commentText: string;
    /** 评论时间，格式为毫秒级时间戳 */
    created: number;
    /**
     * 头像地址
     *
     * @version >= 0.2.9
     */
    avatar: string;
    /**
     * 相对评论时间，如 “1 小时前”
     *
     * @version >= 0.2.9
     */
    relativeTime: string;
  }

  export const version: string;
  export const init: (options: TwikooInitOptions) => Promise<void>;
  export const getCommentsCount: (
    options: TwikooCommentCountOptions
  ) => Promise<TwikooCommentCountResult[]>;
  export const getRecentComments: (
    options: TwikooRecentCommentsOptions
  ) => Promise<TwikooRecentCommentsResult[]>;

  export default init;
}

declare module "valine" {
  export interface ValineOption {
    /**
     * Valine 的初始化挂载器。可以是一个 CSS 选择器，也可以是一个实际的 HTML 元素。
     *
     * The DOM element to be mounted on initialization. It can be a CSS selector string or an actual HTMLElement.
     */
    el: string | HTMLElement;
    /**
     * 填入 LeanCloud 中应用的 APP ID
     *
     * Fill in the application appId in LeanCloud
     */
    appId: string;

    /**
     * 填入 LeanCloud 中应用的 APP Key
     *
     * Fill in the application appKey in LeanCloud
     */
    appKey: string;

    /**
     * 评论占位符
     *
     * Placeholder for comment input
     */
    placeholder?: string;

    /**
     * 当前文章页路径，用于区分不同的文章页，以保证正确读取该文章页下的评论列表。
     *
     * Article path
     */
    path?: string;

    /**
     * 头像类型
     *
     * Avator type
     *
     * @default 'mp'
     * @see https://valine.js.org/avatar.html
     */
    avatar?:
      | ""
      | "mp"
      | "identicon"
      | "monsterid"
      | "wavatar"
      | "retro"
      | "robohash"
      | "hide";

    /**
     * 评论所需信息
     *
     * Commenter’s info
     *
     * @default ["nick", "mail", "link"]
     */
    meta?: ("nick" | "mail" | "link")[];

    /**
     * 每页的最大评论数
     *
     * Max comments per page
     *
     * @default 10
     */
    pageSize?: number;

    /**
     * 多语言支持
     *
     * Multilingual support.
     *
     * @default 'zh-CN'
     */
    lang?: "zh-CN" | "zh-TW" | "en" | "ja";

    /**
     * 是否启用访问量
     *
     * Whether enable page views count by default
     *
     * @default false
     */
    visitor?: boolean;

    /**
     * 代码高亮
     *
     * Code highlighting
     *
     * @default true
     */
    highlight?: boolean;

    /**
     * 每次访问强制拉取最新的评论列表头像
     *
     * Each time you access forced pulls the latest avatar.
     *
     * @default false
     */
    avatarForce?: boolean;

    /**
     * 是否记录 IP
     *
     * Whether to record users' IP
     *
     * @default false
     */
    recordIP?: boolean;

    /**
     * 该配置适用于国内自定义域名用户, 海外版本会自动检测(无需手动填写)
     *
     * This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected
     */
    serverURLs?: string;

    /**
     * 自定义表情 CDN
     *
     * Emoji CDN
     */
    emojiCDN?: string;

    /**
     * 自定义表情包映射
     *
     * Emoji maps
     */
    emojiMaps?: Record<string, string>;

    /**
     * 是否启用昵称框自动获取 QQ 昵称和 QQ 头像
     *
     * Whether fetch QQ nickname and avatar when inputing QQ number
     *
     * @default false
     */
    enableQQ?: boolean;

    /**
     * 评论信息必填项配置
     *
     * Set required fields for Commenter’s info
     */
    requiredFields?: ["nick"] | ["nick", "mail"];
  }

  export class Valine {
    constructor(options?: ValineOption);
    init(options: ValineOption): Valine;
    setpath(path: string): void;
  }

  export default Valine;
}

declare module "@CommentService" {
  import vue from "vue";

  export default vue;
}

interface Window {
  AV: unknown;
}
