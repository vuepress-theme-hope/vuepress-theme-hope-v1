import { resolve } from "path";
import { getLocales } from "@mr-hope/vuepress-shared";
import { injectLinkstoHead } from "./injectHead";
import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";
import { pwaLocales } from "./locales";

import type { Plugin, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { PWAOptions } from "../types";

const pwaPlugin: Plugin<PWAOptions> = (options, context) => {
  const { base, themeConfig } = context;
  const pwaOptions =
    Object.keys(options).length > 0 ? options : themeConfig.pwa || {};

  const config: PluginOptionAPI = {
    name: "pwa",

    define: (): Record<string, unknown> => ({
      PWA_LOCALES: getLocales(context, pwaLocales, pwaOptions.locales),
      SW_BASE_URL: base || "/",
    }),

    globalUIComponents: [pwaOptions.popupComponent || "SWUpdatePopup"],

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    beforeDevServer(app) {
      app.get(`${base || "/"}manifest.webmanifest`, (_req, res) => {
        getManifest(pwaOptions, context)
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
        pwaOptions,
        base,
        context.siteConfig.head
      );
    },

    async generated(): Promise<void> {
      await genManifest(pwaOptions, context);
      await genServiceWorker(pwaOptions, context);
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (pwaOptions.showInstall !== false)
    (config.globalUIComponents as string[]).push("PWAInstall");

  return config;
};

export = pwaPlugin;
