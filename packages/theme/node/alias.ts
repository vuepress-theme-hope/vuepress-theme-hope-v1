import { noopModule } from "vuepress-shared";
import { resolve } from "path";

import type { Context } from "vuepress-typings";
import type { ResolvedHopeThemeConfig } from "../types";

export const getAlias = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): Record<string, string> => {
  const { siteConfig } = ctx;
  // Resolve algolia
  const isDocSearch =
    Boolean(themeConfig.algolia) ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      (base) => themeConfig.locales[base].algolia
    );

  const blogEnabled = themeConfig.blog !== false;
  const commentEnabled =
    themeConfig.comment &&
    themeConfig.comment.provider &&
    themeConfig.comment.provider !== "None";

  const themeColorEnabled = !(
    themeConfig.themeColor === false && themeConfig.darkmode === "disable"
  );
  const { custom = {} } = themeConfig;

  return {
    "@DocSearch": isDocSearch
      ? resolve(__dirname, "../components/Navbar/DocSearch.vue")
      : noopModule,
    "@BlogInfo": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogInfo.vue")
      : noopModule,
    "@BloggerInfo": blogEnabled
      ? resolve(__dirname, "../components/Blog/BloggerInfo.vue")
      : noopModule,
    "@BlogHome": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogHome.vue")
      : noopModule,
    "@BlogPage": blogEnabled
      ? resolve(__dirname, "../components/Blog/BlogPage.vue")
      : noopModule,
    "@ContentTop": custom.contentTop
      ? resolve(ctx.sourceDir, ".vuepress", custom.contentTop)
      : noopModule,
    "@ContentBottom": custom.contentBottom
      ? resolve(ctx.sourceDir, ".vuepress", custom.contentBottom)
      : noopModule,
    "@PageTop": custom.pageTop
      ? resolve(ctx.sourceDir, ".vuepress", custom.pageTop)
      : noopModule,
    "@PageBottom": custom.pageBottom
      ? resolve(ctx.sourceDir, ".vuepress", custom.pageBottom)
      : noopModule,
    "@Comment": commentEnabled
      ? "vuepress-plugin-comment1/lib/client/Comment.vue"
      : noopModule,
    "@NavbarStart": custom.navbarStart
      ? resolve(ctx.sourceDir, ".vuepress", custom.navbarStart)
      : noopModule,
    "@NavbarCenter": custom.navbarCenter
      ? resolve(ctx.sourceDir, ".vuepress", custom.navbarCenter)
      : noopModule,
    "@NavbarEnd": custom.navbarEnd
      ? resolve(ctx.sourceDir, ".vuepress", custom.navbarEnd)
      : noopModule,
    "@ThemeColor": themeColorEnabled
      ? resolve(__dirname, "../components/Theme/ThemeColor.vue")
      : noopModule,
    "@SidebarTop": custom.sidebarTop
      ? resolve(ctx.sourceDir, ".vuepress", custom.sidebarTop)
      : noopModule,
    "@SidebarCenter": custom.sidebarCenter
      ? resolve(ctx.sourceDir, ".vuepress", custom.sidebarCenter)
      : noopModule,
    "@SidebarBottom": custom.sidebarBottom
      ? resolve(ctx.sourceDir, ".vuepress", custom.sidebarBottom)
      : noopModule,
  };
};
