import Vue from "vue";
import {
  injectCSS,
  injectScript,
  getCode,
  getReactCode,
  getNormalCode,
  getVueCode,
  loadNormal,
  loadReact,
  loadVue,
} from "./utils";

import CodePenIcon from "./icons/CodePenIcon.vue";
import JSFiddleIcon from "./icons/JSFiddleIcon.vue";
import LoadingIcon from "./icons/LoadingIcon.vue";

import type { PropType } from "vue";
import type { Code, CodeType } from "./utils";
import type { CodeDemoOptions } from "../types";

import "balloon-css/balloon.css";

export default Vue.extend({
  name: "CodeDemo",

  components: {
    CodePenIcon,
    JSFiddleIcon,
    LoadingIcon,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    type: {
      type: String as PropType<"normal" | "vue" | "react">,
      default: "normal",
    },

    title: {
      type: String,
      default: "",
    },

    config: {
      type: String,
      default: "",
    },

    code: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    isExpanded: false,
    height: "0",
    loaded: false,
  }),

  computed: {
    codeConfig(): Partial<CodeDemoOptions> {
      return JSON.parse(
        decodeURIComponent(this.config || "{}")
      ) as Partial<CodeDemoOptions>;
    },

    codeType(): CodeType {
      const codeConfig = JSON.parse(
        decodeURIComponent(this.code || "{}")
      ) as Record<string, string>;

      return getCode(codeConfig);
    },

    info(): Code {
      return this.type === "react"
        ? getReactCode(this.codeType, this.codeConfig)
        : this.type === "vue"
        ? getVueCode(this.codeType, this.codeConfig)
        : getNormalCode(this.codeType, this.codeConfig);
    },

    isLegal(): boolean {
      return this.info.isLegal;
    },
  },

  mounted() {
    setTimeout(() => {
      void this.loadDemo();
    }, MARKDOWN_ENHANCE_DELAY);
  },

  methods: {
    initDom(innerHTML = false): void {
      // attach a shadow root to demo

      const shadowRoot = (
        this.$refs["demoWrapper"] as HTMLDivElement
      ).attachShadow({
        mode: "open",
      });
      const appElement = document.createElement("div");

      appElement.classList.add("code-demo-app");
      shadowRoot.appendChild(appElement);

      if (this.isLegal) {
        if (innerHTML) appElement.innerHTML = this.info.html;
        injectCSS(shadowRoot, this.info);
        injectScript(this.id, shadowRoot, this.info);

        this.height = "0";
      } else this.height = "auto";

      this.loaded = true;
    },

    loadDemo(): Promise<void> {
      switch (this.type) {
        case "react": {
          return loadReact(this.info).then(() => this.initDom());
        }
        case "vue": {
          return loadVue(this.info).then(() => this.initDom());
        }
        default: {
          return loadNormal(this.info).then(() => this.initDom(true));
        }
      }
    },

    onToggle(): void {
      this.height = this.isExpanded
        ? "0"
        : `${
            (this.$refs["codeContainer"] as HTMLDivElement).clientHeight + 13.8
          }px`;

      this.isExpanded = !this.isExpanded;
    },
  },
});
