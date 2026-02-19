const path = require("path");

const readers = {
  ".csv": require("./readers/csv"),
  ".tsv": require("./readers/tsv"),
  ".json": require("./readers/json"),
  ".xlsx": require("./readers/xlsx"),
};

const writers = {
  ".csv": require("./writers/csv"),
  ".tsv": require("./writers/tsv"),
  ".json": require("./writers/json"),
  ".xlsx": require("./writers/xlsx"),
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

  const data = await readers[inputExt].read(inputPath);
  await writers[outputExt].write(outputPath, data);

  return {
    success: true,
    message: `Converted ${inputExt} → ${outputExt}`,
  };
}

module.exports = { convert };
