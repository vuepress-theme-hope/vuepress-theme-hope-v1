import type { ComponentLocaleConfig } from "./locales";
import type { PageInfoLocaleConfig } from "./pageInfo";
import type { PaginationLocaleConfig } from "./pagination";

import "./declare";

export * from "./locales";
export * from "./options";
export * from "./pageInfo";
export * from "./pagination";

declare global {
  const BACK_TO_TOP_THRESHOLD: number;
  const COMPONENT_LOCALES: ComponentLocaleConfig;
  const PAGE_INFO_LOCALES: PageInfoLocaleConfig;
  const PAGINATION_LOCALES: PaginationLocaleConfig;
}
