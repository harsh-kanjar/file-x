const fs = require("fs");
const path = require("path");
const { parseCSV } = require("./utils/parser");

async function csvToJson(inputPath, outputPath = null) {

  // 🔹 1. Check if input exists
  if (!fs.existsSync(inputPath)) {
    throw new Error("Input file does not exist.");
  }

  // 🔹 2. Check if file is CSV
  if (path.extname(inputPath).toLowerCase() !== ".csv") {
    throw new Error("Input file must be a CSV file.");
  }

  const jsonData = await parseCSV(inputPath);

  if (outputPath) {
    const resolvedPath = path.resolve(outputPath);

    // Optional: Ensure output is .json
    if (path.extname(resolvedPath).toLowerCase() !== ".json") {
      throw new Error("Output file must have .json extension.");
    }

    fs.writeFileSync(resolvedPath, JSON.stringify(jsonData, null, 2));

    return {
      success: true,
      message: "JSON file created successfully",
      path: resolvedPath,
    };
  }

  return jsonData;
}

module.exports = { csvToJson };
