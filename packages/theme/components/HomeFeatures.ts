import Vue from "vue";
import { navigate } from "@theme/utils/navigate";

export default Vue.extend({
  name: "HomeFeatures",

  methods: {
    getIconType(icon = ""): string {
      return icon.match(/(?:https?:)?\/\//)
        ? "link"
        : icon.startsWith("/")
        ? "path"
        : "class";
    },
    navigate(link: string): void {
      navigate(link, this.$router, this.$route);
    },
  },
});
