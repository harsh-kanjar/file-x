const fs = require("fs");

function read(filePath) {
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

module.exports = { read };
