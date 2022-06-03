import { dayjs } from "./dayjs";

import type { Context, Lang, Locales, Page } from "vuepress-typings";
import type { Author, AuthorInfo, SeoOptions } from "../types";

/**
 * check if string is a valid url
 */
export const isUrl = (test: string): boolean => {
  if (typeof test !== "string" || test === "") return false;

  // url Math
  const result = /^(?:\w+:)?\/\/(\S+)$/u.exec(test);

  if (!result) return false;

  const address = result[1];

  if (!address) return false;

  return (
    // address with localhost
    /^localhost[:?\d]*(?:[^:?\d]\S*)?$/u.test(address) ||
    // address without localhost
    /^[^\s.]+\.\S{2,}$/u.test(address)
  );
};

export const isAbsoluteUrl = (test: string): boolean => test.startsWith("/");

export const getLocales = (lang: string, locales: Locales): Lang[] =>
  Object.entries(locales)
    .map(([, value]) => value.lang)
    .filter((item): item is Lang => typeof item === "string" && item !== lang);

export interface DateOptions {
  /**
   * @default 'en'
   */
  lang?: string;
  timezone?: string;
  /**
   * @default 'full'
   */
  type?: "date" | "time" | "full";
}

export interface DateDetail {
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
  hour?: number | undefined;
  minute?: number | undefined;
  second?: number | undefined;
}

export interface DateInfo {
  display: string;
  value: Date | undefined;
  detail: DateDetail;
}

const getLang = (lang = "en"): string => {
  const langcode = lang.toLowerCase();

  if (langcode === "zh" || langcode === "zh-cn") return "zh";

  if (langcode === "en-us" || langcode === "en-uk" || langcode === "en")
    return "en";

  console.warn(`${lang} locale missing in config`);

  return "en";
};

export const timeTransformer = (
  date: Date,
  options: DateOptions = {}
): string => {
  const { lang, timezone, type } = options;

  dayjs.locale(getLang(lang));

  const dateText = timezone
    ? dayjs(date).tz(timezone).format("LL")
    : dayjs(date).format("LL");

  const timeText = timezone
    ? dayjs(date).tz(timezone).format("HH:mm")
    : dayjs(date).format("HH:mm");

  return type === "date"
    ? dateText
    : type === "time"
    ? timeText
    : `${dateText} ${timeText}`;
};

export const getAuthor = (
  author: Author | false | undefined,
  canDisable = false
): AuthorInfo[] => {
  if (author) {
    if (Array.isArray(author)) {
      return author.map((item) =>
        typeof item === "string" ? { name: item } : item
      );
    }

    if (typeof author === "string") return [{ name: author }];

    if (typeof author === "object" && author.name) return [author];

    console.error(
      `Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${
        canDisable ? "" : "| false"
      } | undefined\`, but got`,
      author
    );

    return [];
  }

  return [];
};

export const getDate = (
  date: string | Date | undefined,
  options: DateOptions = {}
): DateInfo | null => {
  const { timezone } = options;

  if (date) {
    const time = dayjs(date instanceof Date ? date : date.trim());

    if (time.isValid()) {
      const currentTime = timezone ? dayjs(date).tz(timezone) : dayjs(date);
      const year = currentTime.year();
      const month = currentTime.month() + 1;
      const day = currentTime.date();
      const hour = currentTime.hour();
      const minute = currentTime.minute();
      const second = currentTime.second();
      const millisecond = currentTime.millisecond();
      const isDate =
        hour === 0 && minute === 0 && second === 0 && millisecond === 0;
      const value = currentTime.toDate();

      return {
        display: timeTransformer(value, {
          type: isDate ? "date" : "full",
          ...options,
        }),
        value,
        detail: {
          year,
          month,
          day,
          ...(isDate ? {} : { hour, minute, second }),
        },
      };
    }

    const timeRegPattern =
      /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u;
    const result = timeRegPattern.exec((date as string).trim());

    if (result) {
      const [, year, month, day, hour, minute, second] = result;

      const getNumber = (a: string | undefined): number | undefined =>
        typeof a === "undefined" ? undefined : Number(a);

      const getYear = (yearNumber: number | undefined): number | undefined =>
        yearNumber && yearNumber < 100 ? yearNumber + 2000 : yearNumber;

      const getSecond = (
        secondNumber: number | undefined
      ): number | undefined => (hour && minute && !second ? 0 : secondNumber);

      const detail = {
        year: getYear(getNumber(year)),
        month: getNumber(month),
        day: getNumber(day),
        hour: getNumber(hour),
        minute: getNumber(minute),
        second: getSecond(getNumber(second)),
      };

      const isTime =
        year === undefined && month === undefined && day === undefined;
      const isDate =
        hour === undefined && minute === undefined && second === undefined;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = dayjs({ ...detail, month: detail.month - 1 }).toDate();

      return {
        display: timeTransformer(value, {
          type: isDate ? "date" : isTime ? "time" : "full",
          ...options,
        }),
        value: isTime ? undefined : value,
        detail: isDate
          ? { year: detail.year, month: detail.month, day: detail.day }
          : isTime
          ? { hour: detail.hour, minute: detail.minute, second: detail.second }
          : detail,
      };
    }
  }

  return null;
};

export const getCover = (
  page: Page,
  { hostname }: SeoOptions,
  { base }: Context
): string | null => {
  const banner = page.frontmatter["banner"] as string | undefined;
  const cover = page.frontmatter["cover"] as string | undefined;

  if (banner) {
    if (isAbsoluteUrl(banner)) return resolveUrl(hostname, base, banner);

    if (isUrl(banner)) return banner;
  }

  if (cover) {
    if (isAbsoluteUrl(cover)) return resolveUrl(hostname, base, cover);

    if (isUrl(cover)) return cover;
  }

  return null;
};

export const getImages = (
  page: Page,
  options: SeoOptions,
  { base }: Context
): string[] => {
  const result = /!\[.*?\]\((.*?)\)/giu.exec(page._content);

  if (result) {
    return result
      .map(([, link]) => {
        if (isAbsoluteUrl(link))
          return resolveUrl(options.hostname, base, link);

        if (isUrl(link)) return link;

        return null;
      })
      .filter((item): item is string => item !== null);
  }

  return [];
};

export const resolveUrl = (
  hostname: string,
  base: string,
  url: string
): string =>
  `${hostname.match(/https?:\/\//) ? "" : "https://"}${hostname.replace(
    /\/$/,
    ""
  )}${base}${url.replace(/^\//, "")}`;

export const stripTags = (content = ""): string =>
  content
    // remove html tags
    .replace(/<\/?.+?\/?>/g, "");

export const md2text = (content?: string): string =>
  content
    ? stripTags(content)
        // remove img
        .replace(/!\[(.*?)\]\(.*?\)/gm, "")
        // remove code blocks
        .replace(/```([\s\S]*?)```/g, "")
        // remove custom container end
        .replace(/^\s*:::\s*$/gm, "")
        // remove custom container start
        .replace(/^\s*:::\s*(.+?)(?:\s+(.*))?$/gm, "$2")
        // remove heading1
        .replace(/^# (.*)$/gm, "$1")
        // convert other headings to text
        .replace(/^#{1,6} (.*)$/gm, "$1")
        // convert unordered lists to text with comma
        .replace(/^\s*[-*+] (.*)$/gm, "$1; ")
        // convert blockquotes with quotes
        .replace(/^\s*>+(.*)$/gm, '"$1"')
        // convert links to text
        .replace(/(^|[^\\])\[(.*?)\]\(.*?\)/gm, "$1$2")
        // convert inline code
        .replace(/`{1,2}([^`])(.*?)`{1,2}/g, "$1$2")
        // just remove delete lines
        .replace(/~~(.*?)~~/g, "")
        // remove bold or italic
        .replace(/(^|[^\\])([*|_]{1,2})(.*?)([^\\])\2/gm, "$1$3$4")
        // remove html tags
        .replace(/<\/?.+?\/?>/g, "")
        // trim lines
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        // covert link breaks into spaces
        .replace(/(?:\r?\n)+/g, " ")
        // covert 2 or more spaces into 1
        .replace(/ +/g, " ")
        // trim
        .trim()
    : "";
