import { createElement } from "react";

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const mod = module as { default: React.ComponentType; };
  
  return {
    path: path,
    element: createElement(mod.default),
  };
});

console.log(routes);


export default routes;