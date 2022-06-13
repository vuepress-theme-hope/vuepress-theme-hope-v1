import Vue from "vue";
import DropdownLink from "@theme/components/Navbar/DropdownLink.vue";
import I18nIcon from "@theme/icons/I18nIcon.vue";

import type { VNode } from "vue";
import type { AutoLink, HopeThemeNavGroup } from "@theme/types";

export default Vue.extend({
  name: "LanguageDropdown",

  components: { DropdownLink, I18nIcon },

  computed: {
    dropdown(): HopeThemeNavGroup<AutoLink> | null {
      const localePaths = Object.keys(this.$site.locales);

      // do not display language selection dropdown if there is only one language
      if (localePaths.length < 2) return null;

      const currentPath = this.$route.path;
      const { navbarLocales } = this.$themeLocaleConfig;

      const languageDropdown: HopeThemeNavGroup<AutoLink> = {
        text: navbarLocales?.selectLangText,
        ariaLabel: navbarLocales?.selectLangAriaLabel,
        children: localePaths.map((targetLocalePath) => {
          // target locale config of this langauge link
          const targetSiteLocale = this.$site.locales?.[targetLocalePath] ?? {};
          const targetThemeLocale =
            this.$themeConfig.locales?.[targetLocalePath] ?? {};
          const targetLang = targetSiteLocale.lang || "";

          const text = targetThemeLocale.navbarLocales?.langName ?? targetLang;
          let link;

          // if the target language is current language
          if (targetLang === this.$lang) {
            // stay at current link
            link = currentPath;
          }
          // if the target language is not current language
          else {
            const targetLocalePage = currentPath.replace(
              this.$localePath,
              targetLocalePath
            );

            link =
              // try to link to the corresponding page of current page
              this.$router
                .getRoutes()
                .some((item) => item.path === targetLocalePage)
                ? targetLocalePage
                : // or fallback to homepage
                  targetThemeLocale.home ?? targetLocalePath;
          }

          return {
            text,
            link,
          };
        }),
      };

      return languageDropdown;
    },
  },

  render(h): VNode {
    return this.dropdown
      ? h("div", { class: "nav-item" }, [
          h(
            DropdownLink,
            { class: "i18n-dropdown", props: { config: this.dropdown } },
            [
              h(I18nIcon, {
                slot: "title",
                attrs: {
                  "aria-label": this.dropdown?.ariaLabel,
                },
                style: {
                  width: "1rem",
                  height: "1rem",
                  verticalAlign: "middle",
                },
              }),
            ]
          ),
        ])
      : (null as unknown as VNode);
  },
});
