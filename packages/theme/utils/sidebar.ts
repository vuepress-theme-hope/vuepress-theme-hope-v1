import {
  ensureEndingSlash,
  isLinkExternal,
  normalizePath,
} from "vuepress-shared/lib/client";
import { groupHeaders } from "./groupHeader";
import { ensureExt, resolvePath } from "./path";

import type { BasePage, SiteData } from "vuepress-typings";
import type {
  HopeSideBarConfig,
  HopeSideBarConfigItem,
  HopeThemeConfig,
} from "@theme/types";
import type { SidebarHeader } from "./groupHeader";

export type { SidebarHeader } from "./groupHeader";

export interface SidebarHeaderItem extends SidebarHeader {
  type: "header";
  basePath: string;
  path: string;
}

export interface SidebarAutoItem {
  type: "group";
  /** Group title */
  title: string;
  /** Page Icon */
  icon?: string;
  /** Titles in page */
  children: SidebarHeaderItem[];
  collapsable: false;
  path: "";
}

export const groupSidebarHeaders = groupHeaders;

const resolveSidebarHeaders = (page: BasePage): SidebarAutoItem[] => {
  const headers = page.headers ? groupSidebarHeaders(page.headers) : [];
  const { icon } = page.frontmatter;

  return [
    {
      type: "group",
      collapsable: false,
      title: page.title,
      ...(icon ? { icon: icon } : {}),
      path: "",
      children: headers.map<SidebarHeaderItem>((header) => ({
        ...header,
        type: "header",
        basePath: page.path,
        path: `${page.path}#${header.slug}`,
        ...(header.children ? { children: header.children } : {}),
      })),
    },
  ];
};

const findMatchingSidebarConfig = (
  regularPath: string,
  config: HopeSideBarConfigItem[] | Record<string, HopeSideBarConfigItem[]>
): { base: string; config: HopeSideBarConfigItem[] } | false => {
  // return directly as array-type config is the moest simple config
  if (Array.isArray(config))
    return {
      base: "/",
      config,
    };

  // find matching config
  for (const base in config)
    if (ensureEndingSlash(regularPath).startsWith(encodeURI(base)))
      return {
        base,
        config: config[base],
      };

  console.warn(`${regularPath} do not have valid sidebar config`);

  return false;
};

export interface SidebarExternalItem {
  title?: string;
  icon?: string;
  type: "external";
  path: string;
}

export interface SidebarPageItem extends BasePage {
  type: "page";
  icon?: string;
  path: string;
}

export interface SidebarGroupItem {
  type: "group";
  title: string;
  /** @default true */
  collapsable?: boolean;
  /** @default 1 */
  sidebarDepth?: number;
  icon?: string;
  prefix?: string;
  children: SidebarItem[];

  [props: string]: unknown;
}

export interface SidebarErrorItem {
  type: "error";
  path: string;
}

/** sidebarConfig merged with pageObject */
export const resolvePageforSidebar = (
  pages: BasePage[],
  path: string
): SidebarPageItem | SidebarExternalItem | SidebarErrorItem => {
  // if it is external link
  if (isLinkExternal(path))
    return {
      type: "external",
      path,
    };

  const realPath = normalizePath(path);

  // find matches in all pages
  for (const page of pages)
    if (normalizePath(page.regularPath) === realPath)
      // return sidebarConfig merged with pageObject
      return {
        ...page,
        type: "page",
        path: ensureExt(page.path),
      };

  console.error(`Sidebar: "${realPath}" has no matching page`);

  return { type: "error", path: realPath };
};

export type SidebarItem =
  | SidebarAutoItem
  | SidebarErrorItem
  | SidebarExternalItem
  | SidebarGroupItem
  | SidebarPageItem;

const resolve = (prefix: string, path: string, base: string): string =>
  resolvePath(`${prefix}${path}`, base);

/**
 * @param sidebarConfigItem config item being resolved
 * @param pages pages Object
 * @param base sidebar base
 */
const resolveSidebarItem = (
  sidebarConfigItem: HopeSideBarConfigItem,
  pages: BasePage[],
  base: string,
  prefix = ""
): SidebarItem => {
  // resolve and return directly
  if (typeof sidebarConfigItem === "string")
    return resolvePageforSidebar(
      pages,
      resolve(prefix, sidebarConfigItem, base)
    );

  // custom title with format `['path', 'customTitle']`
  if (Array.isArray(sidebarConfigItem))
    return Object.assign(
      resolvePageforSidebar(pages, resolve(prefix, sidebarConfigItem[0], base)),
      { title: sidebarConfigItem[1] }
    );

  const children = sidebarConfigItem.children || [];

  // item do not have children
  if (children.length === 0 && sidebarConfigItem["path"])
    // cover title
    return Object.assign(
      resolvePageforSidebar(
        pages,
        resolve(prefix, sidebarConfigItem["path"] as string, base)
      ),
      { title: sidebarConfigItem.title }
    );

  //  resolve children recursively then return
  return {
    ...sidebarConfigItem,
    type: "group",
    path: sidebarConfigItem["path"]
      ? resolve(prefix, sidebarConfigItem["path"] as string, base)
      : "",
    children: children.map((child) =>
      resolveSidebarItem(
        child,
        pages,
        base,
        `${prefix}${sidebarConfigItem.prefix || ""}`
      )
    ),
    collapsable: sidebarConfigItem.collapsable !== false,
  };
};

export const getSidebarItems = (
  page: BasePage,
  site: SiteData<HopeThemeConfig>,
  localePath: string
): SidebarItem[] => {
  const { themeConfig, pages } = site;
  const localeConfig =
    localePath && themeConfig.locales
      ? themeConfig.locales[localePath] || themeConfig
      : themeConfig;

  const sidebarConfig: HopeSideBarConfig | undefined =
    localeConfig.sidebar || themeConfig.sidebar;

  // auto generate sidebar through headings
  if (page.frontmatter.sidebar === "auto" || sidebarConfig === "auto")
    return resolveSidebarHeaders(page);

  // sidebar is disabled
  if (!sidebarConfig) return [];

  const result = findMatchingSidebarConfig(page.regularPath, sidebarConfig);

  return result
    ? result.config.map((item) => resolveSidebarItem(item, pages, result.base))
    : [];
};
