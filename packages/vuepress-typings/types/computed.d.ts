import type VueRouter, { Route } from "vue-router";
import type { ThemeConfig, ThemeLocaleData } from "./config";
import type { LocaleConfig } from "./locale";
import type { BasePage, Page, PageFrontmatter } from "./page";
import type { SiteData } from "./site";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResolvedThemeLocaleData extends ThemeLocaleData {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThemeData extends ThemeConfig {}

export interface ClientComputedMixin<T, C> {
  readonly $site: C;
  readonly $themeConfig: T;
  readonly $frontmatter: PageFrontmatter;
  readonly $localeConfig: LocaleConfig;
  readonly $siteTitle: string;
  readonly $title: string;
  readonly $description: string;
  readonly $lang: string;
  readonly $localePath: string;
  readonly $themeLocaleConfig: ThemeLocaleData;
  readonly $page: BasePage;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  __page: Page;

  setPage: (page: Page) => void;
}

declare module "vue/types/vue" {
  export interface Vue {
    $description: string;
    $frontmatter: PageFrontmatter;
    $lang: string;
    $localeConfig: {
      lang: string;
      path: string;
    };
    $localePath: string;
    $page: BasePage;

    // context.getSiteData()
    $site: SiteData;
    $siteTitle: string;
    $themeConfig: ThemeData;
    $themeLocaleConfig: ResolvedThemeLocaleData;
    $title: string;

    // injected in client/app.js
    $withBase: (path: string) => string;

    // vue-router
    $router: VueRouter;
    $route: Route;
  }
}
