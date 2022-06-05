import Vue from "vue";
import MediaLinks from "@theme/components/MediaLinks.vue";

export default Vue.extend({
  name: "PageFooter",

  components: { MediaLinks },

  computed: {
    enable(): boolean {
      const { copyrightText, footer, medialink } = this.$page.frontmatter;

      return (
        footer !== false &&
        Boolean(
          copyrightText ||
            footer ||
            medialink ||
            this.$themeLocaleConfig.displayFooter
        )
      );
    },

    footerContent(): string | false {
      const { footer } = this.$frontmatter;

      return footer === false
        ? false
        : typeof footer === "string"
        ? footer
        : this.$themeLocaleConfig.footer || "";
    },

    copyright(): string | false {
      return this.$frontmatter.copyrightText === false
        ? false
        : this.$frontmatter.copyrightText ||
            (this.$themeLocaleConfig.copyright === false
              ? false
              : this.$themeLocaleConfig.copyright ||
                (this.$themeConfig.author
                  ? `Copyright © ${new Date().getFullYear()} ${
                      this.$themeConfig.author
                    }`
                  : ""));
    },
  },
});
