const path = require("path");

const readers = {
  ".csv": require("./readers/csv"),
  ".tsv": require("./readers/tsv"),
  ".txt": require("./readers/txt"),
  ".xlsx": require("./readers/xlsx"),
  ".parquet": require("./readers/parquet"),
};

const writers = {
  ".csv": require("./writers/csv"),
  ".json": require("./writers/json"),
  ".xlsx": require("./writers/xlsx"),
  ".parquet": require("./writers/parquet"),
};

async function convert(inputPath, outputPath) {
  const inputExt = path.extname(inputPath).toLowerCase();
  const outputExt = path.extname(outputPath).toLowerCase();

  if (!readers[inputExt]) {
    throw new Error(`Unsupported input format: ${inputExt}`);
  }

  if (!writers[outputExt]) {
    throw new Error(`Unsupported output format: ${outputExt}`);
  }

  // 1️⃣ Read input → JSON
  const data = await readers[inputExt].read(inputPath);

  // 2️⃣ Write JSON → output format
  await writers[outputExt].write(outputPath, data);

  return {
    success: true,
    message: `Converted ${inputExt} → ${outputExt}`,
  };
}

module.exports = { convert };
