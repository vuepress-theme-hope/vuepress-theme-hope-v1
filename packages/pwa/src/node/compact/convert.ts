import { deprecatedLogger } from "./utils";
import type { PWAOptions } from "../../types";

/** @deprecated */
export const covertOptions = (
  options: PWAOptions & Record<string, unknown>
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "cacheMaxSize",
    newOption: "maxSize",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "popupComponent",
    newOption: "updateComponent",
  });
};
