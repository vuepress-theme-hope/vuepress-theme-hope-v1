import type VueRouter from "vue-router";

/**
 * Resolve a route with redirection
 */
export const resolveRouteWithRedirect = (
  router: VueRouter,
  ...args: Parameters<VueRouter["match"]>
): ReturnType<VueRouter["match"]> => {
  const route = router.match(...args);
  const lastMatched = route.matched[route.matched.length - 1];

  if (!lastMatched?.redirect) return route;

  const { redirect } = lastMatched;
  const resolvedRedirect =
    typeof redirect === "function" ? redirect(route) : redirect;
  const resolvedRedirectObj =
    typeof resolvedRedirect === "string"
      ? { path: resolvedRedirect }
      : resolvedRedirect;

  return resolveRouteWithRedirect(router, {
    hash: route.hash,
    query: route.query,
    params: route.params,
    ...resolvedRedirectObj,
  });
};
