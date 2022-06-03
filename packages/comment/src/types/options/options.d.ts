import type { DisableCommentOptions } from "./disable";
import type { GiscusOptions } from "./giscus";
import type { TwikooOptions } from "./twikoo";
import type { WalineOptions } from "./waline";
import type { ValineOptions } from "./valine";
import type { VssueOptions } from "./vssue";

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentOptions =
  | GiscusOptions
  | TwikooOptions
  | WalineOptions
  | ValineOptions
  | VssueOptions
  | DisableCommentOptions;
