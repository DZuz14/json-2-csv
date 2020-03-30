const createWriteStream = require("fs").createWriteStream;
const createReadStream = require("fs").createReadStream;
const Transform = require("stream").Transform;

/**
 * @function jsonToCSV
 * @param {[string]} header
 * @param {{ in: string, out: string }} paths
 */
function jsonToCSV(header, paths) {
  return new Promise(resolve => {
    const read = createReadStream(paths.in, {
      encoding: "utf-8"
    });

    const transform = new Transform();

    transform._transform = (chunk, _, done) => {
      const rows = chunk
        .toString()
        .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
        .replace(/},|}/g, "\n");

      done(null, rows);
    };

    const writer = createWriteStream(paths.out);

    writer.on("open", () => writer.write(header.join(",") + "\n"));
    writer.on("close", () => resolve());

    read.pipe(transform).pipe(writer);
  });
}

module.exports = jsonToCSV;
