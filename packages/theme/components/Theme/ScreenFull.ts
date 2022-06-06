import Vue from "vue";
import * as screenfull from "screenfull";

export default Vue.extend({
  name: "ScreenFull",

  props: {
    enable: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    canFullscreen: false,
    isFullscreen: false,
  }),

  mounted(): void {
    this.canFullscreen = screenfull.isEnabled && this.enable;
  },

  methods: {
    click(): void {
      if (screenfull.isEnabled)
        void screenfull.toggle().then(() => {
          this.isFullscreen = screenfull.isFullscreen;
        });
    },
  },
});
