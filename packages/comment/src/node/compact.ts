import type { WalineOptions } from "../types";

/** @deprecated */
export const covertWalineOptions = (
  options: WalineOptions & Record<string, unknown>
): void => {
  if (options.type === "waline") {
    [
      // valine
      ["emojiCDN", "emoji"],
      ["emojiMaps", "emoji"],
      ["requiredFields", "requiredMeta"],
      ["visitor", "pageview"],
      ["langMode", "locale"],
      ["placeholder", "locale.placeholder"],

      // waline v1
      ["highlight", "highlighter"],
      ["uploadImage", "imageUploader"],
      ["previewMath", "texRenderer"],
      ["anonymous", "login"],
      ["copyRight", "copyright"],
    ].forEach(([oldOptions, newOptions]) => {
      if (oldOptions in options) {
        console.warn(
          `"${oldOptions}" is deprecated in @waline/client@v2, you should use "${newOptions}" instead.`
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete options[oldOptions];
      }
    });

    [
      // valine
      "region",
      "appId",
      "appKey",
      "notify",
      "verify",
      "avatar",
      "avatarForce",
      "enableQQ",
      "recordIP",
      "serverURLs",

      // waline v1
      "avatarCDN",
      "mathTagSupport",
    ].forEach((option) => {
      if (option in options) {
        console.warn(
          `"${option}" is no longer supported in @waline/client@v2.`
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete options[option];
      }
    });
  }
};
