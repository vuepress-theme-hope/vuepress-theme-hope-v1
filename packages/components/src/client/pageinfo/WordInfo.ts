import Vue from "vue";
import WordIcon from "./icons/WordIcon.vue";
import { pageInfoLocales, readingTimeLocales } from "../define";

export default Vue.extend({
  name: "ReadTimeInfo",

  components: { WordIcon },

  computed: {
    words(): string {
      const word = readingTimeLocales[this.$localePath || "/"].word;

      return word.replace("$word", this.$page.readingTime.words.toString());
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].words;
    },
  },
});
