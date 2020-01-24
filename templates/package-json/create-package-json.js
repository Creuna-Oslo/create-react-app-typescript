/* eslint-env node */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

module.exports = function({ authorEmail, authorName, projectName }) {
  const content = fs.readFileSync(path.join(__dirname, "package.json"), {
    encoding: "utf-8"
  });

  return content
    .replace("$projectName", projectName)
    .replace("$author", `${authorName} <${authorEmail}>`)
    .split(/(?:\r\n|\r|\n)/g)
    .join("\n");
};
