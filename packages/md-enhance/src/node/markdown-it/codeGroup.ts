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
      const isActive = info.endsWith(":active");

      return `<CodeGroupItem title="${(isActive
        ? info.replace(/:active$/, "")
        : info
      ).substring(16)}"${isActive ? " active" : ""}>\n`;
    },
    closeRender: () => "</CodeGroupItem>\n",
  });
};
