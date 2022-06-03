import type { Page } from "vuepress-typings";
import type { ArticleSeoContent, SeoContent } from "../types";

type Meta = Record<string, string>[];

interface MetaOptions {
  name: string;
  content: string;
  attribute?: string;
}

const appendMeta = (
  meta: Meta,
  {
    name,
    content,
    attribute = ["article:", "og:"].some((type) => name.startsWith(type))
      ? "property"
      : "name",
  }: MetaOptions
): void => {
  if (content) meta.push({ [attribute]: name, content });
};

export const addOGP = (meta: Meta, content: SeoContent): void => {
  for (const property in content)
    switch (property) {
      case "article:tag":
        (content as ArticleSeoContent)["article:tag"]!.forEach((tag: string) =>
          appendMeta(meta, { name: "article:tag", content: tag })
        );
        break;
      case "og:locale:alternate":
        content["og:locale:alternate"].forEach((locale: string) => {
          if (locale !== content["og:locale"])
            appendMeta(meta, {
              name: "og:locale:alternate",
              content: locale,
            });
        });
        break;
      default:
        if (content[property as keyof SeoContent] as string)
          appendMeta(meta, {
            name: property,
            content: content[property as keyof SeoContent] as string,
          });
    }
};

export const appendCanonical = (page: Page, url?: string | null): void => {
  if (url) page.frontmatter.canonicalUrl = url;
};
