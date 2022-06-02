import PWAInstall from "./components/PWAInstall.vue";
import SWHintPopup from "./SWHintPopup.vue";
import SWUpdatePopup from "./SWUpdatePopup.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PWAInstall", PWAInstall);
  Vue.component("SWHintPopup", SWHintPopup);
  Vue.component("SWUpdatePopup", SWUpdatePopup);
};

export default enhanceApp;
