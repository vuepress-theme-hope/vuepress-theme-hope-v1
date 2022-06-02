import Vue from "vue";
import UpdateIcon from "./icons/UpdateIcon.vue";
import { locales } from "../define";
import { event, skipWaiting } from "../utils";

export default Vue.extend({
  name: "SWUpdatePopup",

  components: { UpdateIcon },

  data: () => ({
    registration: null as ServiceWorkerRegistration | null,
  }),

  computed: {
    enabled(): boolean {
      return Boolean(this.registration);
    },

    message(): string {
      return locales[this.$localePath || "/"].update;
    },
  },

  mounted(): void {
    event.on("updated", (reg) => {
      if (reg) this.registration = reg;
    });
  },

  methods: {
    reload(): void {
      if (this.registration) {
        skipWaiting(this.registration);
        this.registration = null;
      }
    },
  },
});
