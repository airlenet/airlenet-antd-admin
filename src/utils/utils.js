import { parse } from "querystring";
// import pathRegexp from 'path-to-regexp';

export const getPageQuery = () => parse(window.location.href.split("?")[1]);
