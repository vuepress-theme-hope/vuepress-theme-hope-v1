import Anchor from "@theme/components/Anchor.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import { timelineMixin } from "@theme/mixins/timeline";

import type { SidebarHeader } from "@theme/utils/groupHeader";

export default timelineMixin.extend({
  name: "Timeline",

  components: { Anchor, MyTransition },

  computed: {
    hint(): string {
      return (
        (this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
        this.$themeLocaleConfig.blog.timelineText
      );
    },

    anchorConfig(): SidebarHeader[] {
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
