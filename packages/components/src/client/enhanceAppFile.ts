import BackToTop from "@BackToTop";
import Badge from "@Badge";
import BreadCrumb from "@BreadCrumb";
import Pagination from "@Pagination";
import ScreenFull from "@ScreenFull";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (BackToTop.name) Vue.component("BackToTop", BackToTop);
  if (Badge.name) Vue.component("Badge", Badge);
  if (BreadCrumb.name) Vue.component("BreadCrumb", BreadCrumb);
  if (Pagination.name) Vue.component("Pagination", Pagination);
  if (ScreenFull.name) Vue.component("ScreenFull", ScreenFull);
};

export default enhanceApp;
