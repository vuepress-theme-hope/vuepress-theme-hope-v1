import { noopModule, path } from "vuepress-shared";
import lineNumbers = require("@vuepress/markdown/lib/lineNumbers");

import {
  CODE_DEMO_DEFAULT_SETTING,
  chart,
  codeGroup,
  codeTabs,
  decodeURL,
  echarts,
  flowchart,
  footnote,
  katex,
  imageMark,
  imageSize,
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
  tabs,
  tasklist,
  vueDemo,
  legacyCodeDemo,
  legacyFlowchart,
  align,
} from "./markdown-it";
import { getPluginConfig } from "./pluginConfig";

import type { Plugin } from "vuepress-typings";
import type { KatexOptions } from "katex";
import type { MarkdownEnhanceOptions } from "../types";

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

  const chartEnable = getStatus("chart");
  const containerEnable = getStatus("container");
  const codeTabsEnable = getStatus("codetabs");
  const codegroupEnable = getStatus("codegroup");
  const demoEnable = getStatus("demo");
  const echartsEnable = getStatus("echarts");
  const flowchartEnable = getStatus("flowchart");
  const footnoteEnable = getStatus("footnote", true);
  const imageMarkEnable = getStatus("imageMark", true);
  const tasklistEnable = getStatus("tasklist", true);
  const mermaidEnable = getStatus("mermaid");
  const presentationEnable = getStatus("presentation");
  const tabsEnable = getStatus("tabs");
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
        ? path.resolve(__dirname, "../client/components/ChartJS.vue")
        : noopModule,
      "@CodeDemo": demoEnable
        ? path.resolve(__dirname, "../client/components/CodeDemo.vue")
        : noopModule,
      "@CodeGroup": codegroupEnable
        ? path.resolve(__dirname, "../client/components/CodeGroup.vue")
        : noopModule,
      "@CodeGroupItem": codegroupEnable
        ? path.resolve(__dirname, "../client/components/CodeGroupItem.vue")
        : noopModule,
      "@CodeTabs": codeTabsEnable
        ? path.resolve(__dirname, "../client/components/CodeTabs.js")
        : noopModule,
      "@ECharts": echartsEnable
        ? path.resolve(__dirname, "../client/components/ECharts.vue")
        : noopModule,
      "@FlowChart": flowchartEnable
        ? path.resolve(__dirname, "../client/components/FlowChart.vue")
        : noopModule,
      "@Mermaid": mermaidEnable
        ? path.resolve(__dirname, "../client/components/Mermaid.js")
        : noopModule,
      "@Presentation": presentationEnable
        ? path.resolve(__dirname, "../client/components/Presentation.vue")
        : noopModule,
      "@Tabs": tabsEnable
        ? path.resolve(__dirname, "../client/components/Tabs.js")
        : noopModule,
    },

    define: (): Record<string, unknown> => ({
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

    enhanceAppFiles: path.resolve(__dirname, "../client/enhanceAppFile.js"),

    extendMarkdown: (md): void => {
      // hack
      if (options.lineNumbers !== false) md.use(lineNumbers);
      if (options.imageFix !== false) md.use(decodeURL);

      // syntax
      if (getStatus("gfm")) md.options.linkify = true;
      if (getStatus("align")) md.use(align);
      if (getStatus("lazyLoad")) md.use(lazyLoad);
      if (imageMarkEnable)
        md.use(
          imageMark,
          typeof options.imageMark === "object" ? options.imageMark : {}
        );
      if (getStatus("imageSize")) md.use(imageSize);
      if (getStatus("sup")) md.use(sup);
      if (getStatus("sub")) md.use(sub);
      if (footnoteEnable) md.use(footnote);
      if (getStatus("mark")) md.use(mark);
      if (tasklistEnable)
        md.use(tasklist, [
          typeof options.tasklist === "object" ? options.tasklist : {},
        ]);

      // addtional functions
      if (texEnable) md.use(katex, katexOptions);
      if (getStatus("include"))
        md.use(
          include,
          context.sourceDir,
          typeof options.include === "function" ? options.include : undefined
        );
      if (getStatus("stylize")) md.use(stylize, options.stylize);

      // features
      if (getStatus("codegroup")) md.use(codeGroup);
      if (codeTabsEnable) md.use(codeTabs);
      if (tabsEnable) md.use(tabs);
      if (flowchartEnable) {
        md.use(flowchart);
        md.use(legacyFlowchart);
      }
      if (chartEnable) md.use(chart);
      if (echartsEnable) md.use(echarts);
      if (demoEnable) {
        md.use(normalDemo);
        md.use(vueDemo);
        md.use(reactDemo);
        md.use(legacyCodeDemo);
      }
      if (mermaidEnable) md.use(mermaid);
      if (presentationEnable) md.use(presentation);
    },

    plugins: getPluginConfig(options, context),
  };
};
