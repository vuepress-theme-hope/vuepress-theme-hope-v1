import Vue from "vue";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@theme/utils/path";

import type { PropType } from "vue";
import type { AutoLink } from "@theme/types";

export default Vue.extend({
  name: "AutoLink",

  props: {
    config: { type: Object as PropType<AutoLink>, required: true },
    exact: Boolean,
    externalLinkIcon: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    hasHttpProtocol(): boolean {
      return isLinkHttp(this.config.link);
    },

    hasNonHttpProtocal(): boolean {
      return isLinkMailto(this.config.link) || isLinkTel(this.config.link);
    },

    linkTarget(): string | undefined {
      return this.hasNonHttpProtocal
        ? undefined
        : this.config.target || (this.hasHttpProtocol ? "_blank" : undefined);
    },

    isBlankTarget(): boolean {
      return this.linkTarget === "_blank";
    },

    renderRouterLink(): boolean {
      return (
        !this.hasHttpProtocol && !this.hasNonHttpProtocal && !this.isBlankTarget
      );
    },

    anchorRel(): string | undefined {
      return this.hasNonHttpProtocal
        ? undefined
        : this.config.rel ||
            (this.isBlankTarget ? "noopener noreferrer" : undefined);
    },

    linkAriaLabel(): string {
      return this.config.ariaLabel || this.config.text;
    },

    shouldBeActiveInSubpath(): boolean {
      // should not be active in `exact` mode
      if (this.exact) return false;

      const localeKeys = Object.keys(this.$site.locales);

      return localeKeys.length
        ? // check all the locales
          localeKeys.every((key) => key !== this.config.link)
        : // check root
          this.config.link !== "/";
    },

    isActive(): boolean {
      return this.renderRouterLink
        ? this.config.activeMatch
          ? new RegExp(this.config.activeMatch).test(this.$route.path)
          : // if this link is active in subpath
          !this.shouldBeActiveInSubpath
          ? this.$route.path === this.config.link
          : this.$route.path.startsWith(this.config.link)
        : false;
    },
  },

  render(h) {
    const { text, icon, link } = this.config;

    return this.renderRouterLink
      ? h(
          Vue.component("RouterLink"),
          {
            props: {
              to: link,
            },
            attrs: { "aria-label": this.linkAriaLabel, ...this.$attrs },
            // class needs to be merged manually
            class: [
              "nav-link",
              { active: this.isActive },
              this.$attrs["class"],
            ],
            on: {
              focusout: () => this.$emit("focusout"),
            },
          },

          this.$scopedSlots["default"]?.({}) || [
            this.$scopedSlots["before"]?.({}) || [
              h(Vue.component("FontIcon"), { props: { icon } }),
            ],
            text,
            this.$scopedSlots["after"]?.({}),
          ]
        )
      : h(
          "a",
          {
            // class needs to be merged manually
            class: ["nav-link", this.$attrs["class"]],
            attrs: {
              href: link,
              rel: this.anchorRel,
              target: this.linkTarget,
              "aria-label": this.linkAriaLabel,
              ...this.$attrs,
            },
            on: {
              focusout: () => this.$emit("focusout"),
            },
          },
          this.$scopedSlots["default"]?.({}) || [
            this.$scopedSlots["before"]?.({}) || [
              h(Vue.component("FontIcon"), { props: { icon } }),
            ],
            text,
            this.externalLinkIcon ? h(Vue.component("ExternalLinkIcon")) : null,
            this.$scopedSlots["after"]?.({}),
          ]
        );
  },
});
