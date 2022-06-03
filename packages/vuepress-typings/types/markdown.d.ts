import { default as MarkdownIt } from "markdown-it";

export type ExtendMarkdown = (md: MarkdownIt) => void;

export interface MarkdownItToc {
  /** Headings levels to use */
  includeLevel?: number[];
  /** The class for the container DIV */
  containerClass?: string;
  /** A custom slugification function */
  slugify?: (slug: string) => string;
  /** Regex pattern of the marker to be replaced with TOC */
  markerPattern?: RegExp;
  /** Type of list (ul for unordered, ol for ordered) */
  listType?: "ul" | "ol";
  /** A function for formatting headings */
  format?: (heading: string) => string;
  /** If true, renders all the headers in TOC, even if the headers are in incorrect order */
  forceFullToc?: boolean;
  /** Optional HTML string for container header */
  containerHeaderHtml?: string;
  /** Optional HTML string for container footer */
  containerFooterHtml?: string;
  /** A function for transforming the TOC links */
  transformLink?: (link: string) => string;
}

/**
 * Markdown config.
 */
export interface MarkdownConfig {
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code blocks.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-linenumbers
   */
  lineNumbers?: boolean;

  /**
   * 一个将标题文本转换为 slug 的函数
   *
   * Function for transforming header texts into slugs.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-slugify
   */
  slugify?: (str: string) => string;

  /**
   * Options for markdown-it-anchor
   *
   * @default { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }
   * @see https://vuepress.vuejs.org/config/#markdown-anchor
   */
  anchor?: {
    /**
     * @deprecated please using "markdown.slugify"
     */
    slugify?: (str: string) => string;

    /**
     * @default true
     */
    permalink?: boolean;

    /**
     * @default true
     */
    permalinkBefore?: boolean;

    /**
     * @default '#'
     */
    permalinkSymbol?: string;
  };

  /**
   * Option to customize internal links to be compatible when using the
   * [vuepress-plugin-clean-urls](https://vuepress-community.netlify.app/en/plugins/clean-urls/)
   *
   * @default '.html'
   * @see https://vuepress.vuejs.org/config/#markdown-pagesuffix
   */
  pageSuffix?: string;

  /**
   * 外部链接处理
   *
   * The key and value pair will be added to <a> tags that point to an external link.
   *
   * @default { target: '_blank', rel: 'noopener noreferrer' }
   * @see https://vuepress.vuejs.org/config/#markdown-externallinks
   */
  externalLinks?: Record<string, string>;

  /**
   * Options for [markdown-it-table-of-contents](https://github.com/cmaas/markdown-it-table-of-contents).
   *
   * @see https://vuepress.vuejs.org/config/#markdown-toc
   */
  toc?: MarkdownItToc;

  /**
   * You can install any markdown-it plugins through markdown.plugins option.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-plugins
   */
  plugins?: Array<
    | string // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | [string, Record<string, any>]
  >;

  /**
   * 一个用于修改当前的 markdown-it 实例的默认配置，或者应用额外的插件的函数
   *
   * A function to edit default config or apply extra plugins to the [markdown-it](https://github.com/markdown-it/markdown-it)
   *  instance used to render source files.
   *
   * @see https://vuepress.vuejs.org/config/#markdown-extendmarkdown
   */
  extendMarkdown?: ExtendMarkdown;

  /**
   * 提取出的标题级别
   *
   * Headers levels being extracted
   *
   * @see https://vuepress.vuejs.org/config/#markdown-extractheaders
   */
  extractHeaders?: Array<"h2" | "h3" | "h4" | "h5" | "h6">;
}

export interface Markdown extends Omit<MarkdownIt, "render"> {
  render(
    md: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env?: any
  ): {
    html: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    dataBlockString: string;
  };
  x: number;
}
