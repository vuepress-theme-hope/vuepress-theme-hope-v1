import type { CopyCodeLocaleConfig } from "./locales";
import type { CopyCodeOptions } from "./options";

export * from "./locales";
export * from "./options";

declare global {
  const CODE_COPY_OPIONS: Required<CopyCodeOptions>;
  const CODE_COPY_LOCALES: CopyCodeLocaleConfig;
}
