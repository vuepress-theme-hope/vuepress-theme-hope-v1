import Vue from "vue";
import WordIcon from "@theme/icons/WordIcon.vue";

const readingTimeLocales = READING_TIME_LOCALES;

export default Vue.extend({
  name: "ReadTimeInfo",

  components: { WordIcon },

  computed: {
    words(): string {
      const word = readingTimeLocales[this.$localePath].word;

      return word.replace("$word", this.$page.readingTime.words.toString());
    },

    hint(): string {
      return this.$themeLocaleConfig.metaLocales.words;
    },
  },
});
