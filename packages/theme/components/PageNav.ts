import Vue from "vue";
import AutoLink from "@theme/components/AutoLink";
import {
  isExternal,
  ensureExt,
  normalize,
  resolvePath,
} from "@theme/utils/path";

import type { BasePage, PageFrontmatter } from "vuepress-typings";
import type { PropType } from "vue";
import type {
  SidebarErrorItem,
  SidebarExternalItem,
  SidebarItem,
  SidebarPageItem,
} from "@theme/utils/sidebar";
import type { AutoLink as AutoLinkType } from "@theme/types";

const getSidebarItems = (
  items: SidebarItem[],
  result: (SidebarPageItem | SidebarExternalItem | SidebarErrorItem)[]
): void => {
  for (const item of items)
    if (item.type === "group")
      getSidebarItems((item.children || []) as SidebarItem[], result);
    else result.push(item);
};

const find = (
  page: BasePage,
  items: SidebarItem[],
  offset: -1 | 1
): SidebarItem | false => {
  const result: (SidebarPageItem | SidebarExternalItem | SidebarErrorItem)[] =
    [];

  getSidebarItems(items, result);

  for (let i = 0; i < result.length; i++) {
    const cur = result[i];

    if (cur.type === "page" && cur.path === decodeURIComponent(page.path))
      return result[i + offset];
  }

  return false;
};

export default Vue.extend({
  name: "PageNav",

  components: { AutoLink },

  props: {
    sidebarItems: {
      type: Array as PropType<SidebarItem[]>,
      default: (): SidebarItem[] => [],
    },
  },

  computed: {
    prevNavLink(): AutoLinkType | false {
      return this.getAutoLink("prev");
    },

    nextNavLink(): AutoLinkType | false {
      return this.getAutoLink("next");
    },
  },

  methods: {
    getAutoLink(linkType: "prev" | "next"): AutoLinkType | false {
      const themeLinkConfig =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        this.$themeConfig[`${linkType}Links` as "prevLinks" | "nextLinks"];
      const pageLinkConfig = this.$frontmatter[linkType];

      if (typeof pageLinkConfig === "object") return pageLinkConfig;

      if (
        pageLinkConfig === false ||
        (themeLinkConfig === false && !pageLinkConfig)
      )
        return false;

      if (typeof pageLinkConfig === "string") {
        const path = resolvePath(pageLinkConfig, this.$route.path);

        // if it is external link
        if (isExternal(path))
          return {
            text: path,
            link: path,
          };

        const realPath = normalize(path);

        // find matches in all pages
        for (const page of this.$site.pages)
          if (normalize(page.regularPath) === realPath)
            // return sidebarConfig merged with pageObject
            return {
              text: page.title,
              icon: page.frontmatter.icon || "",
              link: ensureExt(page.path),
            };

        return false;
      }

      const sidebarItem = find(
        this.$page,
        this.sidebarItems,
        linkType === "prev" ? -1 : 1
      );

      return sidebarItem && "path" in sidebarItem
        ? {
            text: "title" in sidebarItem ? sidebarItem.title : sidebarItem.path,
            icon:
              "frontmatter" in sidebarItem
                ? (sidebarItem.frontmatter as PageFrontmatter).icon || ""
                : "",
            link: sidebarItem.path as string,
          }
        : false;
    },
  },
});
