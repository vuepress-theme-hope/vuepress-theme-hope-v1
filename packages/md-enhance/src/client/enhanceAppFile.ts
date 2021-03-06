import ChartJS from "@ChartJS";
import CodeDemo from "@CodeDemo";
import CodeGroup from "@CodeGroup";
import CodeGroupItem from "@CodeGroupItem";
import CodeTabs from "@CodeTabs";
import ECharts from "@ECharts";
import FlowChart from "@FlowChart";
import Mermaid from "@Mermaid";
import Presentation from "@Presentation";
import Tabs from "@Tabs";
import type { EnhanceApp } from "vuepress-typings";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (MARKDOWN_ENHANCE_CONTAINER) void import("./styles/container.styl");

  if (ChartJS.name) Vue.component("ChartJS", ChartJS);
  if (CodeDemo.name) Vue.component("CodeDemo", CodeDemo);
  if (CodeGroup.name) Vue.component("CodeGroup", CodeGroup);
  if (CodeGroupItem.name) Vue.component("CodeGroupItem", CodeGroupItem);
  if (CodeTabs.name) Vue.component("CodeTabs", CodeTabs);

  if (MARKDOWN_ENHANCE_FOOTNOTE) void import("./styles/footnote.styl");

  if (ECharts.name) Vue.component("ECharts", ECharts);
  if (FlowChart.name) Vue.component("FlowChart", FlowChart);
  if (Mermaid.name) Vue.component("Mermaid", Mermaid);
  if (Presentation.name) Vue.component("Presentation", Presentation);
  if (Tabs.name) Vue.component("Tabs", Tabs);

  if (MARKDOWN_ENHANCE_TASKLIST) void import("./styles/tasklist.styl");

  if (MARKDOWN_ENHANCE_TEX) {
    void import("./styles/tex.styl");
    void import("katex/dist/katex.min.css");
  }
};

export default enhanceApp;
