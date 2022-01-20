import { resolve } from "path";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");

import { codeDemoDefaultSetting } from "./markdown-it/code-demo";
import decodeURL from "./markdown-it/decode-url";
import flowchart from "./markdown-it/flowchart";
import footnote from "./markdown-it/footnote";
import katex from "./markdown-it/katex";
import mark from "./markdown-it/mark";
import mermaid from "./markdown-it/mermaid";
import presentation from "./markdown-it/presentation";
import sub from "./markdown-it/sub";
import sup from "./markdown-it/sup";
import tasklist from "./markdown-it/tasklist";
import { getPluginConfig } from "./pluginConfig";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { MarkdownEnhanceOptions } from "../types";

const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (option, context) => {
  const { themeConfig } = context;
  const markdownOptions =
    Object.keys(option).length === 0 ? themeConfig.mdEnhance || {} : option;
  const alignEnable =
    markdownOptions.enableAll || markdownOptions.align || false;
  const demoEnable = markdownOptions.enableAll || markdownOptions.demo || false;
  const flowchartEnable =
    markdownOptions.enableAll || markdownOptions.flowchart || false;
  const footnoteEnable =
    markdownOptions.enableAll || markdownOptions.footnote || false;
  const tasklistEnable =
    markdownOptions.enableAll || markdownOptions.tasklist || false;
  const mermaidEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.mermaid) || false;
  const presentationEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.presentation) || false;
  const texEnable =
    markdownOptions.enableAll || Boolean(markdownOptions.tex) || false;

  const revealPlugins =
    typeof markdownOptions.presentation === "object" &&
    Array.isArray(markdownOptions.presentation.plugins)
      ? markdownOptions.presentation.plugins
      : [];

  return {
    name: "md-enhance",

    alias: {
      "@FlowChart": flowchartEnable
        ? resolve(__dirname, "../client/FlowChart.vue")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Mermaid": mermaidEnable
        ? resolve(__dirname, "../client/Mermaid.js")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
      "@Presentation": presentationEnable
        ? resolve(__dirname, "../client/Presentation.vue")
        : "@mr-hope/vuepress-shared/lib/esm/noopModule",
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_DELAY: markdownOptions.delay || 500,
      MARKDOWN_ENHANCE_FLOWCHART: flowchartEnable,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_MERMAID: mermaidEnable,
      MARKDOWN_ENHANCE_PRESENTATION: presentationEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof markdownOptions.demo === "boolean"
          ? {}
          : markdownOptions.demo),
      },
      MERMAID_OPTIONS:
        typeof markdownOptions.mermaid === "object"
          ? markdownOptions.mermaid
          : {},
      REVEAL_CONFIG:
        typeof markdownOptions.presentation === "object" &&
        typeof markdownOptions.presentation.revealConfig === "object"
          ? markdownOptions.presentation.revealConfig
          : {},
      REVEAL_PLUGIN_HIGHLIGHT: revealPlugins.includes("highlight"),
      REVEAL_PLUGIN_MATH: revealPlugins.includes("math"),
      REVEAL_PLUGIN_NOTES: revealPlugins.includes("notes"),
      REVEAL_PLUGIN_SEARCH: revealPlugins.includes("search"),
      REVEAL_PLUGIN_ZOOM: revealPlugins.includes("zoom"),
    }),

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    ...(demoEnable
      ? {
          clientRootMixin: resolve(__dirname, "../client/clientRootMixin.js"),
        }
      : {}),

    chainMarkdown: (md): void => {
      if (markdownOptions.imageFix !== false)
        md.plugin("decode-url").use(decodeURL);
      if (markdownOptions.lineNumbers !== false)
        md.plugin("line-numbers").use(lineNumbers);
      if (markdownOptions.sup || markdownOptions.enableAll)
        md.plugin("sup").use(sup);
      if (markdownOptions.sub || markdownOptions.enableAll)
        md.plugin("sub").use(sub);
      if (footnoteEnable) md.plugin("footnote").use(footnote);
      if (flowchartEnable) md.plugin("flowchart").use(flowchart);
      if (markdownOptions.mark || markdownOptions.enableAll)
        md.plugin("mark").use(mark);
      if (tasklistEnable)
        md.plugin("tasklist").use(tasklist, [
          typeof markdownOptions.tasklist === "object"
            ? markdownOptions.tasklist
            : {},
        ]);
      if (mermaidEnable) md.plugin("mermaid").use(mermaid);
      if (texEnable)
        md.plugin("katex").use(katex, [
          {
            macros: {
              // support more symbols
              "\\liiiint": "\\int\\!\\!\\!\\iiint",
              "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
              "\\idotsint": "\\int\\!\\cdots\\!\\int",
            },
            ...(typeof markdownOptions.tex === "object"
              ? markdownOptions.tex
              : {}),
          },
        ]);
      if (presentationEnable) md.plugin("presentation").use(presentation);
    },

    plugins: getPluginConfig(markdownOptions, context),
  };
};

export = mdEnhancePlugin;
