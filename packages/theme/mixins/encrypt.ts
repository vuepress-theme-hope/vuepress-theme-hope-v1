import Vue from "vue";

import type { EncryptOptions } from "@theme/types";

export const encryptBaseMixin = Vue.extend({
  computed: {
    encryptOptions(): EncryptOptions {
      return this.$themeConfig.encrypt || {};
    },
  },
});
