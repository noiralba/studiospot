import { createElement, type ComponentType } from "react";
import type { ActionFunction, LoaderFunction } from "react-router";

interface PageModule {
  default: ComponentType;
  action?: ActionFunction;
  loader?: LoaderFunction;
}

const pages = import.meta.glob<PageModule>("./pages/**/*.tsx", { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const routePath = path
    .replace("./pages", "")
    .replace(/\.tsx$/, "")
    .replace(/\/index$/, "")
    .replace(/\$([^/]+)/g, ":$1")
    .toLowerCase();

  return {
    path: routePath,
    element: createElement(module.default),
    action: module.action,
    loader: module.loader,
  };
});

export default routes;
