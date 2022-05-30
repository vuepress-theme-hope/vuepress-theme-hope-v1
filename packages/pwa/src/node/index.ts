import { resolve } from "path";
import { getLocales } from "@mr-hope/vuepress-shared";
import { appendBase } from "./helper";
import { injectLinkstoHead } from "./injectHead";
import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";
import { pwaLocales } from "./locales";

import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { PWAOptions } from "../types";

const pwaPlugin: Plugin<PWAOptions> = (options, context) => {
  const { base } = context;

  if (options.appendBase) appendBase(base, options);

  const config: PluginOptionAPI = {
    name: "pwa",

    define: (): Record<string, unknown> => ({
      PWA_LOCALES: getLocales(context, pwaLocales, options.locales),
      SW_BASE_URL: base || "/",
    }),

    globalUIComponents: [options.popupComponent || "SWUpdatePopup"],

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    beforeDevServer(app) {
      app.get(`${base || "/"}manifest.webmanifest`, (_req, res) => {
        getManifest(options, context)
          .then((manifest) => {
            res.send(manifest);
          })
          .catch(() =>
            res.status(500).send("Unexpected manifest generate error")
          );
      });
    },

    ready(): void {
      context.siteConfig.head = injectLinkstoHead(
        options,
        base,
        context.siteConfig.head
      );
    },

    async generated(): Promise<void> {
      await genManifest(options, context);
      await genServiceWorker(options, context);
    },
  };

  if (options.showInstall !== false)
    (config.globalUIComponents as string[]).push("PWAInstall");

  return config;
};

export = pwaPlugin;
