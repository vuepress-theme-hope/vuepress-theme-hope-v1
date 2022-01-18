import Vue from "vue";
import { locales } from "./define";
import { event } from "./event";

export default Vue.extend({
  name: "SWUpdatePopup",

  data: () => ({
    updateEvent: null as { skipWaiting: () => Promise<void> } | null,
  }),

  computed: {
    enabled(): boolean {
      return Boolean(this.updateEvent);
    },

    message(): string {
      return locales[this.$localePath || "/"].update;
    },
  },

  created(): void {
    event.$on("sw-updated", this.onSWUpdated.bind(this));
  },

  methods: {
    onSWUpdated(updateEvent: { skipWaiting: () => Promise<void> }): void {
      this.updateEvent = updateEvent;
    },

    reload(): void {
      if (this.updateEvent)
        void this.updateEvent.skipWaiting().then(() => {
          location.reload();
          this.updateEvent = null;
        });
    },
  },
});
