import Vue from "vue";
import { registerForceUpdate, registerSW } from "./utils";

const pwaMixin = Vue.extend({
  async mounted() {
    if (process.env["NODE_ENV"] === "production") {
      let refreshing = false;

      // only listen controllerchange event when a serviceWorker is active
      if (navigator.serviceWorker.controller)
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (refreshing) return;

          refreshing = true;
          window.location.reload();
        });

      if (SW_FORCE_UPDATE) registerForceUpdate();

      await registerSW(this.$withBase(SW_PATH));
    }
  },
});

export default pwaMixin;
