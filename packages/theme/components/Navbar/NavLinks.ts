import Vue from "vue";
import { isLinkExternal, normalizePath } from "vuepress-shared/lib/client";
import AutoLink from "@theme/components/AutoLink";
import DropdownLink from "@theme/components/Navbar/DropdownLink.vue";
import { getLink } from "@theme/utils/path";

import type {
  AutoLink as AutoLinkType,
  HopeThemeNavbarItem,
  HopeThemeNavbarGroup,
  HopeThemeNavGroup,
  ResolvedHopeThemeNavbarItem,
} from "@theme/types";

export default Vue.extend({
  name: "NavLinks",

  components: {
    AutoLink,
    DropdownLink,
  },

  computed: {
    navbarLinks(): ResolvedHopeThemeNavbarItem[] {
      const navbar =
        this.$themeLocaleConfig.navbar ?? this.$themeConfig.navbar ?? [];

      return (navbar || []).map((link) => this.getNavbarItem(link));
    },
  },

  methods: {
    getNavbarItem(
      item: HopeThemeNavbarItem | HopeThemeNavbarGroup | string,
      prefix = ""
    ): ResolvedHopeThemeNavbarItem {
      if (typeof item === "string") {
        const link = getLink(this.$router, `${prefix}${item}`);
        const page = this.$site.pages.find(
          (page) => normalizePath(item) === normalizePath(page.regularPath)
        );

        return page
          ? ({
              text: page.title,
              icon: page.frontmatter.icon,
              link,
            } as AutoLinkType)
          : ({
              text: "Unknown",
              link: item,
            } as AutoLinkType);
      }

      if ("children" in item)
        return {
          ...item,
          link:
            item.link && !isLinkExternal(item.link)
              ? getLink(this.$router, `${prefix}${item.link}`)
              : "",
          children: item.children.map((child) =>
            this.getNavbarItem(child, `${prefix}${item.prefix || ""}`)
          ) as (HopeThemeNavGroup<AutoLinkType> | AutoLinkType)[],
        };

      return {
        ...item,
        link: isLinkExternal(item.link)
          ? item.link
          : getLink(this.$router, `${prefix}${item.link}`),
      };
    },
  },
});
