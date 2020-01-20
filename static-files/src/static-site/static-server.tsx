import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "./App";
import { Routes } from "./routes";

export default (input: any): string => {
  const { isProduction, path, webpackStats } = input;
  const files = Object.keys(webpackStats.compilation.assets);
  const css = files.filter(value => value.match(/\.css$/));
  const js = files
    .filter(value => value.match(/\.js$/))
    .sort()
    .reverse();
  const context = {};

  return `<!doctype html>${ReactDOMServer.renderToString(
    <App
      title={"Local dev server"}
      css={css}
      js={js}
      shouldIncludeWebpackDevServerJs={!isProduction}
    >
      <StaticRouter context={context} location={path}>
        <Routes />
      </StaticRouter>
    </App>
  )}`;
};
