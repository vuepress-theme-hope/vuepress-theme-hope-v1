/* eslint-disable vue/one-component-per-file */
import Vue from "vue";

import type { VNode } from "vue";

export default Vue.extend({
  render(h): VNode {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return h(Vue.component("Vssue", { props: { title: this.$title } }));
  },
});
