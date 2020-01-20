import * as React from "react";

interface IProps {
  children: React.ReactNode | Array<React.ReactNode>;
  css: Array<string>;
  js: Array<string>;
  shouldIncludeWebpackDevServerJs: boolean;
  title: string;
}

export class App extends React.Component<IProps> {
  static defaultProps = {
    css: [],
    js: []
  };

  render() {
    const {
      children,
      css,
      js,
      shouldIncludeWebpackDevServerJs,
      title
    } = this.props;
    return (
      <html>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossOrigin="anonymous"
        ></link>
        <head>
          {css.map((file, index) => (
            <link key={index} rel="stylesheet" href={`/${file}`} />
          ))}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {shouldIncludeWebpackDevServerJs && (
            <script src="/webpack-dev-server.js" />
          )}
          <title>{title}</title>
        </head>
        <body>
          <div id="mount-point">{children}</div>
          {js.map((file, index) => (
            <script key={index} src={`/${file}`} />
          ))}
        </body>
      </html>
    );
  }
}
