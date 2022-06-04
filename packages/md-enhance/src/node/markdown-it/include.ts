import { existsSync, readFileSync } from "fs";
import { isAbsolute, resolve } from "upath";
import { NEWLINES_RE } from "./utils";

import type { PluginWithParams } from "markdown-it";
import type { RuleCore } from "markdown-it/lib/parser_core";
import type { IncludeOptions } from "../../types";

export interface ImportFileInfo {
  filePath: string;
  lineStart: number;
  lineEnd: number | undefined;
}

export interface IncludeInfo {
  cwd: string | null;
  includedFiles: string[];
}

// regexp to match the import syntax
const SYNTAX_RE = /^@include\(([^)]*?)(?:\{(\d+)?-(\d+)?\})?\)$/;

export const handleInclude = (
  { filePath, lineStart, lineEnd }: ImportFileInfo,
  { cwd, includedFiles }: IncludeInfo
): string => {
  let realPath = filePath;

  if (!isAbsolute(filePath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!cwd) {
      console.error(`Include: Error when resolving path: ${filePath}`);

      return "\nError when resolving path\n";
    }

    realPath = resolve(cwd, filePath);
  }

  includedFiles.push(realPath);

  // check file existence
  if (!existsSync(realPath)) {
    console.error(`Include: ${realPath} not found`);

    return "\nFile not found\n";
  }

  // read file content
  const fileContent = readFileSync(realPath).toString();

  // return content
  return fileContent
    .replace(NEWLINES_RE, "\n")
    .split("\n")
    .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
    .join("\n")
    .replace(/\n?$/, "\n");
};

export const resolveInclude = (
  content: string,
  options: Required<IncludeOptions>,
  { cwd, includedFiles }: IncludeInfo
): string =>
  content
    .split("\n")
    .map((line) => {
      if (line.startsWith("@include")) {
        // check if it’s matched the syntax
        const match = line.match(SYNTAX_RE);

        if (match) {
          const [, includePath, lineStart, lineEnd] = match;
          const actualPath = options.getPath(includePath);

          const content = handleInclude(
            {
              filePath: actualPath,
              lineStart: lineStart ? Number.parseInt(lineStart, 10) : 0,
              lineEnd: lineEnd ? Number.parseInt(lineEnd, 10) : undefined,
            },
            { cwd, includedFiles }
          );

          return options.deep && actualPath.endsWith(".md")
            ? resolveInclude(content, options, {
                cwd,
                includedFiles,
              })
            : content;
        }
      }

      return line;
    })
    .join("\n");

export const createIncludeCoreRule =
  (sourceDir: string, options: Required<IncludeOptions>): RuleCore =>
  (state): boolean => {
    const env = state.env as {
      /** Files included */
      includedFiles?: string[];
    };
    const includedFiles = env.includedFiles || (env.includedFiles = []);

    state.src = resolveInclude(state.src, options, {
      cwd: sourceDir,
      includedFiles,
    });

    return true;
  };

export const include: PluginWithParams = (
  md,
  sourceDir: string,
  {
    getPath = (path: string): string => path,
    deep = false,
  }: IncludeOptions = {}
): void => {
  // add md_import core rule
  md.core.ruler.after(
    "normalize",
    "md_import",
    createIncludeCoreRule(sourceDir, { getPath, deep })
  );
};
