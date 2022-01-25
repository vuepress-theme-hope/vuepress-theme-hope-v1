import MarkdownIt = require("markdown-it");
import { lazyLoad } from "../../src/node/markdown-it/lazy-load";

describe("decode-url", () => {
  it("Should resolve all", () => {
    const markdownIt = MarkdownIt({ linkify: true }).use(lazyLoad);

    expect(markdownIt.render("![image.png](example/image.png)")).toEqual(
      '<p><img src="example/image.png" alt="image.png" loading="lazy"></p>\n'
    );
  });
});
