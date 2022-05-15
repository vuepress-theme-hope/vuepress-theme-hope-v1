import { getLocales } from "@mr-hope/vuepress-shared";
import { codeDemoRender } from "./markdown-it/codeDemo";
import { markdownEnhanceLocales } from "./locales";

import type { Context, PluginConfig } from "@mr-hope/vuepress-types";
import type { MarkdownContainerName, MarkdownEnhanceOptions } from "../types";

export const getPluginConfig = (
  markdownOptions: MarkdownEnhanceOptions,
  context: Context
): PluginConfig[] => {
  const containers: MarkdownContainerName[] = [
    "info",
    "note",
    "tip",
    "warning",
    "danger",
  ];

  const locales = getLocales(
    context,
    markdownEnhanceLocales,
    markdownOptions.locales
  );

  const getContainterLocale = (
    key: MarkdownContainerName
  ): Record<string, string> =>
    Object.fromEntries(
      Object.keys(locales).map((path) => [path, locales[path][key]])
    );

  const config: PluginConfig[] = [];

  if (markdownOptions.container || markdownOptions.enableAll)
    config.push(
      ...containers.map<PluginConfig>((type) => [
        "container",
        { type, defaultTitle: getContainterLocale(type) },
      ]),
      [
        "container",
        {
          type: "details",
          before: (info: string): string =>
            `<details class="custom-block details"><summary>${
              info || "Details"
            }</summary>\n`,
          after: (): string => "</details>\n",
        },
      ]
    );

  if (markdownOptions.align || markdownOptions.enableAll)
    config.push(
      ["container", { type: "left", defaultTitle: "" }],
      ["container", { type: "center", defaultTitle: "" }],
      ["container", { type: "right", defaultTitle: "" }],
      ["container", { type: "justify", defaultTitle: "" }]
    );

  if (markdownOptions.codegroup || markdownOptions.enableAll)
    config.push(
      [
        "container",
        {
          type: "code-group",
          before: () => `<CodeGroup>\n`,
          after: () => "</CodeGroup>\n",
        },
      ],
      [
        "container",
        {
          type: "code-group-item",
          before: (info: string): string => {
            const isActive = info.split(":").pop() === "active";

            return `<CodeGroupItem title="${
              isActive ? info.replace(/:active$/, "") : info
            }"${isActive ? " active" : ""}>\n`;
          },
          after: () => "</CodeGroupItem>\n",
        },
      ]
    );

  if (markdownOptions.demo || markdownOptions.enableAll)
    config.push(["container", { type: "demo", render: codeDemoRender }]);

  return config;
};
