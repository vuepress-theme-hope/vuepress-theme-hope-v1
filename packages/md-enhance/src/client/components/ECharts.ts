import Vue from "vue";
import { debounce } from "ts-debounce";
import LoadingIcon from "../icons/LoadingIcon.vue";

import type { ECharts, EChartOption } from "echarts";
import type { DebouncedFunction } from "ts-debounce";
import type { PropType } from "vue";

const parseEChartsConfig = (
  config: string,
  type: "js" | "json"
): EChartOption => {
  if (type === "json") return JSON.parse(config) as EChartOption;

  const exports = {};
  const module = { exports };

  eval(config);

  return module.exports as EChartOption;
};

export default Vue.extend({
  name: "ECharts",

  components: { LoadingIcon },

  props: {
    config: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String as PropType<"js" | "json">, default: "json" },
  },

  data: () => ({
    loading: true,
    chart: null as ECharts | null,
    onResize: null as DebouncedFunction<[], () => void> | null,
  }),

  mounted() {
    void Promise.all([
      import(/* webpackChunkName: "echarts" */ "echarts"),
      // delay
      new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
    ]).then(([echarts]) => {
      const options = parseEChartsConfig(
        decodeURIComponent(this.config),
        this.type as "js" | "json"
      );

      this.loading = false;

      this.chart = echarts.init(this.$refs["echartsWrapper"] as HTMLDivElement);
      this.chart.showLoading();
      this.chart.setOption(options);
      this.chart.hideLoading();

      Vue.nextTick(() => {
        this.chart!.resize();
      });
    });

    this.onResize = debounce(() => {
      this.chart?.resize();
    }, 100);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (this.onResize) window.removeEventListener("resize", this.onResize);
    this.chart?.dispose();
  },

  render(h) {
    return h("div", { class: "echarts" }, [
      this.title
        ? h("div", { class: "echarts-title" }, decodeURIComponent(this.title))
        : null,
      this.loading
        ? [h("div", { class: "echarts-loading-wrapper" }, [h(LoadingIcon)])]
        : null,
      h("div", {
        ref: "echartsWrapper",
        class: "echarts-wrapper",
        attrs: {
          id: this.id,
        },
      }),
    ]);
  },
});
