import Vue from "vue";
import LoadingIcon from "../icons/LoadingIcon.vue";

import type { ChartConfiguration } from "chart.js";
import type { PropType } from "vue";

const parseChartConfig = (
  config: string,
  type: "js" | "json"
): ChartConfiguration => {
  if (type === "json") return JSON.parse(config) as ChartConfiguration;

  const exports = {};
  const module = { exports };

  eval(config);

  return module.exports as ChartConfiguration;
};

export default Vue.extend({
  name: "ChartJS",

  components: { LoadingIcon },

  props: {
    config: { type: String, required: true },
    id: { type: String, required: true },
    title: { type: String, default: "" },
    type: { type: String as PropType<"js" | "json">, default: "json" },
  },

  data: () => ({
    loading: true,
  }),

  mounted() {
    void Promise.all([
      import(/* webpackChunkName: "chart" */ "chart.js/auto"),
      // delay
      new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
    ]).then(([{ default: Chart }]) => {
      Chart.defaults.maintainAspectRatio = false;

      const data = parseChartConfig(
        decodeURIComponent(this.config),
        this.type as "js" | "json"
      );
      const ctx = (
        this.$refs["chartCanvasElement"] as HTMLCanvasElement
      )?.getContext("2d") as CanvasRenderingContext2D;

      new Chart(ctx, data);

      this.loading = false;
    });
  },
});
