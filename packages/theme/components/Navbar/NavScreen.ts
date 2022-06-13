import NavScreenLinks from "@theme/components/Navbar/NavScreenLinks";
// import OutlookSettings from "@theme/module/outlook/components/OutlookSettings";

import { mobileMixin } from "@theme/mixins/mobile";

export default mobileMixin.extend({
  name: "NavScreen",

  components: { NavScreenLinks },

  props: {
    active: Boolean,
  },

  watch: {
    isMobile(value): void {
      if (!value && this.active) this.$emit("close");
    },

    $route(): void {
      this.$emit("clsoe");
    },
  },
});
