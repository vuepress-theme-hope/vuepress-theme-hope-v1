import { getLocales } from "vuepress-shared";
import { black, blue } from "chalk";
import { resolve } from "path";

import { covertOptions } from "./compact";
import { getManifest, generateManifest } from "./generateManifest";
import { generateServiceWorker } from "./generateServiceWorker";
import { appendBase } from "./helper";
import { injectLinkstoHead } from "./injectHead";
import { pwaLocales } from "./locales";

import type { Plugin, PluginEntry } from "@mr-hope/vuepress-types";
import type { PWAOptions } from "../types";

export const pwaPlugin: Plugin<PWAOptions> = (options, context) => {
  covertOptions(options as PWAOptions & Record<string, unknown>);
  const { base } = context;
  const { shouldPrefetch = true } = context.siteConfig;

  const PLUGIN_NAME = "@mr-hope/vuepress-plugin-pwa";

  if (options.appendBase) appendBase(base, options);

  if (shouldPrefetch === true)
    console.log(
      blue("PWA:"),
      black.bgYellow("warn"),
      'The plugin will register service worker to handle assets, so we recommend you to set "shouldPrefetch: false" in VuePress config file.'
    );

  const manifest = getManifest(context, options);

  context.siteConfig.head = injectLinkstoHead(
    options,
    base,
    context.siteConfig.head
  );

  const config: PluginEntry = {
    name: PLUGIN_NAME,

    define: () => ({
      PWA_LOCALES: getLocales({
        context,
        name: PLUGIN_NAME,
        config: options.locales,
        default: pwaLocales,
      }),
      SW_FORCE_UPDATE: options.update === "force",
      SW_PATH: options.swPath || "service-worker.js",
    }),

    beforeDevServer(app) {
      app.get(`${base || "/"}manifest.webmanifest`, (_req, res) => {
        manifest
          .then((manifest) => {
            res.send(manifest);
          })
          .catch(() =>
            res.status(500).send("Unexpected manifest generate error")
          );
      });
    },

    generated: async (): Promise<void> => {
      await generateManifest(context, manifest);
      await generateServiceWorker(context, options);
    },

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    globalUIComponents: [],
  };

  if (options.showInstall !== false)
    (config.globalUIComponents as string[]).push("PWAInstall");

  if (options.update !== "disable" && options.update !== "force")
    (config.globalUIComponents as string[]).push(
      options.updateComponent || "SWUpdatePopup"
    );

  if (options.update === "hint")
    (config.globalUIComponents as string[]).push(
      options.hintComponent || "SWHintPopup"
    );

  return config;
};
