import Vue from "vue";

import type { VNode } from "vue";

declare const ICON_PREFIX: string;

export interface FontIconProps {
  icon?: string;
  color?: string;
  size?: number;
}

export default Vue.extend({
  name: "FontIcon",

  props: {
    icon: { type: String, default: "" },
    color: { type: String, default: "" },
    size: { type: Number, default: 0 },
  },

  render(h) {
    return this.icon
      ? h(
          "span",
          {
            class: ["icon", `${ICON_PREFIX}${this.icon}`],
            style: {
              ...(this.color ? { color: this.color } : {}),
              ...(this.size ? { "font-size": `${this.size}px` } : {}),
            },
          },
          []
        )
      : (null as unknown as VNode);
  },
});
