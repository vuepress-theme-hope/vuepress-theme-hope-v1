import { getLocales } from "@mr-hope/vuepress-shared";
import { codeDemoRender } from "./markdown-it/code-demo";
import { markdownEnhanceLocales } from "./locales";

import type { Context, PluginConfig } from "@mr-hope/vuepress-types";
import type { MarkdownContainerName, MarkdownEnhanceOptions } from "../types";

export const pluginConfig = (
  markdownOptions: MarkdownEnhanceOptions,
  context: Context
): PluginConfig[] => {
  const containers: MarkdownContainerName[] = [
    "info",
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

  const config: PluginConfig[] = [
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
    ],
  ];

  if (markdownOptions.align || markdownOptions.enableAll)
    config.push(
      ["container", { type: "left", defaultTitle: "" }],
      ["container", { type: "center", defaultTitle: "" }],
      ["container", { type: "right", defaultTitle: "" }],
      ["container", { type: "justify", defaultTitle: "" }]
    );

  if (markdownOptions.demo || markdownOptions.enableAll)
    config.push(["container", { type: "demo", render: codeDemoRender }]);

  return config;
};
