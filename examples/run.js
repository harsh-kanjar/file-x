const path = require("path");
const { csvToJson } = require("../src");

(async () => {
  const input = path.join(__dirname, "sample.csv");
  const output = path.join(__dirname, "output.json");

  const result = await csvToJson(input, output);
  console.log(result);
})();
