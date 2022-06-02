import { resolve } from "path";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");

import {
  CODE_DEMO_DEFAULT_SETTING,
  chart,
  decodeURL,
  flowchart,
  footnote,
  katex,
  imageMark,
  include,
  lazyLoad,
  mark,
  mermaid,
  normalDemo,
  presentation,
  reactDemo,
  stylize,
  sub,
  sup,
  tasklist,
  vueDemo,
  legacyCodeDemo,
  legacyFlowchart,
} from "./markdown-it";
import { getPluginConfig } from "./pluginConfig";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../types";

const noopModule = "@mr-hope/vuepress-shared/lib/esm/noopModule";

export const mdEnhancePlugin: Plugin<MarkdownEnhanceOptions> = (
  options,
  context
) => {
  const getStatus = (key: keyof MarkdownEnhanceOptions, gfm = false): boolean =>
    key in options
      ? Boolean(options[key])
      : gfm && "gfm" in options
      ? Boolean(options.gfm)
      : options.enableAll || false;

  const alignEnable = getStatus("align");
  const chartEnable = getStatus("chart");
  const containerEnable = getStatus("container");
  const codegroupEnable = getStatus("codegroup");
  const demoEnable = getStatus("demo");
  const flowchartEnable = getStatus("flowchart");
  const footnoteEnable = getStatus("footnote", true);
  const imageMarkEnable = getStatus("imageMark", true);
  const tasklistEnable = getStatus("tasklist", true);
  const mermaidEnable = getStatus("mermaid");
  const presentationEnable = getStatus("presentation");
  const texEnable = getStatus("tex");

  const katexOptions: KatexOptions = {
    macros: {
      // support more symbols
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\liiiint": "\\int\\!\\!\\!\\iiint",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\iiiint": "\\int\\!\\!\\!\\!\\iiint",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "\\idotsint": "\\int\\!\\cdots\\!\\int",
    },
    ...(typeof options.tex === "object" ? options.tex : {}),
  };

  const revealPlugins =
    typeof options.presentation === "object" &&
    Array.isArray(options.presentation.plugins)
      ? options.presentation.plugins
      : [];

  return {
    name: "vuepress-plugin-md-enhance",

    alias: {
      "@ChartJS": chartEnable
        ? resolve(__dirname, "../client/components/ChartJS.vue")
        : noopModule,
      "@CodeDemo": demoEnable
        ? resolve(__dirname, "../client/components/CodeDemo.vue")
        : noopModule,
      "@CodeGroup": codegroupEnable
        ? resolve(__dirname, "../client/components/CodeGroup.vue")
        : noopModule,
      "@CodeGroupItem": codegroupEnable
        ? resolve(__dirname, "../client/components/CodeGroupItem.vue")
        : noopModule,
      "@FlowChart": flowchartEnable
        ? resolve(__dirname, "../client/components/FlowChart.vue")
        : noopModule,
      "@Mermaid": mermaidEnable
        ? resolve(__dirname, "../client/components/Mermaid.js")
        : noopModule,
      "@Presentation": presentationEnable
        ? resolve(__dirname, "../client/components/Presentation.vue")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
      MARKDOWN_ENHANCE_ALIGN: alignEnable,
      MARKDOWN_ENHANCE_CONTAINER: containerEnable,
      MARKDOWN_ENHANCE_DELAY: options.delay || 500,
      MARKDOWN_ENHANCE_FOOTNOTE: footnoteEnable,
      MARKDOWN_ENHANCE_TASKLIST: tasklistEnable,
      MARKDOWN_ENHANCE_TEX: texEnable,
      CODE_DEMO_OPTIONS: {
        ...CODE_DEMO_DEFAULT_SETTING,
        ...(typeof options.demo === "object" ? options.demo : {}),
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

    extendMarkdown: (md): void => {
      // hack
      if (options.lineNumbers !== false) md.use(lineNumbers);
      if (options.imageFix !== false) md.use(decodeURL);

      if (getStatus("lazyLoad")) md.use(lazyLoad);
      if (imageMarkEnable)
        md.use(
          imageMark,
          typeof options.imageMark === "object" ? options.imageMark : {}
        );
      if (getStatus("sup")) md.use(sup);
      if (getStatus("sub")) md.use(sub);
      if (footnoteEnable) md.use(footnote);
      if (flowchartEnable) {
        md.use(flowchart);
        md.use(legacyFlowchart);
      }
      if (getStatus("mark")) md.use(mark);
      if (tasklistEnable)
        md.use(tasklist, [
          typeof options.tasklist === "object" ? options.tasklist : {},
        ]);
      if (chartEnable) md.use(chart);
      if (demoEnable) {
        md.use(normalDemo);
        md.use(vueDemo);
        md.use(reactDemo);
        md.use(legacyCodeDemo);
      }
      if (getStatus("include"))
        md.use(include, [
          typeof options.include === "function" ? options.include : undefined,
        ]);
      if (mermaidEnable) md.use(mermaid);
      if (texEnable) md.use(katex, katexOptions);
      if (presentationEnable) md.use(presentation);
      if (getStatus("stylize")) md.use(stylize, options.stylize);
    },

    plugins: getPluginConfig(options, context),
  };
};
