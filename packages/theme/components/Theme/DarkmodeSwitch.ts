import Vue from "vue";
import AutoIcon from "@theme/icons/AutoIcon.vue";
import DarkIcon from "@theme/icons/DarkIcon.vue";
import LightIcon from "@theme/icons/LightIcon.vue";
import { changeClass } from "@theme/utils/dom";

export default Vue.extend({
  name: "DarkmodeSwitch",

  components: { AutoIcon, DarkIcon, LightIcon },

  data: () => ({
    darkmode: "auto" as "auto" | "on" | "off",
  }),

  computed: {
    darkmodeConfig(): "auto-switch" | "auto" | "switch" | "disable" {
      return this.$themeConfig.darkmode || "auto-switch";
    },
  },

  mounted(): void {
    this.darkmode =
      (localStorage.getItem("darkmode") as "auto" | "on" | "off" | null) ||
      "auto";

    if (this.darkmodeConfig === "auto-switch")
      if (this.darkmode === "auto") this.setDarkmode("auto");
      else this.setDarkmode(this.darkmode);
    else if (this.darkmodeConfig === "auto") this.setDarkmode("auto");
    else if (this.darkmodeConfig === "switch") this.setDarkmode(this.darkmode);
    // disabled
    else this.setDarkmode("off");
  },

  methods: {
    setDarkmode(status: "on" | "off" | "auto"): void {
      if (status === "on") this.toggleDarkmode(true);
      else if (status === "off") this.toggleDarkmode(false);
      else {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const isLightMode = window.matchMedia(
          "(prefers-color-scheme: light)"
        ).matches;

        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (event) => {
            if (event.matches) this.toggleDarkmode(true);
          });

        window
          .matchMedia("(prefers-color-scheme: light)")
          .addEventListener("change", (event) => {
            if (event.matches) this.toggleDarkmode(false);
          });

        if (isDarkMode) this.toggleDarkmode(true);
        else if (isLightMode) this.toggleDarkmode(false);
        else {
          const timeHour = new Date().getHours();

          this.toggleDarkmode(timeHour < 6 || timeHour >= 18);
        }
      }

      this.darkmode = status;
      localStorage.setItem("darkmode", status);
    },

    toggleDarkmode(isDarkmode: boolean): void {
      const classes = document.querySelector("html")!.classList;

      if (isDarkmode) changeClass(classes, ["dark"], ["light"]);
      else changeClass(classes, ["light"], ["dark"]);
    },
  },
});
