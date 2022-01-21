import type { CommentOptions } from "./options";
import type { WalineLocaleConfig } from "./waline";
import type { ValineLocaleConfig } from "./valine";

import "./declare";

export * from "./options";
export * from "./waline";
export * from "./valine";
export * from "./vssue";

declare global {
  const COMMENT_OPTIONS: CommentOptions;
  const WALINE_LOCALES: WalineLocaleConfig;
  const VALINE_LOCALES: ValineLocaleConfig;
}
