import { parse } from "querystring";
// import pathRegexp from 'path-to-regexp';

export const getPageQuery = () => parse(window.location.href.split("?")[1]);
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export const isBrowser = () =>
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  !isNode;
