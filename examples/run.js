const { convert } = require("../src");

(async () => {
  try {
    await convert("examples/output.tsv", "examples/output.json");
    console.log("Conversion successful");
  } catch (err) {
    console.error(err);
  }
})();
