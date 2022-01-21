import CommentService from "./CommentService.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  Vue.component("CommentService", CommentService);
};

export default enhanceApp;
