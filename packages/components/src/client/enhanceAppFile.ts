import BackToTop from "./BackToTop.vue";
import Badge from "./Badge.vue";
import BreadCrumb from "./BreadCrumb.vue";
import CodeGroup from "./CodeGroup.vue";
import CodeGroupItem from "./CodeGroupItem.vue";
import Pagination from "./Pagination.vue";
import ScreenFull from "./ScreenFull.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (BACK_TO_TOP) Vue.component("BackToTop", BackToTop);
  if (BADGE) Vue.component("Badge", Badge);
  if (BREADCRUMB) Vue.component("BreadCrumb", BreadCrumb);
  if (PAGINATION) Vue.component("Pagination", Pagination);
  if (SCREEN_FULL) Vue.component("ScreenFull", ScreenFull);

  Vue.component("CodeGroup", CodeGroup);
  Vue.component("CodeGroupItem", CodeGroupItem);
};

export default enhanceApp;
