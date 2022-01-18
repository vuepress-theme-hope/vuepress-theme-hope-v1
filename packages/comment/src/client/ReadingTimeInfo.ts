import Vue from "vue";
import TimerIcon from "./icons/TimerIcon.vue";
import { pageInfoLocales, readingTimeLocales } from "./define";

export default Vue.extend({
  name: "ReadingTimeInfo",

  components: { TimerIcon },

  computed: {
    readingTime(): string {
      return `PT${Math.max(Math.round(this.$page.readingTime.minutes), 1)}M`;
    },

    text(): string {
      const minute = readingTimeLocales[this.$localePath || "/"].minute;
      const time = readingTimeLocales[this.$localePath || "/"].time;

      return this.$page.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(this.$page.readingTime.minutes).toString()
          );
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].readingTime;
    },
  },
});
