import Vue from "vue";
import { isActiveLink } from "vuepress-shared/lib/client";

import type { CreateElement, PropType, VNode } from "vue";
import type { Route } from "vue-router";
import type { PageHeader } from "vuepress-typings";

export interface NestedPageHeader extends PageHeader {
  children?: NestedPageHeader[];
}

export const groupHeaders = (headers: PageHeader[]): NestedPageHeader[] => {
  const result: NestedPageHeader[] = [];

  headers.forEach((header) => {
    if (header.level === 1) return;
    else if (header.level === 2) {
      result.push({ ...header });
    } else if (header.level === 3) {
      const lastH2Header = result[result.length - 1];

      if (lastH2Header)
        lastH2Header.children = [
          ...(result[result.length - 1].children || []),
          { ...header },
        ];
    } else if (header.level === 4) {
      const lastH2Header = result[result.length - 1];

      if (lastH2Header) {
        const lastH3Header =
          lastH2Header.children?.[lastH2Header.children?.length - 1];

        if (lastH3Header)
          lastH3Header.children = [
            ...(result[result.length - 1].children || []),
            { ...header },
          ];
      }
    }
  });

  return result;
};

const renderHeader = (
  h: CreateElement,
  { title, level, slug }: PageHeader
): VNode =>
  h(
    Vue.component("RouterLink"),
    {
      props: { to: `#${slug}` },
      class: ["toc-link", `level${level}`],
    },
    title
  );

interface RenderChildrenOptions {
  headers: NestedPageHeader[];
  route: Route;
  headerDepth: number;
}

const renderChildren = (
  h: CreateElement,
  { headers, route, headerDepth }: RenderChildrenOptions
): VNode | null => {
  return headers.length && headerDepth > 0
    ? h(
        "ul",
        { class: "toc-list" },
        headers.map((header) => [
          h(
            "li",
            {
              class: [
                "toc-item",
                { active: isActiveLink(route, `#${header.slug}`) },
              ],
            },
            [renderHeader(h, header)]
          ),
          header.children
            ? renderChildren(h, {
                headers: header.children,
                route,
                headerDepth: headerDepth - 1,
              })
            : [],
        ])
      )
    : null;
};

export default Vue.extend({
  name: "TOC",

  props: {
    items: {
      type: Array as PropType<PageHeader[]>,
      default: () => [],
    },

    headerDepth: {
      type: Number,
      default: 2,
    },
  },

  computed: {
    headers(): NestedPageHeader[] {
      return this.items.length
        ? groupHeaders(this.items)
        : groupHeaders(this.$page.headers || []);
    },
  },

  render(h) {
    return h("div", { attrs: { class: "toc-place-holder" } }, [
      h("aside", { attrs: { id: "toc" } }, [
        h(
          "div",
          { class: "toc-header" },
          this.$themeLocaleConfig.metaLocales.toc
        ),
        h("div", { class: "toc-wrapper", ref: "toc" }, [
          renderChildren(h, {
            headers: this.headers,
            route: this.$route,
            headerDepth: this.headerDepth,
          }),
        ]),
      ]),
    ]);
  },
});
