import Vue from "vue";
import { navigate } from "@theme/utils/navigate";

interface TagOption {
  name: string;
  path: string;
}

export default Vue.extend({
  name: "TagList",

  computed: {
    tagList(): TagOption[] {
      return [
        {
          name: this.$themeLocaleConfig.blogLocales.all,
          path: "/tag/",
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...(this.$tag.list as TagOption[]),
      ];
    },
  },

  methods: {
    isActive(name: string): boolean {
      return (
        name ===
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ((this.$currentTag && this.$currentTag.key) ||
          this.$themeLocaleConfig.blogLocales.all)
      );
    },

    clickTag(path: string): void {
      navigate(path, this.$router, this.$route);
    },
  },
});
