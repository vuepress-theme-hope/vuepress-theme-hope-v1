import chalk from "chalk";
import { covertOptions } from "./compact";
import { injectLinkstoHead } from "./injectHead";
import { FeedGenerator } from "./generator";
import { checkOutput, ensureHostName, getFeedOptions } from "./options";
import { error, info } from "./utils";

import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { FeedOptions } from "../types";

export const feedPlugin: Plugin<FeedOptions> = (options, context) => {
  const plugin: PluginOptionAPI = {
    name: "vuepress-plugin-feed2",
  };

  covertOptions(options as FeedOptions & Record<string, unknown>);

  if (!ensureHostName(options)) {
    error(`Option ${chalk.magenta("hostname")} is required!`);

    return plugin;
  }

  if (!checkOutput(options)) {
    info("No requested output, the plugin won’t start!");

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
