import type { CommentOptions } from "./options";
import type { WalineLocaleConfig } from "./options/waline";
import type { ValineLocaleConfig } from "./options/valine";

import "./declare";

export * from "./frontmatter";
export * from "./options";

declare global {
  const COMMENT_OPTIONS: CommentOptions;
  const WALINE_LOCALES: WalineLocaleConfig;
  const VALINE_LOCALES: ValineLocaleConfig;
}
