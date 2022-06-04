import { getLocales } from "vuepress-shared";
import { markdownEnhanceLocales } from "./locales";

import type { Context, PluginConfig } from "vuepress-typings";
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

  const locales = getLocales({
    context,
    name: "vuepress-plugin-md-enhance",
    config: markdownOptions.locales,
    default: markdownEnhanceLocales,
  });

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

  return config;
};
