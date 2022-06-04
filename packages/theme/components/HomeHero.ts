import Vue from "vue";
import MyTransition from "@theme/components/MyTransition.vue";
import NavLink from "@theme/components/Navbar/NavLink.vue";

interface ActionConfig {
  text: string;
  link: string;
}

export default Vue.extend({
  name: "HomeHero",

  components: { MyTransition, NavLink },

  computed: {
    actionLinks(): ActionConfig[] {
      const { action, actions = action } = this.$frontmatter;

      if (Array.isArray(actions)) return actions as ActionConfig[];

      return [actions] as ActionConfig[];
    },
  },
});
