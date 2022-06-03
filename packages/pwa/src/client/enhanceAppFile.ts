import PWAInstall from "./components/PWAInstall.vue";
import SWHintPopup from "./components/SWHintPopup.vue";
import SWUpdatePopup from "./components/SWUpdatePopup.vue";

import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("PWAInstall", PWAInstall);
  Vue.component("SWHintPopup", SWHintPopup);
  Vue.component("SWUpdatePopup", SWUpdatePopup);
};

export default enhanceApp;
