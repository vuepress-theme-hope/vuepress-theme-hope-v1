import MyTransition from "@theme/components/MyTransition.vue";
import TOC from "@theme/components/Info/TOC.vue";
import { timelineMixin } from "@theme/mixins/timeline";

import type { PageHeader } from "vuepress-typings";

export default timelineMixin.extend({
  name: "Timeline",

  components: { MyTransition, TOC },

  computed: {
    hint(): string {
      return this.$themeConfig.blog && this.$themeConfig.blog.timeline
        ? this.$themeLocaleConfig.blogLocales.timelineTitle
        : "";
    },

    tocConfig(): PageHeader[] {
      return this.$timeline.map((item) => ({
        title: item.year.toString(),
        level: 2,
        slug: item.year.toString(),
      }));
    },
  },

  methods: {
    navigate(url: string): void {
      void this.$router.push(url);
    },
  },
});
