import DocSearch from "@DocSearch";
import LanguageDropdown from "@theme/components/Navbar/LanguageDropdown";
import NavbarBrand from "@theme/components/Navbar/NavbarBrand.vue";
import NavbarLinks from "@theme/components/Navbar/NavbarLinks.vue";
import NavScreen from "@theme/components/Navbar/NavScreen.vue";
import RepoLink from "@theme/components/Navbar/RepoLink.vue";
import SearchBox from "@SearchBox";
// import OutlookButton from "@theme-hope/module/outlook/components/OutlookButton";
import ToggleNavbarButton from "@theme/components/Navbar/ToggleNavbarButton.vue";
import ToggleSidebarButton from "@theme/components/Navbar/ToggleSidebarButton.vue";
import ThemeColor from "@ThemeColor";
import { mobileMixin } from "@theme/mixins/mobile";

import type { AlgoliaOption } from "vuepress-typings";
import type {
  HopeThemeNavbarComponent,
  HopeThemeNavbarLocaleOptions,
} from "@theme/types";

export default mobileMixin.extend({
  name: "NavBar",

  components: {
    DocSearch,
    LanguageDropdown,
    NavbarBrand,
    NavbarLinks,
    NavScreen,
    RepoLink,
    SearchBox,
    ThemeColor,
    ToggleNavbarButton,
    ToggleSidebarButton,
  },

  data: () => ({
    showScreen: false,
  }),

  computed: {
    algoliaConfig(): AlgoliaOption | false {
      return (
        this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || false
      );
    },

    // TODO: Improve
    isDocSearch(): boolean {
      return Boolean(
        this.algoliaConfig &&
          this.algoliaConfig.apiKey &&
          this.algoliaConfig.indexName
      );
    },

    isSearch(): boolean {
      return (
        this.$themeConfig.search !== false && this.$frontmatter.search !== false
      );
    },

    autoHide(): boolean {
      const autoHide = this.$themeLocaleConfig.navbarAutoHide;

      return autoHide !== "none" && (autoHide === "always" || this.isMobile);
    },

    navbarLayout(): Exclude<
      HopeThemeNavbarLocaleOptions["navbarLayout"],
      undefined
    > {
      return (
        this.$themeLocaleConfig.navbarLayout || {
          left: ["Brand"],
          center: ["Links"],
          right: ["Language", "Repo", "Outlook", "Search"],
        }
      );
    },

    map(): Record<HopeThemeNavbarComponent, string> {
      return {
        Brand: "NavbarBrand",
        Language: "LanguageDropdown",
        Links: "NavbarLinks",
        Repo: "RepoLink",
        // Outlook: "OutlookButton",
        Outlook: "",
        Search: this.isDocSearch
          ? "DocSearch"
          : this.isSearch
          ? "SearchBox"
          : "",
      };
    },

    leftComponents(): string[] {
      return this.navbarLayout.left.map((component) => this.map[component]);
    },

    centerComponents(): string[] {
      return this.navbarLayout.center.map((component) => this.map[component]);
    },

    rightComponents(): string[] {
      return this.navbarLayout.right.map((component) => this.map[component]);
    },
  },

  methods: {
    toggleSidebar() {
      if (this.showScreen) this.showScreen = false;
      this.$emit("toggle-sidebar");
    },

    toggleNavScreen() {
      this.showScreen = !this.showScreen;
    },
  },
});
