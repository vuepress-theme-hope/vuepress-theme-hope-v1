import Vue, { defineComponent, h, ref, watch } from "vue";

import type { Component, PropType, VNode } from "vue";
import type { TabProps } from "./Tabs";

import "../styles/code-tabs.styl";

const codeTabStore = ref<Record<string, string>>({});

export default defineComponent({
  name: "CodeTabs",

  props: {
    active: { type: Number, default: 0 },
    data: {
      type: Array as PropType<TabProps[]>,
      required: true,
    },
    tabId: {
      type: String,
      default: "",
    },
  },

  setup(props, { slots }) {
    const getInitialIndex = (): number => {
      if (props.tabId) {
        const valueIndex = props.data!.findIndex(
          ({ title, value = title }) =>
            codeTabStore.value[props.tabId] === value
        );

        if (valueIndex !== -1) return valueIndex;
      }

      return props.active;
    };

    // index of current active item
    const activeIndex = ref(getInitialIndex());

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

    // update store
    const updateStore = (): void => {
      if (props.tabId) {
        const { title, value = title } = props.data![activeIndex.value];

        codeTabStore.value[props.tabId] = value;
      }
    };

    // activate next tab
    const activateNext = (index = activeIndex.value): void => {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    };

    // activate previous tab
    const activatePrev = (index = activeIndex.value): void => {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    };

    // handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, index: number): void => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }

      if (props.tabId) {
        const { title, value = title } = props.data![activeIndex.value];

        codeTabStore.value[props.tabId] = value;
      }
    };

    watch(
      () => codeTabStore.value[props.tabId],
      (newValue, oldValue) => {
        if (props.tabId && newValue !== oldValue) {
          const index = props.data!.findIndex(
            ({ title, value = title }) => value === newValue
          );

          if (index !== -1) activeIndex.value = index;
        }
      }
    );

    return (): VNode | null =>
      h(Vue.component("ClientOnly"), [
        props.data!.length
          ? h("div", { class: "code-tabs" }, [
              h(
                "div",
                { class: "code-tabs-nav" },
                props.data!.map(({ title }, index) => {
                  const isActive = index === activeIndex.value;

                  return h(
                    "button",
                    {
                      ref: "tabRefs",
                      class: ["code-tabs-nav-tab", { active: isActive }],
                      attrs: {
                        "aria-pressed": isActive,
                        "aria-expanded": isActive,
                      },
                      on: {
                        click: () => {
                          activeIndex.value = index;
                          updateStore();
                        },
                        keydown: (event: KeyboardEvent) =>
                          keyboardHandler(event, index),
                      },
                    },
                    title
                  );
                })
              ),
              props.data!.map(({ title, value = title }, index) => {
                const isActive = index === activeIndex.value;

                return h(
                  "div",
                  {
                    class: ["code-tab", { active: isActive }],
                    attrs: {
                      "aria-selected": isActive,
                    },
                  },
                  slots[`tab${index}`]?.({ title, value, isActive })
                );
              }),
            ])
          : null,
      ]);
  },
}) as Component;
