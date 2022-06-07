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

export const isLinkHttp = (link: string): boolean =>
  /^(https?:)?\/\//.test(link);

/** Judge whether a path is external */
export const isLinkExternal = (path: string): boolean =>
  /^[a-z]+:/iu.test(path);

/** Judge whether a path is `mailto:` link */
export const isLinkMailto = (path: string): boolean =>
  path.startsWith("mailto:");

/** Judge whether a path is `tel:` link */
export const isLinkTel = (path: string): boolean => path.startsWith("tel:");

export const ensureEndingSlash = (str: string): string =>
  str.replace(/\/?$/, "/");

export const ensureLeadingSlash = (str: string): string =>
  str.replace(/^\/?/, "/");

export const removeEndingSlash = (str: string): string =>
  str.replace(/\/$/, "");

export const removeLeadingSlash = (str: string): string =>
  str.replace(/^\//, "");
