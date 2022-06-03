import Vue from "vue";
import { capitalize, getAuthor } from "@mr-hope/vuepress-shared/lib/client";
import AuthorIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/AuthorIcon.vue";
import CalendarIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/CalendarIcon.vue";
import CategoryInfo from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/CategoryInfo.vue";
import TagInfo from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/TagInfo.vue";
import TimerIcon from "@mr-hope/vuepress-plugin-components/lib/client/pageinfo/icons/TimerIcon.vue";

import type { BasePage } from "@mr-hope/vuepress-types";
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
      const { less1Minute, time } =
        READING_TIME_LOCALES[this.$localePath || "/"];

      return this.article.readingTime.minutes < 1
        ? less1Minute
        : time.replace(
            "$time",
            Math.round(this.article.readingTime.minutes).toString()
          );
    },

    authorText(): string {
      return PAGE_INFO_LOCALES[this.$localePath || "/"].author;
    },

    timeText(): string {
      return PAGE_INFO_LOCALES[this.$localePath || "/"].date;
    },

    tagText(): string {
      return PAGE_INFO_LOCALES[this.$localePath || "/"].tag;
    },

    readingTimeText(): string {
      return PAGE_INFO_LOCALES[this.$localePath || "/"].readingTime;
    },
  },
});
