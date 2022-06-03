import PhotoSwipe from "./components/PhotoSwipe.vue";

import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PhotoSwipe", PhotoSwipe);
};

export default enhanceApp;
