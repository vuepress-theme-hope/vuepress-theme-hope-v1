import PhotoSwipe = require("photoswipe");
import type { PhowoSwipeLocaleConfig } from "./locales";

export * from "./locales";
export * from "./options";

declare global {
  const PHOTO_SWIPE_DELAY: number;
  const PHOTO_SWIPE_SELECTOR: string;
  const PHOTO_SWIPE_OPTIONS: PhotoSwipe.Options;
  const PHOTO_SWIPE_LOCALES: PhowoSwipeLocaleConfig;
}
