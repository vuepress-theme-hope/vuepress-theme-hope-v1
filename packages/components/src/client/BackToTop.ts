import Vue from "vue";
import { debounce } from "ts-debounce";
import { componentLocales } from "./define";

import type { DebouncedFunction } from "ts-debounce";

let onScroll: DebouncedFunction<[], () => void>;

export default Vue.extend({
  name: "BackToTop",

  data: () => ({
    /** Scroll distance */
    scrollTop: 0,
  }),

  computed: {
    /** Whether to display button */
    display(): boolean {
      return (
        this.$page.frontmatter.backToTop !== false &&
        this.scrollTop > BACK_TO_TOP_THRESHOLD
      );
    },

    hint(): string {
      return componentLocales[this.$localePath].backToTop;
    },
  },

  mounted(): void {
    this.scrollTop = this.getScrollTop();

    onScroll = debounce(() => {
      this.scrollTop = this.getScrollTop();
    }, 100);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener("scroll", onScroll);
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.removeEventListener("scroll", onScroll);
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
