import Vue from "vue";
import { isActiveLink } from "vuepress-shared/lib/client";
import SidebarGroup from "@theme/components/Sidebar/SidebarGroup.vue";
import SidebarLink from "@theme/components/Sidebar/SidebarLink.vue";

import type { BasePage } from "vuepress-typings";
import type { PropType } from "vue";
import type { Route } from "vue-router";
import type { SidebarHeaderItem, SidebarItem } from "@theme/utils/sidebar";

const descendantIsActive = (route: Route, item: SidebarItem): boolean => {
  if (item.type === "group")
    return item.children.some((child: SidebarHeaderItem | SidebarItem) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActiveLink(route, child.path);
    });

  return false;
};

const resolveOpenGroupIndex = (route: Route, items: SidebarItem[]): number => {
  for (let i = 0; i < items.length; i++)
    if (descendantIsActive(route, items[i])) return i;

  return -1;
};

export default Vue.extend({
  name: "SidebarLinks",

  components: { SidebarGroup, SidebarLink },

  props: {
    items: {
      type: Array as PropType<SidebarItem[]>,
      required: true,
    },
    depth: { type: Number, required: true },
  },

  data: () => ({
    openGroupIndex: 0,
  }),

  watch: {
    $route(): void {
      this.refreshIndex();
    },
  },

  created(): void {
    this.refreshIndex();
  },

  methods: {
    refreshIndex(): void {
      const index = resolveOpenGroupIndex(this.$route, this.items);

      if (index > -1) this.openGroupIndex = index;
    },

    toggleGroup(index: number): void {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },

    isActive(page: BasePage): boolean {
      return isActiveLink(this.$route, page.regularPath);
    },
  },
});
