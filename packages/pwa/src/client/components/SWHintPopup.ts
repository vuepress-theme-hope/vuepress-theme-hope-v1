import Vue from "vue";
import UpdateIcon from "./icons/UpdateIcon.vue";
import { locales } from "../define";
import { event } from "../utils";

export default Vue.extend({
  name: "SWHintPopup",

  components: { UpdateIcon },

  data: () => ({
    enabled: false,
  }),

  computed: {
    message(): string {
      return locales[this.$localePath].hint;
    },
  },

  mounted(): void {
    event.on("updatefound", () => {
      void navigator.serviceWorker.getRegistration().then((registration) => {
        // check whether a valid service worker is active
        if (registration && registration.active) this.enabled = true;
      });
    });

    event.on("updated", () => {
      this.enabled = false;
    });
  },

  methods: {
    uninstall(): void {
      if (this.enabled) {
        // force refresh
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.location.reload(true);
        this.enabled = false;
      }
    },
  },
});
