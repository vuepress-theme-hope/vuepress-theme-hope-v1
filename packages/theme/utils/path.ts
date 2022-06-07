import {
  isLinkExternal,
  normalizePath,
  resolveRouteWithRedirect,
} from "vuepress-shared/lib/client";

import type VueRouter from "vue-router";

/**
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getLink = (router: VueRouter, item: string): string => {
  const { fullPath, name } = resolveRouteWithRedirect(router, encodeURI(item));

  return name === "404" ? item : fullPath;
};

export const hashRE = /#.*$/u;
export const endingSlashRE = /\/$/u;
export const outboundRE = /^[a-z]+:/iu;

export const ensureExt = (path: string): string => {
  // do not resolve external links
  if (isLinkExternal(path)) return path;

  const hashMatch = hashRE.exec(path);
  const hash = hashMatch ? hashMatch[0] : "";
  const normalized = normalizePath(path);

  // do not resolve links ending with `/`
  if (normalized.endsWith("/")) return path;

  // add `.html` ext
  return `${normalized}.html${hash}`;
};

/**
 * @param path links being resolved
 * @param base deploy base
 * @param append whether append directly
 */
export const resolvePath = (
  path: string,
  base: string,
  append?: boolean
): string => {
  // do not resolve external links
  if (isLinkExternal(path)) return path;

  const firstChar = path.charAt(0);

  // do not resolve absolute links
  if (firstChar === "/") return path;

  // if link is hash or query string, add with base
  if (firstChar === "?" || firstChar === "#") return `${base}${path}`;

  // base links stack
  const stack = base.split("/");

  /*
   * remove trailing segment if:
   * - not appending
   * - appending to trailing slash (last segment is empty)
   */
  if (!append || !stack[stack.length - 1]) stack.pop();

  // resolve relative path
  const segments = path.replace(/^\//u, "").split("/");

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment === "..") stack.pop();
    else if (segment !== ".") stack.push(segment);
  }

  // ensure leading slash
  if (stack[0] !== "") stack.unshift("");

  return stack.join("/");
};
