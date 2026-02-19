const { convert } = require("../src");

(async () => {
  try {
    await convert("examples/sample.csv", "examples/yo-output.json");
    console.log("Conversion successful");
  } catch (err) {
    console.error(err);
  }
})();
