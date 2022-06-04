import { chalk } from "vuepress-shared";
import { covertOptions } from "./compact";
import { checkOutput, ensureHostName, getFeedOptions } from "./options";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { logger } from "./utils";

import type { Plugin, PluginEntry } from "vuepress-typings";
import type { FeedOptions } from "../types";

export const feedPlugin: Plugin<FeedOptions> = (options, context) => {
  covertOptions(options as FeedOptions & Record<string, unknown>);

  const plugin: PluginEntry = {
    name: "vuepress-plugin-feed1",
  };

  if (!ensureHostName(options)) {
    logger.error(`Option ${chalk.magenta("hostname")} is required!`);

    return plugin;
  }

  if (!checkOutput(options)) {
    logger.info("No requested output, the plugin won’t start!");

    return plugin;
  }

  const feedOptions = getFeedOptions(context, options);

  return {
    ...plugin,

    ready: (): void => injectLinkstoHead(context, feedOptions),

    generated: async (): Promise<void> => {
      await new FeedGenerator(context, feedOptions).generateFeed();
    },
  };
};
