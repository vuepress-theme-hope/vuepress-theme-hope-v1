import type { HopeThemeMetaLocateData } from "./meta";
import type { HopeThemeNavbarLocaleData } from "./navbar";
import type { HopeThemeRouteLocaleData } from "./route";

export interface HopeThemeLayoutLocaleData {
  navbarLocales: HopeThemeNavbarLocaleData;

  metaLocales: HopeThemeMetaLocateData;

  routeLocales: HopeThemeRouteLocaleData;
}
