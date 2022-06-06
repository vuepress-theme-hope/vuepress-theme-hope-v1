import type {
  BackToTopLocaleConfig,
  ExternalLinkLocaleConfig,
} from "./locales";

import "./declare";

export * from "./locales";
export * from "./options";

declare global {
  const BACK_TO_TOP_THRESHOLD: number;
  const BACK_TO_TOP_LOCALES: BackToTopLocaleConfig;
  const EXTERNAL_LINK_LOCALES: ExternalLinkLocaleConfig;
  const ICON_PREFIX: string;
}
