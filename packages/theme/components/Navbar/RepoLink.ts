import Vue from "vue";
import { isLinkHttp } from "vuepress-shared/lib/client";

import BitbucketIcon from "@theme/icons/repo/BitbucketIcon.vue";
import GiteeIcon from "@theme/icons/repo/GiteeIcon.vue";
import GitHubIcon from "@theme/icons/repo/GitHubIcon.vue";
import GitlabIcon from "@theme/icons/repo/GitlabIcon.vue";
import SourceIcon from "@theme/icons/repo/SourceIcon.vue";

type RepoType = "GitHub" | "GitLab" | "Gitee" | "Bitbucket" | null;

export default Vue.extend({
  name: "RepoLink",

  components: { BitbucketIcon, GiteeIcon, GitHubIcon, GitlabIcon, SourceIcon },

  computed: {
    repo(): string | null {
      return this.$themeLocaleConfig.repo || null;
    },

    repoType(): string | null {
      return this.repo ? this.resolveRepoType(this.repo) : null;
    },

    repoLink(): string | null {
      return this.repo && !isLinkHttp(this.repo)
        ? `https://github.com/${this.repo}`
        : this.repo;
    },

    repoLabel(): string | null {
      return !this.repoLink
        ? null
        : this.$themeLocaleConfig.repoLabel ??
            (this.repoType === null ? "Source" : this.repoType);
    },
  },

  methods: {
    resolveRepoType(repo: string): RepoType {
      return isLinkHttp(repo) || /github\.com/.test(repo)
        ? "GitHub"
        : /bitbucket\.org/.test(repo)
        ? "Bitbucket"
        : /gitlab\.com/.test(repo)
        ? "GitLab"
        : /gitee\.com/.test(repo)
        ? "Gitee"
        : null;
    },
  },
});
