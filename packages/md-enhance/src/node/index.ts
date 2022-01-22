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

const noopModule = "@mr-hope/vuepress-shared/lib/esm/noopModule";

const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (options, context) => {
  const alignEnable = options.enableAll || options.align || false;
  const codegroupEnable = options.enableAll || options.codegroup || false;
  const demoEnable = options.enableAll || options.demo || false;
  const flowchartEnable = options.enableAll || options.flowchart || false;
  const footnoteEnable = options.enableAll || options.footnote || false;
  const tasklistEnable = options.enableAll || options.tasklist || false;
  const mermaidEnable = options.enableAll || Boolean(options.mermaid) || false;
  const presentationEnable =
    options.enableAll || Boolean(options.presentation) || false;
  const texEnable = options.enableAll || Boolean(options.tex) || false;

  const revealPlugins =
    typeof options.presentation === "object" &&
    Array.isArray(options.presentation.plugins)
      ? options.presentation.plugins
      : [];

  return {
    name: "md-enhance",

    alias: {
      "@CodeGroup": codegroupEnable
        ? resolve(__dirname, "../client/CodeGroup.vue")
        : noopModule,
      "@CodeGroupItem": codegroupEnable
        ? resolve(__dirname, "../client/CodeGroupItem.vue")
        : noopModule,
      "@FlowChart": flowchartEnable
        ? resolve(__dirname, "../client/FlowChart.vue")
        : noopModule,
      "@Mermaid": mermaidEnable
        ? resolve(__dirname, "../client/Mermaid.js")
        : noopModule,
      "@Presentation": presentationEnable
        ? resolve(__dirname, "../client/Presentation.vue")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...codeDemoDefaultSetting,
        ...(typeof options.demo === "boolean" ? {} : options.demo),
      },
      MERMAID_OPTIONS:
        typeof options.mermaid === "object" ? options.mermaid : {},
      REVEAL_CONFIG:
        typeof options.presentation === "object" &&
        typeof options.presentation.revealConfig === "object"
          ? options.presentation.revealConfig
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
      if (options.imageFix !== false) md.plugin("decode-url").use(decodeURL);
      if (options.lineNumbers !== false)
        md.plugin("line-numbers").use(lineNumbers);
      if (options.sup || options.enableAll) md.plugin("sup").use(sup);
      if (options.sub || options.enableAll) md.plugin("sub").use(sub);
      if (footnoteEnable) md.plugin("footnote").use(footnote);
      if (flowchartEnable) md.plugin("flowchart").use(flowchart);
      if (options.mark || options.enableAll) md.plugin("mark").use(mark);
      if (tasklistEnable)
        md.plugin("tasklist").use(tasklist, [
          typeof options.tasklist === "object" ? options.tasklist : {},
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
            ...(typeof options.tex === "object" ? options.tex : {}),
          },
        ]);
      if (presentationEnable) md.plugin("presentation").use(presentation);
    },

    plugins: getPluginConfig(options, context),
  };
};

export = mdEnhancePlugin;
