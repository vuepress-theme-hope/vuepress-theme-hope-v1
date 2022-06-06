import { deprecatedLogger, droppedLogger } from "./utils";
// import { logger } from "../utils";

import type { HopeThemePageFrontmatter } from "../../types";

const DEPRECATED_FRONTMATTER_OPTIONS: [string, string][] = [
  // ["authors", "author"],
  // ["categories", "category"],
  // ["tags", "tags"],
  // ["time", "date"],
  // ["visitor", "pageview"],
  // ["sidebarDepth", "headerDepth"],
  // ["copyrightText", "copyright"],
  ["anchorDisplay", "toc"],
  ["updateTime", "lastUpdated"],
  ["contributor", "contributors"],
  ["editLinks", "editLink"],
];

const DEPRECATED_HOME_FRONTMATTER_OPTIONS: [string, string][] = [
  // ["title", "heroText"],
  // ["darkHeroImage", "heroImageDark"],
  ["action", "actions"],
];

const DROPPED_FRONTMATTER_OPTIONS: [string, string][] = [
  // ["metaTitle", "Pleae use custom resolver to set metaTitle."],
  // ["mediaLink", "Social mediea links are no longer displayed in footer."],
  // ["password", "Simple password protection is no longer supported."],
  // ["search", "Search plugin no longer support this option."],
];

/**
 * @deprecated You should use V2 standard frontmatters and avoid using it
 */
export const covertFrontmatter = (
  frontmatter: Record<string, unknown>,
  filePathRelative = ""
): HopeThemePageFrontmatter & Record<string, unknown> => {
  DEPRECATED_FRONTMATTER_OPTIONS.forEach(([deprecatedOption, newOption]) =>
    deprecatedLogger({
      options: frontmatter,
      deprecatedOption,
      newOption,
      scope: `${filePathRelative || ""} frontmatter`,
    })
  );

  DROPPED_FRONTMATTER_OPTIONS.forEach((item) =>
    droppedLogger(
      frontmatter,
      ...item,
      `${filePathRelative ? `Found in ${filePathRelative}` : ""}`
    )
  );

  // check homepage
  if (frontmatter["home"] === true && !("layout" in frontmatter)) {
    DEPRECATED_HOME_FRONTMATTER_OPTIONS.forEach(
      ([deprecatedOption, newOption]) =>
        deprecatedLogger({
          options: frontmatter,
          deprecatedOption,
          newOption,
          scope: `${filePathRelative || ""} frontmatter`,
        })
    );
  }

  return frontmatter;
};
