const fs = require("fs");
const { format } = require("fast-csv");

async function write(filePath, data) {
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);

    const csvStream = format({
      headers: true,
      delimiter: "\t",
    });

    csvStream
      .on("error", reject)
      .on("finish", resolve)
      .pipe(ws);

    data.forEach(row => csvStream.write(row));

    csvStream.end();
  });
}

module.exports = { write };
