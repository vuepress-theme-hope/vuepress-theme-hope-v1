import Anchor from "@theme/components/Anchor.vue";
import BreadCrumb from "@theme/components/Info/BreadCrumb.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import PageInfo from "@theme/components/Info/PageInfo.vue";
import PageNav from "@theme/components/PageNav.vue";
import Password from "@theme/components/Password.vue";
import PageMeta from "@theme/components/Info/PageMeta.vue";
import { pathEncryptMixin } from "@theme/mixins/pathEncrypt";

import type { PageHeader } from "vuepress-typings";
import type { PropType } from "vue";
import type { PageInfoProps } from "@theme/components/Info/PageInfo";
import type { SidebarItem } from "@theme/utils/sidebar";

export default pathEncryptMixin.extend({
  name: "Page",

  components: {
    Anchor,
    BreadCrumb,
    MyTransition,
    PageInfo,
    PageMeta,
    PageNav,
    Password,
  },

  props: {
    sidebarItems: {
      type: Array as PropType<SidebarItem[]>,
      default: (): SidebarItem[] => [],
    },
    headers: {
      type: Array as PropType<PageHeader[]>,
      default: (): PageHeader[] => [],
    },
  },

  data: () => ({
    password: "",
  }),

  computed: {
    pagePassword(): string {
      const { password } = this.$frontmatter;

      return typeof password === "number"
        ? password.toString()
        : typeof password === "string"
        ? password
        : "";
    },

    pageDescrypted(): boolean {
      return this.password === this.pagePassword;
    },

    pageInfoProps(): PageInfoProps {
      return {
        titleIcon: true,
        titleIconPrefix: this.$themeConfig.iconPrefix,
        ...(this.$themeConfig.pageInfo
          ? { items: this.$themeConfig.pageInfo }
          : {}),
        categoryPath: "/category/$category/",
        tagPath: "/tag/$tag/",
        defaultAuthor: this.$themeConfig.author || "",
      };
    },
  },
});
