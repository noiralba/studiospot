import { createElement, type ComponentType } from "react";

interface PageModule {
  default: ComponentType;
  action?: any;
  loader?: any;
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
    action: module.action ? module.action : undefined,
    loader: module.loader ? module.loader : undefined,
  };
});

export default routes;
