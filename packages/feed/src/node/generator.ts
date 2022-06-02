import { cyan } from "chalk";
import { ensureDir, outputFile } from "fs-extra";
import { dirname, resolve } from "path";

import { Feed } from "./feed";
import { getFeedChannelOption, getFilename, getFeedLinks } from "./options";
import { FeedPage } from "./page";
import { compareDate, success } from "./utils";

import type { Context, Page } from "@mr-hope/vuepress-types";
import type { ResolvedFeedOptionsMap } from "./options";

export class FeedGenerator {
  /** feed 生成器 */
  feedMap: Record<string, Feed>;

  constructor(
    private context: Context,
    private options: ResolvedFeedOptionsMap
  ) {
    this.feedMap = Object.fromEntries(
      Object.entries(options).map(([localePath, localeOptions]) => {
        return [
          localePath,
          new Feed({
            channel: getFeedChannelOption(context, localeOptions, localePath),
            links: getFeedLinks(context, localeOptions),
          }),
        ];
      })
    );
  }

  addPages(localePath: string): void {
    const feed = this.feedMap[localePath];
    const localeOption = this.options[localePath];
    const {
      count: feedCount = 100,
      filter = ({ frontmatter, _filePath }: Page): boolean =>
        !(
          frontmatter["home"] ||
          !_filePath ||
          frontmatter["article"] === false ||
          frontmatter["feed"] === false
        ),
      sorter = (pageA: Page, pageB: Page): number =>
        compareDate(
          pageA.createTimeStamp
            ? new Date(pageA.createTimeStamp)
            : pageA.frontmatter.time,
          pageB.createTimeStamp
            ? new Date(pageB.createTimeStamp)
            : pageB.frontmatter.time
        ),
    } = localeOption;

    const pages = this.context.pages
      .filter((page) => page._localePath === localePath)
      .filter(filter)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .sort(sorter)
      .slice(0, feedCount);

    let count = 0;

    for (const page of pages) {
      const item = new FeedPage(
        this.context,
        localeOption,
        page,
        feed
      ).getFeedItem();

      if (item) {
        feed.addItem(item);
        count += 1;
      }
    }

    success(
      `added ${cyan(`${count} page(s)`)} as feed item(s) in route ${cyan(
        localePath
      )}`
    );
  }

  async generateFeed(): Promise<void> {
    const { outDir } = this.context;

    await Promise.all(
      Object.entries(this.options).map(async ([localePath, localeOptions]) => {
        // current locale has valid output
        if (localeOptions.atom || localeOptions.json || localeOptions.rss) {
          const feed = this.feedMap[localePath];
          const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
            getFilename(localeOptions, localePath);

          this.addPages(localePath);

          // generate atom files
          if (localeOptions.atom) {
            const filePath = resolve(outDir, atomOutputFilename);

            await ensureDir(dirname(filePath));
            await outputFile(filePath, feed.atom());

            success(
              `Atom feed file generated and saved to ${cyan(
                atomOutputFilename
              )}`
            );
          }

          // generate json files
          if (localeOptions.json) {
            const filePath = resolve(outDir, jsonOutputFilename);

            await ensureDir(dirname(filePath));
            await outputFile(filePath, feed.json());

            success(
              `JSON feed file generated and saved to ${cyan(
                jsonOutputFilename
              )}`
            );
          }

          // generate rss files
          if (localeOptions.rss) {
            const filePath = resolve(outDir, rssOutputFilename);

            await ensureDir(dirname(filePath));
            await outputFile(filePath, feed.rss());

            success(
              `RSS feed file generated and saved to ${cyan(rssOutputFilename)}`
            );
          }
        }
      })
    );
  }
}
