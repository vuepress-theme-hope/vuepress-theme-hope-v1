import type { FeedAuthor, FeedContributor, FeedCategory } from "./feed";

export interface FeedFrontmatterOption {
  /**
   * Feed title
   */
  title?: string;

  /**
   * Feed description
   */
  description?: string;

  /**
   * Feed content
   */
  content?: string;

  /**
   * Feed author
   */
  author?: FeedAuthor[] | FeedAuthor;

  /**
   * Feed contributor
   */
  contributor?: FeedContributor[] | FeedContributor;

  /**
   * Feed category
   */
  category?: FeedCategory[] | FeedCategory;

  /**
   * @desciption guid should be unique gloably
   */
  guid?: string;
}
