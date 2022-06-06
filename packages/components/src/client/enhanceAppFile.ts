import BackToTop from "@BackToTop";
import Badge from "@Badge";
import ExternalLinkIcon from "@ExternalLinkIcon";
import FontIcon from "@FontIcon";

import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (BackToTop.name) Vue.component("BackToTop", BackToTop);
  if (Badge.name) Vue.component("Badge", Badge);
  if (ExternalLinkIcon.name)
    Vue.component("ExternalLinkIcon", ExternalLinkIcon);
  if (FontIcon.name) Vue.component("FontIcon", FontIcon);
};

export default enhanceApp;
