import Vue from "vue";
import { navigate } from "@theme/utils/navigate";

interface ArticleTypeItem {
  text: string;
  path: string;
}

export default Vue.extend({
  name: "ArticleType",

  computed: {
    types(): ArticleTypeItem[] {
      const { blogLocales } = this.$themeLocaleConfig;

      return [
        { text: blogLocales.all, path: "/article/" },
        { text: blogLocales.star, path: "/star/" },
        { text: blogLocales.slides, path: "/slide/" },
        { text: blogLocales.encrypt, path: "/encrypt/" },
      ];
    },
  },

  methods: {
    navigate(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
