import Vue from "vue";
import TimerIcon from "./icons/TimerIcon.vue";
import { pageInfoLocales, readingTimeLocales } from "../define";

export default Vue.extend({
  name: "ReadingTimeInfo",

  components: { TimerIcon },

  computed: {
    readingTime(): string {
      return `PT${Math.max(Math.round(this.$page.readingTime.minutes), 1)}M`;
    },

    text(): string {
      const { less1Minute, time } = readingTimeLocales[this.$localePath];

      return this.$page.readingTime.minutes < 1
        ? less1Minute
        : time.replace(
            "$time",
            Math.round(this.$page.readingTime.minutes).toString()
          );
    },

    hint(): string {
      return pageInfoLocales[this.$localePath].readingTime;
    },
  },
});
