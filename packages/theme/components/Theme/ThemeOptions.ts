import Vue from "vue";
import DarkmodeSwitch from "@theme/components/Theme/DarkmodeSwitch.vue";
import ScreenFull from "@theme/components/Theme/ScreenFull.vue";

import type { HopeThemeLocaleData } from "@theme/types";

const defaultColorPicker: Record<string, string> = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#3eaf7c",
  orange: "#f39c12",
  purple: "#8e44ad",
};

interface ThemeColor {
  /** Color list */
  list: string[];
  /** Color picker */
  picker: Record<string, string>;
}

export default Vue.extend({
  name: "ThemeOptions",

  components: { DarkmodeSwitch, ScreenFull },

  data: () => ({
    themeColor: {} as ThemeColor,

    isDarkmode: false,
  }),

  computed: {
    locale(): HopeThemeLocaleData["outlookLocales"] {
      return this.$themeLocaleConfig.outlookLocales;
    },

    themeColorEnabled(): boolean {
      return this.$themeConfig.themeColor !== false;
    },

    switchEnabled(): boolean {
      return (
        this.$themeConfig.darkmode !== "disable" &&
        this.$themeConfig.darkmode !== "auto"
      );
    },
  },

  mounted(): void {
    const theme = localStorage.getItem("theme");

    this.themeColor = {
      list: this.$themeConfig.themeColor
        ? Object.keys(this.$themeConfig.themeColor)
        : Object.keys(defaultColorPicker),
      picker: this.$themeConfig.themeColor || defaultColorPicker,
    };

    if (theme) this.setTheme(theme);
  },

  methods: {
    setTheme(theme?: string): void {
      const classes = document.body.classList;
      const themes = this.themeColor.list.map(
        (colorTheme) => `theme-${colorTheme}`
      );

      if (!theme) {
        localStorage.removeItem("theme");
        classes.remove(...themes);

        return;
      }

      classes.remove(
        ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
      );

      classes.add(`theme-${theme}`);
      localStorage.setItem("theme", theme);
    },
  },
});
