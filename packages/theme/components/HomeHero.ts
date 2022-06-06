import Vue from "vue";
import AutoLink from "@theme/components/AutoLink";
import MyTransition from "@theme/components/MyTransition.vue";

interface ActionConfig {
  text: string;
  link: string;
}

export default Vue.extend({
  name: "HomeHero",

  components: { AutoLink, MyTransition },

  computed: {
    actionLinks(): ActionConfig[] {
      const { action, actions = action } = this.$frontmatter;

      if (Array.isArray(actions)) return actions as ActionConfig[];

      return [actions] as ActionConfig[];
    },
  },
});
