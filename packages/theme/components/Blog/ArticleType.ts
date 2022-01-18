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
      const locales = this.$themeLocaleConfig.blog;

      return [
        { text: locales.allText, path: "/article/" },
        { text: locales.star, path: "/star/" },
        { text: locales.slides, path: "/slide/" },
        { text: locales.encrypt, path: "/encrypt/" },
      ];
    },
  },

  methods: {
    navigate(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
