import type { Plugin } from "vuepress-typings";
import type { ChunkRenameOptions } from "../types";

export const chunkRenamePlugin: Plugin<ChunkRenameOptions> = (
  {
    pageChunkName = ({ title = "", key }): string => {
      const chunkTitle = (title || "").replace(/[.&*?#\\/:"<>| ]/gu, "");

      return chunkTitle ? `page-${chunkTitle}` : `page-${key.slice(1)}`;
    },
    layoutChunkName = (layout): string => `layout-${layout.componentName}`,
  },
  context
) => {
  // override internal plugins
  const plugins: Plugin[] = [];

  if (pageChunkName) {
    plugins.push({
      name: "@vuepress/internal-page-components",

      extendPageData(page) {
        page._chunkName = pageChunkName(page);
      },

      clientDynamicModules() {
        const content = `export default {\n${context.pages
          .filter(({ _filePath }) => _filePath)
          .map((page) => {
            const key = JSON.stringify(page.key);
            const filePath = JSON.stringify(page._filePath);
            const comment = page._chunkName
              ? `/* webpackChunkName: ${JSON.stringify(page._chunkName)} */`
              : "";

            return `  ${key}: () => import(${comment}${filePath})`;
          })
          .join(",\n")} \n}`;

        return {
          dirname: "internal",
          name: "page-components.js",
          content,
        };
      },
    });
  }

  if (layoutChunkName) {
    const { layoutComponentMap } = context.themeAPI;

    for (const key in layoutComponentMap) {
      const component = layoutComponentMap[key];

      component._chunkName = layoutChunkName(component);
    }

    plugins.push({
      name: "@vuepress/internal-layout-components",

      clientDynamicModules() {
        const { layoutComponentMap } = context.themeAPI;

        const content = `export default {\n${Object.keys(layoutComponentMap)
          .map((name) => {
            const component = layoutComponentMap[name];
            const key = JSON.stringify(name);
            const filePath = JSON.stringify(component.path);
            const comment = component._chunkName
              ? `/* webpackChunkName: ${JSON.stringify(
                  component._chunkName
                )} */`
              : "";

            return `  ${key}: () => import(${comment}${filePath})`;
          })
          .join(",\n")} \n}`;

        return {
          dirname: "internal",
          name: "layout-components.js",
          content,
        };
      },
    });
  }

  return {
    name: "chunk-rename",

    plugins,
  };
};
