import AddThis from "./AddThis";

import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("AddThis", AddThis);
};

export default enhanceApp;
