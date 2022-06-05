import Vue from "vue";
import { debounce } from "ts-debounce";

import type { DebouncedFunction } from "ts-debounce";

let onScroll: DebouncedFunction<[], () => void>;

const backToTopLocales = BACK_TO_TOP_LOCALES;

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
      return backToTopLocales[this.$localePath].backToTop;
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
