import Vue from "vue";
import { capitalize, getAuthor } from "vuepress-shared/lib/client";
import CategoryInfo from "@theme/components/Info/CategoryInfo.vue";
import TagInfo from "@theme/components/Info/TagInfo.vue";
import AuthorIcon from "@theme/icons/AuthorIcon.vue";
import CalendarIcon from "@theme/icons/CalendarIcon.vue";
import TimerIcon from "@theme/icons/TimerIcon.vue";

import type { BasePage } from "vuepress-typings";
import type { PropType } from "vue";

export default Vue.extend({
  name: "ArticleInfo",

  components: {
    AuthorIcon,
    CalendarIcon,
    CategoryInfo,
    TagInfo,
    TimerIcon,
  },

  props: {
    article: { type: Object as PropType<BasePage>, required: true },
  },

  computed: {
    author(): string {
      return this.article.frontmatter.author
        ? getAuthor(this.article.frontmatter.author)[0]?.name
        : this.$themeConfig.author && this.article.frontmatter.author !== false
        ? this.$themeConfig.author
        : "";
    },

    time(): string {
      const { date, time = date } = this.article.frontmatter;

      if (typeof time === "string") {
        if (time.indexOf("T") !== -1) {
          const [dateString, temp] = time.split("T");
          const [times] = temp.split(".");

          return `${dateString} ${times === "00:00:00" ? "" : times}`;
        }

        return time;
      }

      return this.article.createTime || "";
    },

    tags(): string[] {
      const { tag, tags = tag } = this.article.frontmatter;

      if (typeof tags === "string") return [capitalize(tags)];

      if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

      return [];
    },

    readingTimeContent(): string {
      return `PT${Math.max(Math.round(this.$page.readingTime.minutes), 1)}M`;
    },

    readingTime(): string {
      const { less1Minute, time } = READING_TIME_LOCALES[this.$localePath];

      return this.article.readingTime.minutes < 1
        ? less1Minute
        : time.replace(
            "$time",
            Math.round(this.article.readingTime.minutes).toString()
          );
    },

    authorText(): string {
      return this.$themeLocaleConfig.metaLocales.author;
    },

    timeText(): string {
      return this.$themeLocaleConfig.metaLocales.date;
    },

    tagText(): string {
      return this.$themeLocaleConfig.metaLocales.tag;
    },

    readingTimeText(): string {
      return this.$themeLocaleConfig.metaLocales.readingTime;
    },
  },
});
