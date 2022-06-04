import { describe, it, expect } from "vitest";
import { resolve } from "upath";
import MarkdownIt from "markdown-it";
import MarkdownContainer from "markdown-it-container";
import { include } from "../../src/node/markdown-it/include";

import type { PluginWithOptions } from "markdown-it";

const container = MarkdownContainer as PluginWithOptions;

interface IncludeEnv {
  includedFiles?: string[];
}

const mdFixturePathRelative = "./include.md";
const cwd = resolve(__dirname, "__fixtures__");
const mdFixturePath = resolve(cwd, mdFixturePathRelative);
const mdFixtureDeepIncludeRelative = "./deepInclude.md";
const mdFixtureDeepIncludePath = resolve(cwd, mdFixtureDeepIncludeRelative);

const md = MarkdownIt().use(include, cwd).use(container, "tip");

describe("include", () => {
  it("should not be parsed as import markdown syntax", () => {
    const source = [
      "@inc",
      "@include(",
      "@include",
      "@include(./foo.js",
      "@include(/path/to/foo.js",
      "@inlude(/path/to/foo.js)",
      "@include(./foo.md",
      "@include(/path/to/foo.md",
      "@include(/path/to/foo.md",
      "@include(./foo.js",
    ];

    const env: IncludeEnv = {};
    const rendered = md.render(source.join("\n\n"), env);

    expect(rendered).toEqual(
      source.map((item) => `<p>${item}</p>`).join("\n") + "\n"
    );
    expect(env.includedFiles).toEqual([]);
  });

  describe("lines range", () => {
    it("should import all lines", () => {
      const source = `\
@include(${mdFixturePathRelative})
`;

      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath]);
    });

    it("should import partial lines", () => {
      const source = `\
@include(${mdFixturePathRelative}{5-9})
@include(${mdFixturePathRelative}{-9})
`;

      const expected = `\
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath, mdFixturePath]);
    });
  });

  describe("path resolving", () => {
    it("should resolve relative path according to filePath", () => {
      const source = `\
@include(/foo.md)
@include(./bar.md)
`;
      const expected = `\
<p>File not found</p>
<p>File not found</p>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/foo.md", resolve(cwd, "./bar.md")]);
    });

    it("should resolve absolute path ", () => {
      const source = `\
@include(/foo.md)
@include(${mdFixturePath})
`;
      const expected = `\
<p>File not found</p>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/foo.md", mdFixturePath]);
    });

    it("should handle import path correctly", () => {
      const source = `\
@include(@fixtures/include.md)
`;
      const expected = `\
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const mdWithOptions = MarkdownIt()
        .use(include, cwd, {
          getPath: (str: string): string =>
            str.replace(/^@fixtures/, resolve(__dirname, "./__fixtures__")),
        })
        .use(container, "tip");
      const env: IncludeEnv = {};
      const rendered = mdWithOptions.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual([mdFixturePath]);
    });
  });

  describe("compatibility with other markdown syntax", () => {
    it("should terminate paragraph", () => {
      const source = `\
foo
@include(/path/to/foo.md)
`;
      const expected = `\
<p>foo</p>
<p>File not found</p>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/path/to/foo.md"]);
    });

    it("should terminate blockquote", () => {
      const source = `\
> foo
@include(/path/to/foo.md)
`;
      const expected = `\
<blockquote>
<p>foo</p>
</blockquote>
<p>File not found</p>
`;

      const env: IncludeEnv = {};
      const rendered = md.render(source, env);

      expect(rendered).toEqual(expected);
      expect(env.includedFiles).toEqual(["/path/to/foo.md"]);
    });

    it("should support deep import", () => {
      const source1 = `\
@include(${mdFixtureDeepIncludeRelative})
`;
      const expected1 = `\
<h3>Heading 3</h3>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const source2 = `\
@include(${mdFixtureDeepIncludePath})
`;
      const expected2 = `\
<h3>Heading 3</h3>
<h2>Heading 2</h2>
<p>Contents containing bolded text and some markdown enhance features:</p>
<div class="tip">
<p>Hey how are <strong>you</strong>? :smile:</p>
</div>
`;

      const mdWithOptions = MarkdownIt()
        .use(include, cwd, { deep: true })
        .use(container, "tip");
      const env1: IncludeEnv = {};
      const env2: IncludeEnv = {};

      expect(mdWithOptions.render(source1, env1)).toEqual(expected1);
      expect(env1.includedFiles).toEqual([
        mdFixtureDeepIncludePath,
        mdFixturePath,
      ]);
      expect(mdWithOptions.render(source2, env2)).toEqual(expected2);
      expect(env2.includedFiles).toEqual([
        mdFixtureDeepIncludePath,
        mdFixturePath,
      ]);
    });
  });
});
