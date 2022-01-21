import Vue from "vue";
import debounce from "lodash.debounce";
import { componentLocales } from "./define";

let scrollHandler: () => void;

export default Vue.extend({
  name: "BackToTop",

  data: () => ({
    /** Scroll distance */
    scrollTop: 0,
  }),

  computed: {
    thresholdDistance(): number {
      return typeof BACK_TO_TOP === "number" ? BACK_TO_TOP : 300;
    },

    /** Whether to display button */
    display(): boolean {
      const globalEnable = BACK_TO_TOP !== false;
      const pageEnable = this.$page.frontmatter.backToTop;

      return (
        (pageEnable || (globalEnable && pageEnable !== false)) &&
        this.scrollTop > this.thresholdDistance
      );
    },

    hint(): string {
      return componentLocales[this.$localePath || "/"].backToTop;
    },
  },

  mounted(): void {
    this.scrollTop = this.getScrollTop();

    scrollHandler = debounce(() => {
      this.scrollTop = this.getScrollTop();
    }, 100);

    window.addEventListener("scroll", scrollHandler);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    window.removeEventListener("scroll", scrollHandler);
  },

  methods: {
    // Get scroll distance
    getScrollTop(): number {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    // Scroll to top
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.scrollTop = 0;
    },
  },
});
