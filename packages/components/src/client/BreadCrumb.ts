import Vue from "vue";

import type { Route } from "vue-router";

interface BreadCrumbConfig {
  title: string;
  icon?: string;
  url: string;
}

export default Vue.extend({
  name: "BreadCrumb",

  props: {
    show: {
      type: Boolean,
      default: true,
    },

    icon: {
      type: Boolean,
      default: true,
    },

    iconPrefix: {
      type: String,
      default: "",
    },
  },

  computed: {
    enable(): boolean {
      const pageEnable = this.$page.frontmatter.breadcrumb;

      return (
        ((this.show && pageEnable !== false) || pageEnable === true) &&
        this.config.length > 1
      );
    },

    displayIcon(): boolean {
      const pageEnable = this.$page.frontmatter.breadcrumbIcon;

      return (
        this.enable &&
        ((this.icon && pageEnable !== false) || pageEnable === true)
      );
    },

    config(): BreadCrumbConfig[] {
      const breadcrumbConfig: BreadCrumbConfig[] = [];
      const { pages } = this.$site;
      const links = this.getLinks(this.$route);

      // generate breadcrumb config
      for (let index = 1; index < links.length; index++)
        for (let index2 = 0; index2 < pages.length; index2++) {
          const element = pages[index2];

          if (element.path === links[index]) {
            breadcrumbConfig.push({
              title: element.title,
              icon: element.frontmatter.icon,
              url: element.path,
            });
            break;
          }
        }

      return breadcrumbConfig;
    },
  },

  methods: {
    getLinks(route: Route): string[] {
      const routePaths = route.path.split("/");
      const links: string[] = [];
      let link = "";

      // generate links
      routePaths.forEach((element, index) => {
        if (index !== routePaths.length - 1) {
          link += `${element}/`;
          links.push(link);
        } else if (element !== "") {
          link += element;
          links.push(link);
        }
      });

      return links;
    },
  },
});
