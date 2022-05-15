import {
  getImageMineType,
  resolveHTML,
  resolveUrl,
  getAuthor,
  getCategory,
  isAbsoluteUrl,
  isUrl,
} from "./utils";

import type {
  Context,
  Page,
  PageComputed,
  PageFrontmatter,
} from "@mr-hope/vuepress-types";
import type { Feed } from "./feed";
import type { AuthorInfo } from "./utils";
import type {
  FeedAuthor,
  FeedCategory,
  FeedContributor,
  FeedEnclosure,
  FeedGetter,
  FeedItemOption,
  FeedOptions,
  FeedFrontmatterOption,
} from "../types";

export class FeedPage {
  private pageFeedOptions: FeedFrontmatterOption;
  private frontmatter: PageFrontmatter;

  private base: string;
  private getter: FeedGetter;

  constructor(
    private context: Context,
    private options: FeedOptions,
    private $page: PageComputed,
    private feed: Feed
  ) {
    this.base = this.context.base;
    this.frontmatter = $page.frontmatter;
    this.getter = options.getter || {};
    this.pageFeedOptions = this.frontmatter.feed || {};
  }

  /** Get current page */
  private get page(): Page {
    return this.context.pages.find(
      (page) => page.key === this.$page.key
    ) as Page;
  }

  get title(): string {
    if (typeof this.getter.title === "function")
      return this.getter.title(this.page);

    return this.pageFeedOptions.title || this.page.title;
  }

  /** real url */
  get link(): string {
    if (typeof this.getter.link === "function")
      return this.getter.link(this.page);

    return resolveUrl(this.options.hostname, this.base, this.page.path);
  }

  get description(): string | undefined {
    if (typeof this.getter.description === "function")
      return this.getter.description(this.page);

    if (this.pageFeedOptions.description)
      return this.pageFeedOptions.description;

    if (this.frontmatter.description) return this.frontmatter.description;

    if (this.page.excerpt)
      return `html:${resolveHTML(
        this.context.markdown.render(this.page.excerpt).html,
        this.options.customElements
      )}`;

    return undefined;
  }

  get author(): FeedAuthor[] {
    if (typeof this.getter.author === "function")
      return this.getter.author(this.page);

    if (Array.isArray(this.pageFeedOptions.author))
      return this.pageFeedOptions.author;

    if (typeof this.pageFeedOptions.author === "object")
      return [this.pageFeedOptions.author];

    return this.frontmatter.author === false
      ? []
      : this.frontmatter.author
      ? getAuthor(this.frontmatter.author)
      : this.options.channel?.author
      ? getAuthor(this.options.channel?.author as AuthorInfo)
      : [];
  }

  get category(): FeedCategory[] | undefined {
    if (typeof this.getter.category === "function")
      return this.getter.category(this.page);

    if (Array.isArray(this.pageFeedOptions.category))
      return this.pageFeedOptions.category;

    if (typeof this.pageFeedOptions.category === "object")
      return [this.pageFeedOptions.category];

    const { category } = this.frontmatter;

    return getCategory(category).map((item) => ({ name: item }));
  }

  get enclosure(): FeedEnclosure | undefined {
    if (typeof this.getter.enclosure === "function")
      return this.getter.enclosure(this.page);

    if (this.image)
      return {
        url: this.image,
        type: getImageMineType(this.image.split(".").pop() as string),
      };

    return undefined;
  }

  get guid(): string {
    return this.pageFeedOptions.guid || this.link;
  }

  get pubDate(): Date | undefined {
    if (typeof this.getter.publishDate === "function")
      return this.getter.publishDate(this.page);

    const { time, date = time } = this.page.frontmatter;

    const { createTimeStamp } = this.page || {};

    return date && date instanceof Date
      ? date
      : createTimeStamp
      ? new Date(createTimeStamp)
      : undefined;
  }

  get lastUpdated(): Date {
    if (typeof this.getter.lastUpdateDate === "function")
      return this.getter.lastUpdateDate(this.page);

    const { updateTimeStamp } = this.page || {};

    return updateTimeStamp ? new Date(updateTimeStamp) : new Date();
  }

  get content(): string {
    if (typeof this.getter.content === "function")
      return this.getter.content(this.page);

    if (this.pageFeedOptions.content) return this.pageFeedOptions.content;

    // eslint-disable-next-line no-underscore-dangle
    const { html } = this.context.markdown.render(
      this.page?._strippedContent || ""
    );

    return resolveHTML(html, this.options.customElements);
  }

  get image(): string | undefined {
    if (typeof this.getter.image === "function")
      return this.getter.image(this.page);

    const banner = this.frontmatter.banner as string | undefined;
    const cover = this.frontmatter.cover as string | undefined;

    if (banner) {
      if (isAbsoluteUrl(banner))
        return resolveUrl(this.options.hostname, this.context.base, banner);

      if (isUrl(banner)) return banner;
    }

    if (cover) {
      if (isAbsoluteUrl(cover))
        return resolveUrl(this.options.hostname, this.context.base, cover);

      if (isUrl(cover)) return cover;
    }

    const result = /!\[.*?\]\((.*?)\)/iu.exec(
      this.page?._strippedContent || ""
    );

    if (result) {
      if (isAbsoluteUrl(result[1]))
        return resolveUrl(this.options.hostname, this.context.base, result[1]);

      if (isUrl(result[1])) return result[1];
    }

    return undefined;
  }

  get contributor(): FeedContributor[] {
    if (typeof this.getter.contributor === "function")
      return this.getter.contributor(this.page);

    if (Array.isArray(this.pageFeedOptions.contributor))
      return this.pageFeedOptions.contributor;

    if (typeof this.pageFeedOptions.contributor === "object")
      return [this.pageFeedOptions.contributor];

    return this.author;
  }

  get copyright(): string | undefined {
    if (typeof this.getter.copyright === "function")
      return this.getter.copyright(this.page);

    if (this.frontmatter.copyrightText) return this.frontmatter.copyrightText;

    const firstAuthor = this.author[0];

    if (firstAuthor?.name) return `Copyright by ${firstAuthor.name}`;

    return undefined;
  }

  getFeedItem(): FeedItemOption | null {
    const {
      author,
      category,
      content,
      contributor,
      copyright,
      description,
      enclosure,
      guid,
      image,
      lastUpdated,
      link,
      pubDate,
      title,
    } = this;

    // we need at least title or description
    if (!title && !description) return null;

    // add category to feed
    if (category) category.forEach((item) => this.feed.addCategory(item.name));

    // add contributor to feed
    if (contributor)
      contributor.forEach((item) => this.feed.addContributor(item));

    return {
      title,
      link,
      description,
      author,
      category,
      enclosure,
      guid,
      pubDate,
      lastUpdated,
      content,
      image,
      contributor,
      copyright,
    };
  }
}
