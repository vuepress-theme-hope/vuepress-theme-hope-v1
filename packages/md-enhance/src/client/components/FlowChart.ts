import Vue from "vue";
import { debounce } from "ts-debounce";
import Loading from "../icons/LoadingIcon.vue";
import presets from "../flowchart-preset";

import type { DebouncedFunction } from "ts-debounce";

import type * as Flowchart from "flowchart.js";
import type { PropType } from "vue";

let svg: Flowchart.Instance;

export default Vue.extend({
  name: "FlowChart",

  components: { Loading },

  props: {
    id: { type: String, required: true },
    code: { type: String, required: true },
    preset: { type: String as PropType<"ant" | "vue">, default: "vue" },
  },

  data: () => ({
    loading: true,
    scale: 1,
  }),

  computed: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $preset(): Record<string, any> {
      const preset = presets[this.preset as "ant" | "vue"];

      if (!preset) {
        console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);

        return presets.vue;
      }

      return preset;
    },

    onResize(): DebouncedFunction<[], () => void> {
      return debounce(() => {
        const scale = this.getScale(window.innerWidth);

        if (this.scale !== scale) {
          this.scale = scale;
          svg.drawSVG(this.id, { ...this.$preset, scale });
        }
      }, 100);
    },
  },

  mounted(): void {
    this.$el.setAttribute("id", this.id);

    void Promise.all([
      import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
      // delay
      new Promise((resolve) => setTimeout(resolve, MARKDOWN_ENHANCE_DELAY)),
    ]).then(([flowchart]) => {
      const { parse } = flowchart;

      svg = parse(decodeURIComponent(this.code));
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    getScale(width: number): number {
      return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;
    },
  },
});
