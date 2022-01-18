import type { CommentOptions } from "./options";
import type { PageInfoLocaleConfig } from "./pageInfo";
import type { WalineLocaleConfig } from "./waline";
import type { ValineLocaleConfig } from "./valine";

import "./declare";

export * from "./options";
export * from "./pageInfo";
export * from "./waline";
export * from "./valine";
export * from "./vssue";

declare global {
  const COMMENT_OPTIONS: CommentOptions;
  const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
  const WALINE_LOCALES: WalineLocaleConfig;
  const VALINE_LOCALES: ValineLocaleConfig;
}
