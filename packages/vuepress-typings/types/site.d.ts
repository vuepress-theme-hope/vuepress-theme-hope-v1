import type { HeadItem } from "./config";
import type { Locales } from "./locale";
import type { BasePage, Page } from "./page";
import type { ThemeConfig } from "./theme";

export interface SiteConfig<T extends ThemeConfig = ThemeConfig> {
  title: string;
  description: string;
  base: string;
  pages: Page[];
  headTags: HeadItem[];
  themeConfig: T;
  locales: Locales;
}

export interface SiteData<T extends ThemeConfig = ThemeConfig> {
  title: string;
  description: string;
  base: string;
  pages: BasePage[];
  headTags: HeadItem[];
  themeConfig: T;
  locales: Locales;
}
