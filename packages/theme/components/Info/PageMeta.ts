// TODO: Improve script and deprecate options
import Vue from "vue";
import EditIcon from "@theme/icons/EditIcon.vue";
import { endingSlashRE, outboundRE } from "@theme/utils/path";

import type { HopeThemeLocaleData } from "@theme/types";
import type { GitContributor } from "@mr-hope/vuepress-plugin-git";

export default Vue.extend({
  name: "PageMeta",

  components: { EditIcon },

  computed: {
    locales(): HopeThemeLocaleData["metaLocales"] {
      return this.$themeLocaleConfig.metaLocales;
    },

    contributors(): GitContributor[] {
      const pageConfig = this.$frontmatter.contributors;
      const themeConfig = this.$themeConfig.contributors;

      return pageConfig === false || (themeConfig === false && !pageConfig)
        ? []
        : this.$page.contributors || [];
    },

    contributorsText(): string {
      return this.locales.contributors;
    },

    updateTime(): string {
      const pageConfig = this.$frontmatter.lastUpdated;
      const themeConfig = this.$themeConfig.lastUpdated;

      return pageConfig === false || (themeConfig === false && !pageConfig)
        ? ""
        : this.$page.updateTime || "";
    },

    updateTimeText(): string {
      return this.locales.lastUpdated;
    },

    editLink(): string | false {
      const showEditLink =
        this.$page.frontmatter.editLink === false
          ? false
          : !(
              this.$themeConfig.editLinks === false &&
              !this.$page.frontmatter.editLink
            );

      const { repo, docsRepo = repo } = this.$themeConfig;

      if (showEditLink && docsRepo && this.$page.relativePath)
        return this.createEditLink(docsRepo);

      return false;
    },

    editLinkText(): string {
      return this.locales.editLink;
    },
  },

  methods: {
    createEditLink(docsRepo: string): string {
      const { docsDir = "", docsBranch = "main" } = this.$themeConfig;

      const bitbucket = /bitbucket.org/u;

      if (bitbucket.test(docsRepo))
        return `${docsRepo.replace(endingSlashRE, "")}/src/${docsBranch}/${
          docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
        }${
          this.$page.relativePath
        }?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`;

      const gitlab = /gitlab.com/u;

      if (gitlab.test(docsRepo))
        return `${docsRepo.replace(endingSlashRE, "")}/-/edit/${docsBranch}/${
          docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
        }${this.$page.relativePath}`;

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;

      return `${base.replace(endingSlashRE, "")}/edit/${docsBranch}/${
        docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
      }${this.$page.relativePath}`;
    },
  },
});
