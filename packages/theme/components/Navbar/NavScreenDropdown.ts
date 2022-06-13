import Vue from "vue";

import AutoLink from "@theme/components/AutoLink";

import type { PropType } from "vue";
import type { AutoLink as AutoLinkType, HopeThemeNavGroup } from "@theme/types";

export default Vue.extend({
  name: "NavScreenDropdown",

  components: { AutoLink },

  props: {
    config: {
      type: Object as PropType<
        HopeThemeNavGroup<AutoLinkType | HopeThemeNavGroup<AutoLinkType>>
      >,
      required: true,
    },
  },

  data: () => ({
    open: false,
  }),

  computed: {
    dropdownAriaLabel(): string {
      return this.config.ariaLabel || this.config.text;
    },
  },

  watch: {
    $route(): void {
      this.open = false;
    },
  },

  methods: {
    setOpen(value: boolean): void {
      this.open = value;
    },
  },
});
