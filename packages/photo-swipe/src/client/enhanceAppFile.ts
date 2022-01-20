import PhotoSwipe from "./PhotoSwipe.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PhotoSwipe", PhotoSwipe);
};

export default enhanceApp;
