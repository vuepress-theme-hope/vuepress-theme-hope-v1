/*****************************************************************
 ** Author: Asvin Goel, goel@telematique.eu
 **
 ** A plugin for reveal.js allowing to easily integrate any content
 **
 ** Version: 1.0.1
 **
 ** License: MIT license (see LICENSE.md)
 **
 ******************************************************************/

import type Reveal from "reveal.js";

export interface AnythingConfig<T = unknown> {
  className: string;
  defaults?: T;
  initialize?: (container: HTMLElement, options: T) => void;
}

export type AnythingOptions = AnythingConfig[];

declare module "reveal.js" {
  interface RevealOptions {
    anything: AnythingOptions;
  }
}

const parseJSON = (str: string): Record<string, unknown> | null => {
  str = str.replace(/(\r\n|\n|\r|\t)/gm, ""); // remove line breaks and tabs
  let json;

  try {
    json = JSON.parse(str, (_key, value) => {
      if (value && typeof value === "string" && value.indexOf("function") === 0)
        // we can only pass a function as string in JSON ==> doing a real function
        //			        eval("var jsFunc = " + value);
        // eslint-disable-next-line
        return new Function(`return ${value}`)();

      return value as unknown;
    }) as Record<string, unknown>;
  } catch (err) {
    return null;
  }

  return json;
};

/*
 * Recursively merge properties of two objects without overwriting the first
 */
const mergeRecursive = <T>(obj1: T, obj2: T): T => {
  for (const key in obj2) {
    try {
      // Property in destination object set; update its value.
      if (
        obj1[key] !== null &&
        typeof obj1[key] === "object" &&
        typeof obj2[key] === "object"
      ) {
        obj1[key] = mergeRecursive(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    } catch (err) {
      // Property in destination object not set; create it and set its value.
      obj1[key] = obj2[key];
    }
  }

  return obj1;
};

const initAnything = (reveal: Reveal): void => {
  const config = reveal.getConfig().anything;

  if (config)
    reveal.addEventListener(
      "ready",
      () => {
        for (let i = 0; i < config.length; i++) {
          // Get all elements of the class
          const elements = document.getElementsByClassName(config[i].className);
          const { initialize } = config[i];

          if (initialize)
            for (let j = 0; j < elements.length; j++) {
              const options = config[i].defaults || {};
              const comments = elements[j].innerHTML
                .trim()
                .match(/<!--[\s\S]*?-->/g);

              if (comments !== null)
                for (let k = 0; k < comments.length; k++) {
                  const elementOptions = parseJSON(
                    comments[k].replace(/<!--/, "").replace(/-->/, "")
                  );

                  if (elementOptions) {
                    mergeRecursive(options, elementOptions);
                    break;
                  }
                }
              initialize(elements[j] as HTMLElement, options);
            }
        }
      },
      false
    );
};

export default {
  id: "RevealAnything",
  init: initAnything,
};
