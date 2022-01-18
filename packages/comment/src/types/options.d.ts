import type { DisableCommentOptions } from "./disable";
import type { ValineOptions } from "./valine";
import type { VssueOptions } from "./vssue";
import type { WalineOptions } from "./waline";

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentOptions =
  | ValineOptions
  | WalineOptions
  | VssueOptions
  | DisableCommentOptions;
