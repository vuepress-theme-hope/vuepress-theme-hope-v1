import Vue from "vue";

export default Vue.extend({
  name: "Clipboard",

  props: {
    html: { type: String, default: "" },
    lang: { type: String, default: "en-US" },
  },

  data: () => ({
    location: "",
  }),

  computed: {
    copyright(): string {
      const { author } = this.$themeConfig;
      const content: Record<string, string> = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "zh-CN": `${this.html}\n-----\n${
          author ? `著作权归${author}所有。\n` : ""
        }链接: ${this.location}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "en-US": `${this.html}\n-----\n${
          author ? `Copyright by ${author}.\n` : ""
        }Link: ${this.location}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "vi-VN": `${this.html}\n-----\n${
          author ? `bản quyền bởi ${author}.\n` : ""
        }Liên kết: ${this.location}`,
      };

      return content[this.lang];
    },
  },

  created(): void {
    if (typeof window !== "undefined")
      this.location = window.location.toString();
  },
});
