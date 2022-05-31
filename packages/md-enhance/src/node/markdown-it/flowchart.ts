import hash = require("hash-sum");
import { uml } from "./uml";

import type { PluginSimple } from "markdown-it";
import type Token = require("markdown-it/lib/token");

const flowchartRender = (tokens: Token[], idx: number): string => {
  const token = tokens[idx];
  const key = `flowchart-${hash(idx)}`;
  const { content, info } = token;

  return `<FlowChart id="${key}" code="${encodeURIComponent(
    content
  )}" preset="${info.trim().split(":", 2)[1] || "vue"}"></FlowChart>`;
};

export const flowchart: PluginSimple = (md) => {
  // Handle ```flow and ```flowchart blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index];
    const realInfo = info.split(":", 2)[0];

    if (realInfo === "flow" || realInfo === "flowchart")
      return flowchartRender(tokens, index);

    return fence!(...args);
  };

  md.renderer.rules["flowchart"] = flowchartRender;
};

/** @deprecated */
export const legacyFlowchart: PluginSimple = (md) => {
  uml(md, {
    name: "flowchart",
    open: "flowstart",
    close: "flowend",
    render: (tokens, idx): string => {
      console.warn(
        '"@flowstart ... @flowend" is deprecated, you should use ```flow ... ``` instead.'
      );

      const token = tokens[idx];
      const key = `flowchart_${hash(idx)}`;
      const { content, info } = token;

      return `<FlowChart id="${key}" code="${encodeURIComponent(
        content
      )}" preset="${info.trim() || "vue"}"></FlowChart>`;
    },
  });
};
