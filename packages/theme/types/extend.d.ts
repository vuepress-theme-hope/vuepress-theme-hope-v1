/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasePageFrontmatterInfo } from "vuepress-shared";
import {
  BlogMedia,
  HopeThemeLocalesConfig,
  HopeThemeLocaleData,
  ResolvedHopeThemeConfig,
} from "./theme";
import { PageInfo } from "@mr-hope/vuepress-plugin-comment";
import { FeedFrontmatterOption } from "@mr-hope/vuepress-plugin-feed";

declare module "vue/types/vue" {
  export interface Vue {
    $category: any;
    $tag: any;
    $currentTag: any;
    $currentCategory: any;
    $pagination: any;
  }
}

declare module "@mr-hope/vuepress-types" {
  interface PageFrontmatter extends BasePageFrontmatterInfo {
    summary?: string;
    sticky?: boolean | number;
    star?: boolean | number;
    article?: boolean;
    timeline?: boolean;
    password?: string | number;
    image?: string;
    copyright?: {
      minLength?: number;
      noCopy?: boolean;
      noSelect?: boolean;
    };
    feed?: FeedFrontmatterOption;
    pageInfo?: PageInfo[] | false;
    pageview?: boolean;
    breadcrumb?: boolean;
    breadcrumbIcon?: boolean;
    navbar?: boolean;
    sidebar?: "auto" | boolean;
    sidebarDepth?: number;
    comment?: boolean;
    editLink?: boolean;
    contributor?: boolean;
    updateTime?: boolean;
    prev?: string | false;
    next?: string | false;
    mediaLink?: BlogMedia;
    search?: boolean;
    backToTop?: boolean;
    anchorDisplay?: boolean;
    containerClass?: string | string[] | Record<string, boolean>;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ResolvedThemeLocaleData
    extends HopeThemeLocaleData,
      HopeThemeLocalesConfig {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeData extends ResolvedHopeThemeConfig {}

  interface Page {
    _chunkName?: string;
  }

  interface ResolvedComponent {
    _chunkName?: string;
  }
}
