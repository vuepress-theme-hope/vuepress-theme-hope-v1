import Vue from "vue";
import TagIcon from "./icons/TagIcon.vue";
import { capitalize } from "@mr-hope/vuepress-shared";
import { pageInfoLocales } from "./../define";

import type { PropType } from "vue";

export default Vue.extend({
  name: "TagInfo",

  components: { TagIcon },

  props: {
    tags: {
      type: Array as PropType<string[]>,
      default: (): string[] => [],
    },
    tagPath: { type: String, default: "" },
  },

  computed: {
    items(): string[] {
      if (this.tags.length !== 0) return this.tags;

      const { tags, tag = tags } = this.$frontmatter;

      if (typeof tag === "string") return [capitalize(tag)];

      if (Array.isArray(tag)) return tag.map((item) => capitalize(item));

      return [];
    },

    clickable(): boolean {
      return Boolean(this.tagPath);
    },

    hint(): string {
      return pageInfoLocales[this.$localePath || "/"].tag;
    },
  },

  methods: {
    navigate(tagName: string): void {
      const path = this.tagPath.replace(/\$tag/g, decodeURI(tagName));

      if (this.$route.path !== path) void this.$router.push(path);
    },
  },
});
