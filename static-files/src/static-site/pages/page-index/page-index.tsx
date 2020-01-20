/*
name: Page Index
path: /
*/
//TODO: Get rid of all "any" types

import * as React from "react";
import importedPages from "../../pages";

interface Page {
  component: () => JSX.Element;
  group: string;
  name: string;
  path: string;
}
interface Group {
  name: string;
  pages: Array<Page>;
}

const PageIndex = () => {
  const pages: Array<Page> = importedPages;
  const groups: Array<Group> = pages.reduce((accumulator: any, page: Page) => {
    const group = accumulator[page.group] || [];
    return { ...accumulator, [page.group]: group.concat(page) };
  }, {});

  const pageGroups: Array<Group> = Object.entries(groups)
    .map(([groupName, pages]: any) => ({
      name: groupName,
      pages: pages.sort((a: Page, b: Page) => a.name.localeCompare(b.name))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap"
      }}
    >
      {pageGroups.map(group => (
        <div key={"test"} style={{ width: 300 }}>
          <p style={{ margin: 0 }}>{group.name}</p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginBottom: 40,
              marginTop: 10
            }}
          >
            {group.pages.map(page => (
              <li key={page.path}>
                <a href={page.path} style={{ color: "black" }}>
                  {page.name || page.path}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PageIndex;
