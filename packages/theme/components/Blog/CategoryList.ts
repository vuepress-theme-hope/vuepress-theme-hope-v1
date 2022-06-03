import Vue from "vue";
import { capitalize } from "@mr-hope/vuepress-shared/lib/client";
import { navigate } from "@theme/utils/navigate";

export default Vue.extend({
  name: "CategoryList",

  methods: {
    capitalize,

    clickCategory(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
