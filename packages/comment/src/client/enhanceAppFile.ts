import CommentService from "@CommentService";

import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("CommentService", CommentService);
};

export default enhanceApp;
