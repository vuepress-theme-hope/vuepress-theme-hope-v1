import Vue from "vue";
import {
  isLinkExternal,
  isLinkMailto,
  isLinkTel,
} from "vuepress-shared/lib/client";
import { ensureExt } from "@theme/utils/path";

import type { PropType } from "vue";

import { HopeNavBarConfigItem } from "@theme/types";

export interface NavBarConfigItem extends HopeNavBarConfigItem {
  type: "link" | "links";
  items: NavBarConfigItem[];
}

export default Vue.extend({
  name: "NavLink",

  props: {
    item: { type: Object as PropType<NavBarConfigItem>, required: true },
  },

  computed: {
    link(): string {
      return ensureExt(this.item.link as string);
    },

    active(): boolean {
      // link is home path
      if (
        (this.$site.locales &&
          Object.keys(this.$site.locales).some(
            (rootLink) => rootLink === this.link
          )) ||
        this.link === "/"
      )
        // exact match
        return this.$route.path === this.link;

      // inclusive match
      return this.$route.path.startsWith(this.link);
    },

    isNonHttpURI(): boolean {
      return isLinkMailto(this.link) || isLinkTel(this.link);
    },

    isBlankTarget(): boolean {
      return this.target === "_blank";
    },

    isInternal(): boolean {
      return !isLinkExternal(this.link) && !this.isBlankTarget;
    },

    target(): string | null {
      if (this.isNonHttpURI) return null;

      if (this.item.target) return this.item.target;

      return isLinkExternal(this.link) ? "_blank" : "";
    },

    rel(): string | null {
      if (this.isNonHttpURI) return null;
      if (this.item.rel === false) return null;
      if (this.item.rel) return this.item.rel;

      return this.isBlankTarget ? "noopener noreferrer" : null;
    },
  },

  methods: {
    focusoutAction(): void {
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit("focusout");
    },
  },
});
