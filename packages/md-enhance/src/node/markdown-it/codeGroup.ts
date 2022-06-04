import { container } from "../markdown-it";

import type { PluginSimple } from "markdown-it";

export const codeGroup: PluginSimple = (md) => {
  md.use(container, {
    name: "code-group",
    openRender: () => {
      return `<CodeGroup>\n`;
    },
    closeRender: () => "</CodeGroup>\n",
  });

  md.use(container, {
    name: "code-group-item",
    openRender: (tokens, index) => {
      const { info } = tokens[index];
      const isActive = info.split(":").pop() === "active";

      return `<CodeGroupItem title="${
        isActive ? info.replace(/:active$/, "") : info
      }"${isActive ? " active" : ""}>\n`;
    },
    closeRender: () => "</CodeGroupItem>\n",
  });
};
